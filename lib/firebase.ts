/**
 * Firebase Firestore integration - Free NoSQL database
 * Free tier: 1GB storage, 50K reads/day, 20K writes/day
 */

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface FirebaseDocument {
  id: string;
  [key: string]: any;
}

/**
 * Lightweight Firebase client without the full SDK
 */
export class FirebaseClient {
  private config: FirebaseConfig;
  private baseUrl: string;

  constructor(config: FirebaseConfig) {
    this.config = config;
    this.baseUrl = `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents`;
  }

  /**
   * Get documents from a collection
   */
  async getCollection(
    collection: string,
    options?: {
      limit?: number;
      orderBy?: string;
      where?: { field: string; op: string; value: any };
    }
  ): Promise<{ data: FirebaseDocument[]; error?: any }> {
    try {
      let url = `${this.baseUrl}/${collection}`;
      const params = new URLSearchParams();

      if (options?.limit) {
        params.append("pageSize", options.limit.toString());
      }

      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok) {
        return { data: [], error: result };
      }

      // Transform Firebase documents to simple objects
      const data =
        result.documents?.map((doc: any) => ({
          id: doc.name.split("/").pop(),
          ...this.transformFields(doc.fields || {}),
        })) || [];

      return { data, error: null };
    } catch (error) {
      return { data: [], error };
    }
  }

  /**
   * Get a single document
   */
  async getDocument(
    collection: string,
    id: string
  ): Promise<{ data: FirebaseDocument | null; error?: any }> {
    try {
      const url = `${this.baseUrl}/${collection}/${id}`;
      const response = await fetch(url);

      if (response.status === 404) {
        return { data: null, error: "Document not found" };
      }

      const result = await response.json();

      if (!response.ok) {
        return { data: null, error: result };
      }

      const data = {
        id,
        ...this.transformFields(result.fields || {}),
      };

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Create a document
   */
  async createDocument(
    collection: string,
    data: any,
    id?: string
  ): Promise<{ data: FirebaseDocument | null; error?: any }> {
    try {
      const url = id
        ? `${this.baseUrl}/${collection}?documentId=${id}`
        : `${this.baseUrl}/${collection}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: this.transformToFirebaseFields(data),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return { data: null, error: result };
      }

      const createdData = {
        id: result.name.split("/").pop(),
        ...this.transformFields(result.fields || {}),
      };

      return { data: createdData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Update a document
   */
  async updateDocument(
    collection: string,
    id: string,
    data: any
  ): Promise<{ data: FirebaseDocument | null; error?: any }> {
    try {
      const url = `${this.baseUrl}/${collection}/${id}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: this.transformToFirebaseFields(data),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return { data: null, error: result };
      }

      const updatedData = {
        id,
        ...this.transformFields(result.fields || {}),
      };

      return { data: updatedData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Delete a document
   */
  async deleteDocument(
    collection: string,
    id: string
  ): Promise<{ success: boolean; error?: any }> {
    try {
      const url = `${this.baseUrl}/${collection}/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 404) {
        const result = await response.json();
        return { success: false, error: result };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  /**
   * Transform Firebase fields to simple objects
   */
  private transformFields(fields: any): any {
    const result: any = {};

    for (const [key, value] of Object.entries(fields)) {
      const fieldValue = value as any;

      if (fieldValue.stringValue !== undefined) {
        result[key] = fieldValue.stringValue;
      } else if (fieldValue.integerValue !== undefined) {
        result[key] = parseInt(fieldValue.integerValue);
      } else if (fieldValue.doubleValue !== undefined) {
        result[key] = parseFloat(fieldValue.doubleValue);
      } else if (fieldValue.booleanValue !== undefined) {
        result[key] = fieldValue.booleanValue;
      } else if (fieldValue.timestampValue !== undefined) {
        result[key] = fieldValue.timestampValue;
      } else if (fieldValue.arrayValue !== undefined) {
        result[key] =
          fieldValue.arrayValue.values?.map(
            (v: any) => this.transformFields({ temp: v }).temp
          ) || [];
      } else {
        result[key] = fieldValue;
      }
    }

    return result;
  }

  /**
   * Transform simple objects to Firebase fields
   */
  private transformToFirebaseFields(data: any): any {
    const result: any = {};

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        result[key] = { stringValue: value };
      } else if (typeof value === "number") {
        result[key] = Number.isInteger(value)
          ? { integerValue: value.toString() }
          : { doubleValue: value };
      } else if (typeof value === "boolean") {
        result[key] = { booleanValue: value };
      } else if (value instanceof Date) {
        result[key] = { timestampValue: value.toISOString() };
      } else if (Array.isArray(value)) {
        result[key] = {
          arrayValue: {
            values: value.map(
              (v) => this.transformToFirebaseFields({ temp: v }).temp
            ),
          },
        };
      } else if (value === null) {
        result[key] = { nullValue: null };
      } else {
        result[key] = { stringValue: String(value) };
      }
    }

    return result;
  }
}

/**
 * Create Firebase client
 */
export function createFirebaseClient(): FirebaseClient | null {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  };

  if (!config.projectId || !config.apiKey) {
    console.error("Firebase configuration missing");
    return null;
  }

  return new FirebaseClient(config);
}

/**
 * Static data fetching for build time
 */
export async function getStaticFirebaseData(collection: string, options?: any) {
  const client = createFirebaseClient();
  if (!client) {
    return {
      data: [],
      error: "Firebase not configured",
      lastUpdated: new Date().toISOString(),
    };
  }

  const result = await client.getCollection(collection, options);
  return {
    data: result.data || [],
    error: result.error,
    lastUpdated: new Date().toISOString(),
    method: "Firebase Firestore (NoSQL)",
  };
}

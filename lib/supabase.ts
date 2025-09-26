/**
 * Supabase integration - Free PostgreSQL database with real-time features
 * Free tier: 500MB database, 50MB file storage, 50,000 monthly active users
 */

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export interface SupabaseResponse<T = any> {
  data: T[] | T | null;
  error: any;
  count?: number;
}

/**
 * Supabase client without the official SDK (to keep bundle small)
 */
export class SupabaseClient {
  private url: string;
  private key: string;
  private headers: Record<string, string>;

  constructor(config: SupabaseConfig) {
    this.url = config.url;
    this.key = config.anonKey;
    this.headers = {
      apikey: this.key,
      Authorization: `Bearer ${this.key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    };
  }

  /**
   * Select data from a table
   */
  async select(
    table: string,
    options?: {
      columns?: string;
      filter?: string;
      order?: string;
      limit?: number;
    }
  ): Promise<SupabaseResponse> {
    try {
      let url = `${this.url}/rest/v1/${table}`;
      const params = new URLSearchParams();

      if (options?.columns) params.append("select", options.columns);
      if (options?.filter) {
        // Example: "name=eq.John" or "age=gt.18"
        const [column, operator, value] = options.filter.split("=");
        params.append(column, `${operator}.${value}`);
      }
      if (options?.order) params.append("order", options.order);
      if (options?.limit) params.append("limit", options.limit.toString());

      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: data };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Insert data into a table
   */
  async insert(table: string, data: any | any[]): Promise<SupabaseResponse> {
    try {
      const response = await fetch(`${this.url}/rest/v1/${table}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { data: null, error: result };
      }

      return { data: result, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Update data in a table
   */
  async update(
    table: string,
    data: any,
    filter: string
  ): Promise<SupabaseResponse> {
    try {
      const [column, operator, value] = filter.split("=");
      const url = `${this.url}/rest/v1/${table}?${column}=${operator}.${value}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { data: null, error: result };
      }

      return { data: result, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Delete data from a table
   */
  async delete(table: string, filter: string): Promise<SupabaseResponse> {
    try {
      const [column, operator, value] = filter.split("=");
      const url = `${this.url}/rest/v1/${table}?${column}=${operator}.${value}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: this.headers,
      });

      const result = response.status === 204 ? [] : await response.json();

      if (!response.ok && response.status !== 204) {
        return { data: null, error: result };
      }

      return { data: result, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Real-time subscription (for static sites, you'd poll instead)
   */
  async subscribe(table: string, callback: (data: any) => void) {
    // For static sites, implement polling
    const poll = async () => {
      const result = await this.select(table);
      if (result.data && !result.error) {
        callback(result.data);
      }
    };

    // Poll every 30 seconds
    const interval = setInterval(poll, 30000);
    poll(); // Initial call

    return () => clearInterval(interval);
  }
}

/**
 * Helper function to create Supabase client
 */
export function createSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error("Supabase configuration missing");
    return null;
  }

  return new SupabaseClient({ url, anonKey });
}

/**
 * Static data fetching for build time
 */
export async function getStaticSupabaseData(table: string, options?: any) {
  const client = createSupabaseClient();
  if (!client) {
    return {
      data: [],
      error: "Supabase not configured",
      lastUpdated: new Date().toISOString(),
    };
  }

  const result = await client.select(table, options);
  return {
    data: result.data || [],
    error: result.error,
    lastUpdated: new Date().toISOString(),
    method: "Supabase (PostgreSQL)",
  };
}

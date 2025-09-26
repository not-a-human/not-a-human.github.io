/**
 * Unified Database Client for Supabase
 * Clean implementation for your GitHub Pages site
 */

import { createSupabaseClient, getStaticSupabaseData } from "./supabase";

export type DatabaseProvider = "supabase";

export interface DatabaseRecord {
  id?: string | number;
  [key: string]: any;
}

export interface DatabaseResponse<T = DatabaseRecord[]> {
  data: T;
  error?: any;
  count?: number;
  lastUpdated?: string;
  provider?: string;
}

/**
 * Unified Database Client for Supabase
 */
export class UnifiedDatabaseClient {
  private provider: DatabaseProvider;
  private client: any;

  constructor(provider: DatabaseProvider = "supabase") {
    this.provider = provider;
    this.client = this.createClient();
  }

  private createClient() {
    return createSupabaseClient();
  }

  /**
   * Get all records from a table
   */
  async getAll(
    table: string,
    options?: {
      limit?: number;
      orderBy?: string;
      filter?: string;
    }
  ): Promise<DatabaseResponse> {
    try {
      if (!this.client) throw new Error("Supabase client not configured");

      const result = await this.client.select(table, {
        limit: options?.limit,
        order: options?.orderBy,
        filter: options?.filter,
      });

      return {
        data: result.data || [],
        error: result.error,
        provider: "Supabase (PostgreSQL)",
      };
    } catch (error) {
      return {
        data: [],
        error,
        provider: this.provider,
      };
    }
  }

  /**
   * Get a single record by ID
   */
  async getById(
    table: string,
    id: string
  ): Promise<DatabaseResponse<DatabaseRecord | null>> {
    try {
      if (!this.client) throw new Error("Supabase client not configured");

      const result = await this.client.select(table, { filter: `id=eq.${id}` });

      return {
        data: result.data?.[0] || null,
        error: result.error,
        provider: "Supabase (PostgreSQL)",
      };
    } catch (error) {
      return {
        data: null,
        error,
        provider: this.provider,
      };
    }
  }

  /**
   * Create a new record
   */
  async create(
    table: string,
    data: DatabaseRecord
  ): Promise<DatabaseResponse<DatabaseRecord | null>> {
    try {
      if (!this.client) throw new Error("Supabase client not configured");

      const result = await this.client.insert(table, data);

      return {
        data: Array.isArray(result.data) ? result.data[0] : result.data,
        error: result.error,
        provider: "Supabase (PostgreSQL)",
      };
    } catch (error) {
      return {
        data: null,
        error,
        provider: this.provider,
      };
    }
  }

  /**
   * Update a record
   */
  async update(
    table: string,
    id: string,
    data: Partial<DatabaseRecord>
  ): Promise<DatabaseResponse<DatabaseRecord | null>> {
    try {
      if (!this.client) throw new Error("Supabase client not configured");

      const result = await this.client.update(table, data, `id=eq.${id}`);

      return {
        data: Array.isArray(result.data) ? result.data[0] : result.data,
        error: result.error,
        provider: "Supabase (PostgreSQL)",
      };
    } catch (error) {
      return {
        data: null,
        error,
        provider: this.provider,
      };
    }
  }

  /**
   * Delete a record
   */
  async delete(table: string, id: string): Promise<DatabaseResponse<boolean>> {
    try {
      if (!this.client) throw new Error("Supabase client not configured");

      const result = await this.client.delete(table, `id=eq.${id}`);

      return {
        data: !result.error,
        error: result.error,
        provider: "Supabase (PostgreSQL)",
      };
    } catch (error) {
      return {
        data: false,
        error,
        provider: this.provider,
      };
    }
  }
}

/**
 * Get static data for build time (GitHub Pages compatible)
 */
export async function getStaticDatabaseData(table: string) {
  try {
    return await getStaticSupabaseData(table);
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
      lastUpdated: new Date().toISOString(),
      method: "Supabase (PostgreSQL)",
    };
  }
}

/**
 * Create a database client instance
 */
export function createDatabaseClient(): UnifiedDatabaseClient {
  return new UnifiedDatabaseClient("supabase");
}

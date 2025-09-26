/**
 * PlanetScale integration - Serverless MySQL database
 * Free tier: 1 database, 1GB storage, 1 billion reads/month
 */

export interface PlanetScaleConfig {
  host: string;
  username: string;
  password: string;
}

export interface PlanetScaleQueryResult {
  data?: any[];
  error?: any;
  insertId?: number;
  affectedRows?: number;
}

/**
 * PlanetScale client using HTTP API
 */
export class PlanetScaleClient {
  private config: PlanetScaleConfig;

  constructor(config: PlanetScaleConfig) {
    this.config = config;
  }

  /**
   * Execute a raw SQL query
   */
  async query(
    sql: string,
    params: any[] = []
  ): Promise<PlanetScaleQueryResult> {
    try {
      // For static sites, we'll use a serverless function or edge function
      // This is a placeholder - you'd typically use their HTTP API through a proxy
      const response = await fetch("/api/planetscale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql, params }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error };
      }

      const result = await response.json();
      return { data: result.rows, ...result.meta };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Select data from table
   */
  async select(
    table: string,
    options?: {
      columns?: string[];
      where?: string;
      params?: any[];
      orderBy?: string;
      limit?: number;
    }
  ): Promise<PlanetScaleQueryResult> {
    const columns = options?.columns?.join(", ") || "*";
    let sql = `SELECT ${columns} FROM ${table}`;
    let params = options?.params || [];

    if (options?.where) {
      sql += ` WHERE ${options.where}`;
    }

    if (options?.orderBy) {
      sql += ` ORDER BY ${options.orderBy}`;
    }

    if (options?.limit) {
      sql += ` LIMIT ${options.limit}`;
    }

    return this.query(sql, params);
  }

  /**
   * Insert data into table
   */
  async insert(table: string, data: any): Promise<PlanetScaleQueryResult> {
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");
    const values = Object.values(data);

    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    return this.query(sql, values);
  }

  /**
   * Update data in table
   */
  async update(
    table: string,
    data: any,
    where: string,
    params: any[] = []
  ): Promise<PlanetScaleQueryResult> {
    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(data), ...params];

    const sql = `UPDATE ${table} SET ${setClause} WHERE ${where}`;
    return this.query(sql, values);
  }

  /**
   * Delete data from table
   */
  async delete(
    table: string,
    where: string,
    params: any[] = []
  ): Promise<PlanetScaleQueryResult> {
    const sql = `DELETE FROM ${table} WHERE ${where}`;
    return this.query(sql, params);
  }

  /**
   * Create table
   */
  async createTable(
    table: string,
    schema: string
  ): Promise<PlanetScaleQueryResult> {
    const sql = `CREATE TABLE IF NOT EXISTS ${table} (${schema})`;
    return this.query(sql);
  }
}

/**
 * Create PlanetScale client
 */
export function createPlanetScaleClient(): PlanetScaleClient | null {
  const config = {
    host: process.env.PLANETSCALE_HOST || "",
    username: process.env.PLANETSCALE_USERNAME || "",
    password: process.env.PLANETSCALE_PASSWORD || "",
  };

  if (!config.host || !config.username || !config.password) {
    console.error("PlanetScale configuration missing");
    return null;
  }

  return new PlanetScaleClient(config);
}

/**
 * Static data fetching for build time
 */
export async function getStaticPlanetScaleData(table: string, options?: any) {
  const client = createPlanetScaleClient();
  if (!client) {
    return {
      data: [],
      error: "PlanetScale not configured",
      lastUpdated: new Date().toISOString(),
    };
  }

  const result = await client.select(table, options);
  return {
    data: result.data || [],
    error: result.error,
    lastUpdated: new Date().toISOString(),
    method: "PlanetScale (MySQL)",
  };
}

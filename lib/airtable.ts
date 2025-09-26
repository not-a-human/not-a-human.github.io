/**
 * Airtable integration - free tier with 1,000 records per base
 * More database-like features than Google Sheets
 */

export interface AirtableRecord {
  id: string;
  fields: { [key: string]: any };
  createdTime: string;
}

export interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

/**
 * Fetch data from Airtable
 * @param baseId - Your Airtable base ID
 * @param tableId - Your table ID or name
 * @param apiKey - Your Airtable API key (free)
 * @returns Array of records
 */
export async function fetchAirtableData(
  baseId: string,
  tableId: string,
  apiKey: string
): Promise<AirtableRecord[]> {
  try {
    const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
    }
    
    const data: AirtableResponse = await response.json();
    return data.records;
  } catch (error) {
    console.error('Error fetching Airtable data:', error);
    throw error;
  }
}

/**
 * Convert Airtable records to simple objects (like Google Sheets format)
 */
export function convertAirtableRecords(records: AirtableRecord[]) {
  return records.map(record => ({
    id: record.id,
    createdTime: record.createdTime,
    ...record.fields,
  }));
}

/**
 * Static data fetching for Airtable
 */
export async function getStaticAirtableData(
  baseId: string,
  tableId: string,
  apiKey: string
) {
  try {
    const records = await fetchAirtableData(baseId, tableId, apiKey);
    const data = convertAirtableRecords(records);
    
    return {
      data,
      lastUpdated: new Date().toISOString(),
      method: 'Airtable (Free)',
      recordCount: records.length,
    };
  } catch (error) {
    return {
      data: [],
      lastUpdated: new Date().toISOString(),
      method: 'Airtable (Free)',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
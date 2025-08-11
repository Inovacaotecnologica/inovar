
import { GOOGLE_SHEET_URL } from '../constants';
import { Product } from '../types';

interface Cache {
  data: Product[] | null;
  timestamp: number | null;
}

const cache: Cache = {
  data: null,
  timestamp: null,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

export const fetchProducts = async (): Promise<Product[]> => {
  const now = Date.now();
  if (cache.data && cache.timestamp && now - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }

  try {
    const response = await fetch(GOOGLE_SHEET_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch Google Sheet data');
    }
    const rawText = await response.text();
    
    // The response is JSONP, we need to extract the JSON part.
    const jsonString = rawText.substring(rawText.indexOf('(') + 1, rawText.lastIndexOf(')'));
    const parsedData = JSON.parse(jsonString);

    if (!parsedData.table || !parsedData.table.rows) {
      throw new Error('Invalid data format from Google Sheet');
    }

    const products: Product[] = parsedData.table.rows
      .map((row: any, index: number) => {
        // Expected columns: nome, imagem_link, valor, descricao, categoria
        const name = row.c[0]?.v;
        const imageUrl = row.c[1]?.v;
        const price = row.c[2]?.v;
        const description = row.c[3]?.v;
        const category = row.c[4]?.v;

        if (!name || !imageUrl || typeof price !== 'number' || !description) {
          console.warn(`Skipping invalid row at index ${index}:`, row);
          return null;
        }

        return {
          id: `${name.replace(/\s+/g, '-').toLowerCase()}-${index}`, // Create a unique ID
          name,
          imageUrl,
          price,
          description,
          category: category || 'Geral',
        };
      })
      .filter((p: Product | null): p is Product => p !== null);

    cache.data = products;
    cache.timestamp = now;
    return products;
  } catch (error) {
    console.error("Error fetching or parsing products:", error);
    // Return stale data if available, otherwise throw
    if (cache.data) return cache.data;
    throw error;
  }
};

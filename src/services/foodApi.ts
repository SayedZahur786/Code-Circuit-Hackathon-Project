import { BarcodeProduct } from '../types';

const API_BASE_URL = 'https://world.openfoodfacts.org/api/v0/product';

export async function fetchProductByBarcode(barcode: string): Promise<BarcodeProduct | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${barcode}.json`);
    const data = await response.json();
    
    if (data.status !== 1) {
      console.error('Product not found in database');
      return null;
    }
    
    const product = data.product;
    const nutriments = product.nutriments || {};
    
    return {
      name: product.product_name || 'Unknown Product',
      calories: nutriments['energy-kcal_100g'] || nutriments['energy-kcal'] || 0,
      protein: nutriments.proteins_100g || nutriments.proteins || 0,
      carbs: nutriments.carbohydrates_100g || nutriments.carbohydrates || 0,
      fat: nutriments.fat_100g || nutriments.fat || 0,
      barcode: barcode
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
}
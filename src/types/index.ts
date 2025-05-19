export interface Meal {
  id: number;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  date: string;
  mealTime?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  barcode?: string;
  mood?: 'great' | 'good' | 'okay' | 'bad';
}

export interface WaterLog {
  date: string;
  glasses: number;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface BarcodeProduct {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  barcode: string;
}

export interface DailyStreak {
  currentStreak: number;
  lastLogDate: string;
}

export interface QuickMeal {
  id: number;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  mealTime?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}
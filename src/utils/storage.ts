import { Meal, WaterLog, DailyStreak, QuickMeal } from '../types';

export const saveMeals = (meals: Meal[]): void => {
  const existingMeals = getMeals();
  const otherDaysMeals = existingMeals.filter(meal => 
    !meals.some(newMeal => newMeal.date === meal.date));
  const allMeals = [...otherDaysMeals, ...meals];
  localStorage.setItem('meals', JSON.stringify(allMeals));
};

export const getMeals = (): Meal[] => {
  const mealsJson = localStorage.getItem('meals');
  if (!mealsJson) return [];
  try {
    return JSON.parse(mealsJson);
  } catch (error) {
    console.error('Error parsing meals from localStorage', error);
    return [];
  }
};

export const saveWaterLog = (log: WaterLog): void => {
  const existingLogs = getWaterLogs();
  const otherDaysLogs = existingLogs.filter(l => l.date !== log.date);
  const allLogs = [...otherDaysLogs, log];
  localStorage.setItem('waterLogs', JSON.stringify(allLogs));
};

export const getWaterLogs = (): WaterLog[] => {
  const logsJson = localStorage.getItem('waterLogs');
  if (!logsJson) return [];
  try {
    return JSON.parse(logsJson);
  } catch (error) {
    console.error('Error parsing water logs from localStorage', error);
    return [];
  }
};

export const updateStreak = (date: string): void => {
  const streak = getStreak();
  const lastDate = new Date(streak.lastLogDate);
  const currentDate = new Date(date);
  const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day
    const newStreak: DailyStreak = {
      currentStreak: streak.currentStreak + 1,
      lastLogDate: date
    };
    localStorage.setItem('streak', JSON.stringify(newStreak));
  } else if (diffDays > 1) {
    // Streak broken
    const newStreak: DailyStreak = {
      currentStreak: 1,
      lastLogDate: date
    };
    localStorage.setItem('streak', JSON.stringify(newStreak));
  }
};

export const getStreak = (): DailyStreak => {
  const streakJson = localStorage.getItem('streak');
  if (!streakJson) {
    return {
      currentStreak: 0,
      lastLogDate: new Date().toISOString().split('T')[0]
    };
  }
  try {
    return JSON.parse(streakJson);
  } catch (error) {
    console.error('Error parsing streak from localStorage', error);
    return {
      currentStreak: 0,
      lastLogDate: new Date().toISOString().split('T')[0]
    };
  }
};

export const saveQuickMeal = (meal: QuickMeal): void => {
  const quickMeals = getQuickMeals();
  const updatedMeals = [...quickMeals, meal];
  localStorage.setItem('quickMeals', JSON.stringify(updatedMeals));
};

export const getQuickMeals = (): QuickMeal[] => {
  const mealsJson = localStorage.getItem('quickMeals');
  if (!mealsJson) return [];
  try {
    return JSON.parse(mealsJson);
  } catch (error) {
    console.error('Error parsing quick meals from localStorage', error);
    return [];
  }
};
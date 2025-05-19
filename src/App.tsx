import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MealList from './components/MealList';
import AddMealForm from './components/AddMealForm';
import DailySummary from './components/DailySummary';
import BarcodeScanner from './components/BarcodeScanner';
import WaterTracker from './components/WaterTracker';
import { getMeals, saveMeals, getWaterLogs, saveWaterLog, updateStreak, getStreak } from './utils/storage';
import { format } from 'date-fns';
import { Meal, WaterLog } from './types';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [streak, setStreak] = useState(getStreak());
  const today = format(new Date(), 'yyyy-MM-dd');

  // Load meals and water logs from localStorage on component mount
  useEffect(() => {
    const storedMeals = getMeals();
    const todaysMeals = storedMeals.filter(meal => meal.date === today);
    setMeals(todaysMeals);

    const waterLogs = getWaterLogs();
    const todaysWater = waterLogs.find(log => log.date === today);
    setWaterGlasses(todaysWater?.glasses || 0);
  }, [today]);

  // Update total calories whenever meals change
  useEffect(() => {
    const total = meals.reduce((sum, meal) => sum + meal.calories, 0);
    setTotalCalories(total);
    
    if (meals.length > 0) {
      updateStreak(today);
      setStreak(getStreak());
    }
  }, [meals, today]);

  const addMeal = (newMeal: Meal) => {
    const updatedMeals = [...meals, { ...newMeal, id: Date.now(), date: today }];
    setMeals(updatedMeals);
    saveMeals(updatedMeals);
    setIsAddingMeal(false);
  };

  const removeMeal = (id: number) => {
    const filteredMeals = meals.filter(meal => meal.id !== id);
    setMeals(filteredMeals);
    saveMeals(filteredMeals);
  };

  const updateWaterGlasses = (glasses: number) => {
    setWaterGlasses(glasses);
    const waterLog: WaterLog = { date: today, glasses };
    saveWaterLog(waterLog);
  };

  const updateMealMood = (id: number, mood: Meal['mood']) => {
    const updatedMeals = meals.map(meal =>
      meal.id === id ? { ...meal, mood } : meal
    );
    setMeals(updatedMeals);
    saveMeals(updatedMeals);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header streak={streak.currentStreak} />
      
      <main className="max-w-lg mx-auto p-4">
        <DailySummary totalCalories={totalCalories} meals={meals} />
        <WaterTracker glasses={waterGlasses} onUpdate={updateWaterGlasses} />
        
        <AnimatePresence mode="wait">
          {isScanning ? (
            <BarcodeScanner 
              onClose={() => setIsScanning(false)} 
              onProductDetected={(productData) => {
                addMeal(productData);
                setIsScanning(false);
              }}
            />
          ) : isAddingMeal ? (
            <AddMealForm 
              onSubmit={addMeal} 
              onCancel={() => setIsAddingMeal(false)} 
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 flex gap-2"
            >
              <button 
                onClick={() => setIsAddingMeal(true)} 
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200 shadow-sm"
              >
                Add Meal Manually
              </button>
              <button 
                onClick={() => setIsScanning(true)} 
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200 shadow-sm"
              >
                Scan Barcode
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <MealList 
          meals={meals} 
          onRemoveMeal={removeMeal}
          onMoodUpdate={updateMealMood}
        />
      </main>
    </div>
  );
}

export default App;
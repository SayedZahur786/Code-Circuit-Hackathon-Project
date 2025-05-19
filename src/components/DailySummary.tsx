import React from 'react';
import { format } from 'date-fns';
import { Meal } from '../types';
import { BarChart3 } from 'lucide-react';

interface DailySummaryProps {
  totalCalories: number;
  meals: Meal[];
}

const DailySummary: React.FC<DailySummaryProps> = ({ totalCalories, meals }) => {
  const today = format(new Date(), 'EEEE, MMMM do');
  
  const totalNutrients = meals.reduce((acc, meal) => {
    return {
      protein: acc.protein + (meal.protein || 0),
      carbs: acc.carbs + (meal.carbs || 0),
      fat: acc.fat + (meal.fat || 0)
    };
  }, { protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-medium text-gray-700">{today}</h2>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          <h3 className="text-xl font-semibold">
            {totalCalories} <span className="text-sm text-gray-500">kcal</span>
          </h3>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="bg-blue-50 p-2 rounded-md">
            <p className="text-xs text-gray-500">Protein</p>
            <p className="font-medium">{totalNutrients.protein.toFixed(1)}g</p>
          </div>
          <div className="bg-yellow-50 p-2 rounded-md">
            <p className="text-xs text-gray-500">Carbs</p>
            <p className="font-medium">{totalNutrients.carbs.toFixed(1)}g</p>
          </div>
          <div className="bg-red-50 p-2 rounded-md">
            <p className="text-xs text-gray-500">Fat</p>
            <p className="font-medium">{totalNutrients.fat.toFixed(1)}g</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;
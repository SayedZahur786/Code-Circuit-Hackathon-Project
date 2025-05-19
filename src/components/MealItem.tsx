import React from 'react';
import { Meal } from '../types';
import { Trash2, Coffee, Sun, Moon, Cookie } from 'lucide-react';
import { motion } from 'framer-motion';

interface MealItemProps {
  meal: Meal;
  onRemoveMeal: (id: number) => void;
  onMoodUpdate?: (id: number, mood: Meal['mood']) => void;
}

const MealItem: React.FC<MealItemProps> = ({ meal, onRemoveMeal, onMoodUpdate }) => {
  const getMealTimeIcon = () => {
    switch (meal.mealTime) {
      case 'breakfast':
        return <Coffee className="h-4 w-4" />;
      case 'lunch':
        return <Sun className="h-4 w-4" />;
      case 'dinner':
        return <Moon className="h-4 w-4" />;
      case 'snack':
        return <Cookie className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getMoodEmoji = (mood: Meal['mood']) => {
    switch (mood) {
      case 'great':
        return '😊';
      case 'good':
        return '😌';
      case 'okay':
        return '😕';
      case 'bad':
        return '😢';
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-3 relative hover:shadow-md transition-all duration-200"
    >
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-800">{meal.name}</h3>
            {meal.mealTime && (
              <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {getMealTimeIcon()}
                {meal.mealTime.charAt(0).toUpperCase() + meal.mealTime.slice(1)}
              </span>
            )}
          </div>

          <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-gray-50 p-2 rounded">
              <span className="text-xs text-gray-500">Calories</span>
              <p className="font-medium">{meal.calories} kcal</p>
            </div>
            {meal.protein !== undefined && (
              <div className="bg-blue-50 p-2 rounded">
                <span className="text-xs text-gray-500">Protein</span>
                <p className="font-medium">{meal.protein}g</p>
              </div>
            )}
            {meal.carbs !== undefined && (
              <div className="bg-yellow-50 p-2 rounded">
                <span className="text-xs text-gray-500">Carbs</span>
                <p className="font-medium">{meal.carbs}g</p>
              </div>
            )}
            {meal.fat !== undefined && (
              <div className="bg-red-50 p-2 rounded">
                <span className="text-xs text-gray-500">Fat</span>
                <p className="font-medium">{meal.fat}g</p>
              </div>
            )}
          </div>

          {onMoodUpdate && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-500">How did you feel?</span>
              <div className="flex gap-2">
                {(['great', 'good', 'okay', 'bad'] as const).map((mood) => (
                  <button
                    key={mood}
                    onClick={() => onMoodUpdate(meal.id, mood)}
                    className={`text-xl transition-transform hover:scale-110 ${
                      meal.mood === mood ? 'transform scale-110' : 'opacity-50'
                    }`}
                  >
                    {getMoodEmoji(mood)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => onRemoveMeal(meal.id)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200 ml-4"
          aria-label="Delete meal"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {meal.barcode && (
        <div className="mt-2 text-xs text-gray-400">
          Barcode: {meal.barcode}
        </div>
      )}
    </motion.div>
  );
};

export default MealItem;
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Meal } from '../types';

interface AddMealFormProps {
  onSubmit: (meal: Meal) => void;
  onCancel: () => void;
}

const AddMealForm: React.FC<AddMealFormProps> = ({ onSubmit, onCancel }) => {
  const [mealData, setMealData] = useState<Omit<Meal, 'id' | 'date'>>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    mealTime: 'snack'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert number inputs from string to number
    if (['calories', 'protein', 'carbs', 'fat'].includes(name)) {
      setMealData({ ...mealData, [name]: parseFloat(value) || 0 });
    } else {
      setMealData({ ...mealData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(mealData as Meal);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Add Meal</h3>
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Food Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={mealData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Chicken Salad"
            />
          </div>

          <div>
            <label htmlFor="mealTime" className="block text-sm font-medium text-gray-700 mb-1">
              Meal Type
            </label>
            <select
              id="mealTime"
              name="mealTime"
              value={mealData.mealTime}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-1">
                Calories
              </label>
              <input
                type="number"
                id="calories"
                name="calories"
                required
                min="0"
                value={mealData.calories}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="kcal"
              />
            </div>
            
            <div>
              <label htmlFor="protein" className="block text-sm font-medium text-gray-700 mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                id="protein"
                name="protein"
                min="0"
                step="0.1"
                value={mealData.protein}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="grams"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="carbs" className="block text-sm font-medium text-gray-700 mb-1">
                Carbs (g)
              </label>
              <input
                type="number"
                id="carbs"
                name="carbs"
                min="0"
                step="0.1"
                value={mealData.carbs}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="grams"
              />
            </div>
            
            <div>
              <label htmlFor="fat" className="block text-sm font-medium text-gray-700 mb-1">
                Fat (g)
              </label>
              <input
                type="number"
                id="fat"
                name="fat"
                min="0"
                step="0.1"
                value={mealData.fat}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="grams"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
            >
              Add Meal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMealForm;
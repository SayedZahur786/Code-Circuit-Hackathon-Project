import React from 'react';
import MealItem from './MealItem';
import { Meal } from '../types';
import { UtensilsCrossed } from 'lucide-react';

interface MealListProps {
  meals: Meal[];
  onRemoveMeal: (id: number) => void;
}

const MealList: React.FC<MealListProps> = ({ meals, onRemoveMeal }) => {
  if (meals.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm">
        <UtensilsCrossed className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No meals yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by adding a meal or scanning a product.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {meals.map(meal => (
        <MealItem 
          key={meal.id} 
          meal={meal} 
          onRemoveMeal={onRemoveMeal} 
        />
      ))}
    </div>
  );
};

export default MealList;
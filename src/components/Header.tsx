import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-lg mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800">NutriTrack</h1>
        </div>
        <span className="text-sm text-gray-600">Meal &amp; Calorie Tracker</span>
      </div>
    </header>
  );
};

export default Header;
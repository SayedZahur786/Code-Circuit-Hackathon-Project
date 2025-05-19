import React from 'react';
import { Droplets, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface WaterTrackerProps {
  glasses: number;
  onUpdate: (glasses: number) => void;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ glasses, onUpdate }) => {
  const maxGlasses = 8;
  const percentage = (glasses / maxGlasses) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium text-gray-800">Water Intake</h3>
        </div>
        <span className="text-sm text-gray-500">{glasses} / {maxGlasses} glasses</span>
      </div>

      <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
        <motion.div
          className="absolute left-0 top-0 h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => onUpdate(Math.max(0, glasses - 1))}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          disabled={glasses === 0}
        >
          <Minus className="h-5 w-5 text-gray-600" />
        </button>
        <button
          onClick={() => onUpdate(Math.min(maxGlasses, glasses + 1))}
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          disabled={glasses === maxGlasses}
        >
          <Plus className="h-5 w-5 text-blue-600" />
        </button>
      </div>

      {glasses === maxGlasses && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-blue-600 mt-4"
        >
          🎉 Hydration goal achieved! Great job!
        </motion.p>
      )}
    </div>
  );
};

export default WaterTracker;
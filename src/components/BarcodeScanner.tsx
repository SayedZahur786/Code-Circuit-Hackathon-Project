import React, { useState } from 'react';
import { useZxing } from 'react-zxing';
import { X, Camera, Loader2, Check, XCircle } from 'lucide-react';
import { fetchProductByBarcode } from '../services/foodApi';
import { BarcodeProduct, Meal } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface BarcodeScannerProps {
  onClose: () => void;
  onProductDetected: (product: Meal) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onClose, onProductDetected }) => {
  const [scanning, setScanning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedProduct, setScannedProduct] = useState<BarcodeProduct | null>(null);

  const { ref } = useZxing({
    onDecodeResult: async (result) => {
      if (!scanning) return;
      
      setScanning(false);
      setLoading(true);
      setError(null);
      
      try {
        const barcode = result.getText();
        console.log(`Barcode detected: ${barcode}`);
        
        const productData = await fetchProductByBarcode(barcode);
        
        if (productData) {
          setScannedProduct(productData);
        } else {
          setError('Product not found. Try adding it manually.');
          setScanning(true);
        }
      } catch (err) {
        console.error('Error in barcode processing:', err);
        setError('Error processing barcode. Try again or add manually.');
        setScanning(true);
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error('Scan error:', error);
    },
  });

  const handleConfirm = () => {
    if (scannedProduct) {
      const meal: Meal = {
        id: 0,
        date: '',
        name: scannedProduct.name,
        calories: Math.round(scannedProduct.calories),
        protein: Math.round(scannedProduct.protein * 10) / 10,
        carbs: Math.round(scannedProduct.carbs * 10) / 10,
        fat: Math.round(scannedProduct.fat * 10) / 10,
        barcode: scannedProduct.barcode,
        mealTime: 'snack'
      };
      onProductDetected(meal);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative bg-white rounded-lg shadow-sm p-4 mb-6 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Scan Product Barcode</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-2" />
            <p className="text-gray-600">Fetching product information...</p>
          </div>
        ) : scannedProduct ? (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-lg mb-2">{scannedProduct.name}</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-500">Calories</p>
                <p className="font-medium">{Math.round(scannedProduct.calories)} kcal</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-500">Protein</p>
                <p className="font-medium">{Math.round(scannedProduct.protein * 10) / 10}g</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-500">Carbs</p>
                <p className="font-medium">{Math.round(scannedProduct.carbs * 10) / 10}g</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-500">Fat</p>
                <p className="font-medium">{Math.round(scannedProduct.fat * 10) / 10}g</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleConfirm}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Check size={18} />
                Add Meal
              </button>
              <button
                onClick={() => {
                  setScannedProduct(null);
                  setScanning(true);
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <XCircle size={18} />
                Cancel
              </button>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => setScanning(true)}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Scan Again
            </button>
          </div>
        ) : (
          <>
            {scanning && (
              <div className="absolute inset-0 pointer-events-none z-10 border-2 border-blue-500 rounded-lg">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 animate-pulse"></div>
              </div>
            )}
            <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100">
              <video ref={ref} className="w-full h-full object-cover" />
              {!scanning && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-white" />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Position the barcode within the frame to scan</p>
      </div>
    </motion.div>
  );
};

export default BarcodeScanner;
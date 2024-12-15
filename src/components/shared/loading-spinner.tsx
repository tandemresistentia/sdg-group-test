'use client';

import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div 
      className="flex items-center justify-center min-h-[400px]"
      data-testid="loading-container"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
        data-testid="animation-container"
      >
        <div 
          className="h-16 w-16 rounded-full border-4 border-gray-200"
          data-testid="spinner-base"
        />
        <div 
          className="absolute top-0 h-16 w-16 rounded-full border-t-4 border-blue-500 animate-spin"
          data-testid="spinner-animated"
        />
        <div 
          className="mt-4 text-center text-sm text-gray-500"
          aria-live="polite"
        >
          Loading population data...
        </div>
      </motion.div>
    </div>
  );
}
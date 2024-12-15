import React from 'react';

export const BackgroundPattern = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900 dark:to-gray-800/50" />
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-40 dark:opacity-20">
      <defs>
        <pattern id="topoPattern" width="200" height="200" patternUnits="userSpaceOnUse">
          <path
            d="M 0,50 C 50,30 150,70 200,50 M 0,100 C 50,80 150,120 200,100 M 0,150 C 50,130 150,170 200,150 M 50,0 C 30,50 70,150 50,200 M 100,0 C 80,50 120,150 100,200 M 150,0 C 130,50 170,150 150,200"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-blue-300 dark:text-blue-800"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topoPattern)" />
    </svg>
  </div>
);
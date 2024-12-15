import React, { useMemo } from 'react';
import { formatPopulation } from '@/lib/utils/formatters';
import { DataViewProps } from '@/types/dashboard';

export const DataView = ({ data }: DataViewProps) => {
  const totalPopulation = useMemo(() => 
    data?.reduce((sum, item) => sum + item.totalPopulation, 0) || 0
  , [data]);

  const safeData = data || [];

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="max-h-[calc(70vh-12rem)] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900">
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-300">Region</th>
              <th className="text-right p-4 font-medium text-gray-600 dark:text-gray-300">Population</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            <tr className="bg-blue-50 dark:bg-blue-900/20 font-semibold">
              <td className="p-4 text-gray-900 dark:text-gray-100">Total (All Regions)</td>
              <td className="p-4 text-right tabular-nums font-bold text-gray-900 dark:text-gray-100">
                {formatPopulation(totalPopulation)}
              </td>
            </tr>
            {safeData.map((item) => (
              <tr 
                key={item.name}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="p-4 text-gray-900 dark:text-gray-100">{item.name}</td>
                <td className="p-4 text-right tabular-nums font-medium text-gray-900 dark:text-gray-100">
                  {formatPopulation(item.totalPopulation)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
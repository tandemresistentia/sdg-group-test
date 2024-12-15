import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePopulationStore } from '@/store/population';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { Users, ChevronUp, ChevronDown } from 'lucide-react';
import { PopulationValue } from '@/types/api';
import { formatPopulation } from '@/lib/utils/formatters';
import { MAX_VALUE, MILLION, MIN_VALUE, STEP } from '@/constants/constants';

export const PopulationFilter = () => {
  const { populationFilter, setPopulationFilter } = usePopulationStore();
  const [{ displayValue, actualValue }, setValues] = useState<PopulationValue>({
    displayValue: populationFilter ? String(populationFilter / MILLION) : '',
    actualValue: populationFilter
  });
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (populationFilter !== actualValue) {
      setValues({
        displayValue: populationFilter ? String(populationFilter / MILLION) : '',
        actualValue: populationFilter
      });
    }
  }, [populationFilter, actualValue]);

  const validateAndUpdateValue = useCallback((value: string) => {
    const parsedValue = parseFloat(value);
    const numValue = Math.max(0, Math.min(MAX_VALUE, Math.floor(parsedValue || 0)));
    setValues({
      displayValue: numValue.toString() || '',
      actualValue: numValue ? numValue * MILLION : null
    });
    setPopulationFilter(numValue ? numValue * MILLION : null);
  }, [setPopulationFilter]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '') {
      setValues({ displayValue: '', actualValue: null });
      setPopulationFilter(null);
    } else {
      validateAndUpdateValue(newValue);
    }
  }, [setPopulationFilter, validateAndUpdateValue]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (displayValue) {
      validateAndUpdateValue(displayValue);
    }
  }, [displayValue, validateAndUpdateValue]);

  const incrementValue = useCallback((step: number) => {
    const currentValue = displayValue ? parseFloat(displayValue) : 0;
    const newValue = Math.max(MIN_VALUE, currentValue + step);
    validateAndUpdateValue(newValue.toString());
  }, [displayValue, validateAndUpdateValue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-[300px]"
    >
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-4 h-4 text-blue-500" />
        <Label htmlFor="population" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Minimum Population
        </Label>
      </div>
      
      <div className="relative group">
        <div 
          className={`
            relative flex items-center rounded-lg border
            ${isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 dark:border-gray-800'}
            bg-white dark:bg-gray-950 transition-all duration-200
          `}
        >
          <div className="flex-1 flex items-center">
            <Input
              id="population"
              type="number"
              placeholder="0"
              value={displayValue}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              min={MIN_VALUE}
              step={STEP}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 pr-2">
              million
            </span>
          </div>
          
          <div className="flex flex-col border-l dark:border-gray-800">
            <button
              onClick={() => incrementValue(STEP)}
              className="px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              type="button"
              aria-label="Increase value"
            >
              <ChevronUp className="w-4 h-4 text-gray-500" />
            </button>
            <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800" />
            <button
              onClick={() => incrementValue(-STEP)}
              className="px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              disabled={!displayValue || Number(displayValue) <= MIN_VALUE}
              type="button"
              aria-label="Decrease value"
            >
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {actualValue && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute left-0 -bottom-6 text-xs text-gray-500 dark:text-gray-400"
            >
              {`${formatPopulation(actualValue)} people`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
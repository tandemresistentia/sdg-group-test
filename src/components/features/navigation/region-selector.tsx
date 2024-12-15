import { usePopulationStore } from '@/store/population';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Globe, Map, Navigation } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { REGIONS, variants } from '@/constants/constants';
import { RegionButtonProps } from '@/types/dashboard';

const RegionButton = ({ region, icon: Icon, isActive, onClick }: RegionButtonProps) => {
  return (
    <motion.button
      variants={variants.item}
      onClick={onClick}
      className={cn(
        "w-full group relative flex items-center gap-3 px-3 py-2 rounded-lg",
        "transition-all duration-200 ease-in-out",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive ? "bg-blue-50 dark:bg-blue-900/20" : "bg-transparent"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 w-1 h-full bg-blue-500 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <div className={cn(
        "p-2 rounded-md transition-colors",
        isActive
          ? "text-blue-500 bg-blue-100 dark:bg-blue-900/40"
          : "text-gray-400 bg-gray-100 dark:bg-gray-800"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <span className={cn(
        "flex-1 text-sm font-medium text-left transition-colors",
        isActive
          ? "text-blue-500 dark:text-blue-400"
          : "text-gray-600 dark:text-gray-400",
        "group-hover:text-gray-900 dark:group-hover:text-gray-300"
      )}>
        {region === 'all' ? 'All Regions' : region}
      </span>
      <Navigation className={cn(
        "w-4 h-4 transition-all",
        "opacity-0 group-hover:opacity-100",
        isActive ? "text-blue-500" : "text-gray-400",
        "transform -rotate-45",
        "group-hover:translate-x-1"
      )} />
    </motion.button>
  );
}

export const RegionSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedRegion, setSelectedRegion } = usePopulationStore();

  useEffect(() => {
    const regionParam = searchParams.get('region');
    if (!selectedRegion && regionParam && REGIONS.includes(regionParam)) {
      setSelectedRegion(regionParam);
    }
  }, [searchParams]);

  const handleRegionClick = useCallback((region: string) => {
    if (region === selectedRegion) return;
    setSelectedRegion(region);
    router.push(region === 'all' ? '/' : `/continents?region=${region}`);
  }, [selectedRegion, router, setSelectedRegion]);

  return (
    <motion.div
      variants={variants.container}
      initial="hidden"
      animate="visible"
      className="w-full space-y-1"
    >
      <RegionButton
        region="all"
        icon={Globe}
        isActive={!selectedRegion || selectedRegion === 'all'}
        onClick={() => handleRegionClick('all')}
      />
      {REGIONS.map(region => (
        <RegionButton
          key={region}
          region={region}
          icon={Map}
          isActive={selectedRegion === region}
          onClick={() => handleRegionClick(region)}
        />
      ))}
    </motion.div>
  );
}
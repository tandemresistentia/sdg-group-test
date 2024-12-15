import { useMemo } from 'react';
import { useCountries } from '@/hooks/use-countries';
import { usePopulationStore } from '@/store/population';
import type { RegionSummary, UseDashboardDataProps } from '@/types/dashboard';

export const useDashboardData = ({ region, groupByRegion = false }: UseDashboardDataProps) => {
 const { data: countries = [], isLoading, error } = useCountries(region);
 const populationFilter = usePopulationStore(state => state.populationFilter);

 const data = useMemo(() => {
   const filtered = countries.filter(
     country => !populationFilter || country.population >= populationFilter
   );
   if (!groupByRegion) {
     return filtered.map(country => ({
       name: country.name.common,
       totalPopulation: country.population,
       countries: [country]
     }));
   }

   return Object.values(filtered.reduce((acc, country) => {
     const region = country.region;
     if (!acc[region]) {
       acc[region] = {
         name: region,
         totalPopulation: 0,
         countries: []
       };
     }
     acc[region].totalPopulation += country.population;
     acc[region].countries.push(country);
     return acc;
   }, {} as Record<string, RegionSummary>));
 }, [countries, populationFilter, groupByRegion])
 .sort((a, b) => b.totalPopulation - a.totalPopulation);
 return { data, isLoading, error };
}
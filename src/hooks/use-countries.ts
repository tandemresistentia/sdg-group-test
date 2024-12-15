import useSWR from 'swr';
import { getCountries, getCountriesByRegion } from '@/lib/api/countries';
import { CountriesState } from '@/types/api';

export const useCountries = (region?: string | null) => {
  return useSWR<CountriesState['data']>(
    ['countries', region],
    async () => {
      return region ? await getCountriesByRegion(region) : await getCountries();
    },
    {
      revalidateOnFocus: false,
      onError: (err) => console.error('Failed to fetch countries:', err)
    }
  );
};
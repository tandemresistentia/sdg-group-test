import { BASE_URL, FIELDS } from '@/constants/constants';
import { Country } from '@/types/api';

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getCountries(): Promise<Country[]> {
  return fetchApi<Country[]>(`/all?${FIELDS}`);
}

export async function getCountriesByRegion(region: string): Promise<Country[]> {
  return fetchApi<Country[]>(`/region/${region}?${FIELDS}`);
}
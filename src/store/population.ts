import { create } from 'zustand';
import { PopulationState } from '@/types/store';

export const usePopulationStore = create<PopulationState>((set) => ({
  countries: [],
  selectedRegion: null,
  populationFilter: null,
  isLoading: false,
  error: null,
  setCountries: (countries) => set({ countries }),
  setSelectedRegion: (region) => set({ selectedRegion: region === '' ? null : region }),
  setPopulationFilter: (population) => set({ populationFilter: population }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  resetFilters: () => set({ selectedRegion: null, populationFilter: null }),
}));
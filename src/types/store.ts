import { Country } from "./api";

interface PopulationStateData {
  countries: Country[];
  selectedRegion: string | null;
  populationFilter: number | null;
  isLoading: boolean;
  error: string | null;
}

interface PopulationStateActions {
  setCountries: (countries: Country[]) => void;
  setSelectedRegion: (region: string | null) => void;
  setPopulationFilter: (population: number | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetFilters: () => void;
}

export interface PopulationState extends PopulationStateData, PopulationStateActions {}
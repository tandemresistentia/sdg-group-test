export interface Country {
  name: CountryName;
  population: number;
  region: string;
  subregion: string;
  flags: CountryFlags;
}

interface CountryName {
  common: string;
  official: string;
}

interface CountryFlags {
  svg: string;
  png: string;
}

export interface CountriesState {
  data: Country[];
  isLoading?: boolean;
  error?: string | null;
}

export interface RegionSummary {
  name: string;
  totalPopulation: number;
  countries: Country[];
}

export interface PopulationValue {
  displayValue: string;
  actualValue: number | null;
}
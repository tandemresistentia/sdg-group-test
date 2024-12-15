import { usePopulationStore } from './population';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Population Store', () => {
  beforeEach(() => {
    usePopulationStore.setState({
      countries: [],
      selectedRegion: null,
      populationFilter: null,
      isLoading: false,
      error: null,
    });
  });

  it('should initialize with correct default values', () => {
    const state = usePopulationStore.getState();
    
    expect(state.countries).toEqual([]);
    expect(state.selectedRegion).toBeNull();
    expect(state.populationFilter).toBeNull();
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBeNull();
  });

  it('should set countries', () => {
    const mockCountries = [
      { 
        name: { 
          common: 'Spain',
          official: 'Kingdom of Spain'  
        }, 
        population: 47000000,
        region: 'Europe',
        subregion: 'Southern Europe',
        flags: {
          png: 'https://example.com/spain-flag.png',
          svg: 'https://example.com/spain-flag.svg'
        }
      }
    ];   
    
    usePopulationStore.getState().setCountries(mockCountries);
    
    expect(usePopulationStore.getState().countries).toEqual(mockCountries);
  });

  it('should set selected region', () => {
    usePopulationStore.getState().setSelectedRegion('Europe');
    
    expect(usePopulationStore.getState().selectedRegion).toBe('Europe');
  });

  it('should convert empty string region to null', () => {
    usePopulationStore.getState().setSelectedRegion('');
    
    expect(usePopulationStore.getState().selectedRegion).toBeNull();
  });

  it('should set population filter', () => {
    usePopulationStore.getState().setPopulationFilter(1000000);
    
    expect(usePopulationStore.getState().populationFilter).toBe(1000000);
  });

  it('should set loading state', () => {
    usePopulationStore.getState().setIsLoading(true);
    
    expect(usePopulationStore.getState().isLoading).toBeTruthy();
  });

  it('should set error state', () => {
    const error = 'Test error';
    usePopulationStore.getState().setError(error);
    
    expect(usePopulationStore.getState().error).toBe(error);
  });

  it('should reset filters', () => {
    usePopulationStore.setState({
      selectedRegion: 'Europe',
      populationFilter: 1000000
    });

    usePopulationStore.getState().resetFilters();
    
    const state = usePopulationStore.getState();
    expect(state.selectedRegion).toBeNull();
    expect(state.populationFilter).toBeNull();
  });
});
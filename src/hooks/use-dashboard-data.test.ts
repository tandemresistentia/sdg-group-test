import { renderHook } from '@testing-library/react';
import { expect, test, vi, describe, beforeEach } from 'vitest';
import { useDashboardData } from './use-dashboard-data';
import { useCountries } from '@/hooks/use-countries';
import { usePopulationStore } from '@/store/population';
import type { Country } from '@/types/api';
import { SWRResponse } from 'swr';

vi.mock('@/hooks/use-countries');
vi.mock('@/store/population');

const mockCountries: Country[] = [
  {
    name: { common: 'Brazil', official: 'BR' },
    population: 200000000,
    region: 'Americas',
    subregion: 'South America',
    flags: { svg: 'brazil.svg', png: 'brazil.png' }
  },
  {
    name: { common: 'France', official: 'FR' },
    population: 67000000,
    region: 'Europe',
    subregion: 'Western Europe',
    flags: { svg: 'france.svg', png: 'france.png' }
  },
  {
    name: { common: 'Germany', official: 'GER' },
    population: 83000000,
    region: 'Europe',
    subregion: 'Western Europe',
    flags: { svg: 'germany.svg', png: 'germany.png' }
  }
];

describe('useDashboardData', () => {
  beforeEach(() => {
    vi.mocked(useCountries).mockReturnValue({
      data: mockCountries,
      isLoading: false,
      error: null,
      mutate: vi.fn(),
      isValidating: false
    } as unknown as SWRResponse<Country[], any>);

    vi.mocked(usePopulationStore).mockReturnValue(0);
  });

  test('returns individual countries when not grouped', () => {
    const { result } = renderHook(() => 
      useDashboardData({ region: undefined, groupByRegion: false })
    );

    expect(result.current.data).toHaveLength(3);
    expect(result.current.data[0].name).toBe('Brazil');
    expect(result.current.data[0].totalPopulation).toBe(200000000);
  });

  test('returns grouped regions when groupByRegion is true', () => {
    const { result } = renderHook(() => 
      useDashboardData({ region: undefined, groupByRegion: true })
    );

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0].name).toBe('Americas');
    expect(result.current.data[0].totalPopulation).toBe(200000000);
    expect(result.current.data[1].name).toBe('Europe');
    expect(result.current.data[1].totalPopulation).toBe(150000000);
  });

  test('filters by population threshold', () => {
    vi.mocked(usePopulationStore).mockReturnValue(100000000);

    const { result } = renderHook(() => 
      useDashboardData({ region: undefined, groupByRegion: false })
    );

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].name).toBe('Brazil');
  });

  test('sorts by total population', () => {
    const { result } = renderHook(() => 
      useDashboardData({ region: undefined, groupByRegion: false })
    );

    const populations = result.current.data.map(d => d.totalPopulation);
    expect(populations).toEqual([200000000, 83000000, 67000000]);
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCountries } from './use-countries';
import { getCountries, getCountriesByRegion } from '@/lib/api/countries';
import { Country } from '@/types/api';

vi.mock('@/lib/api/countries', () => ({
  getCountries: vi.fn(),
  getCountriesByRegion: vi.fn()
}));

const mockCountries: Country[] = [
  {
    name: {
      common: 'United States',
      official: 'United States of America'
    },
    population: 331002651,
    region: 'Americas',
    subregion: 'North America',
    flags: {
      svg: 'https://flagcdn.com/us.svg',
      png: 'https://flagcdn.com/w320/us.png'
    }
  },
  {
    name: {
      common: 'Canada',
      official: 'Canada'
    },
    population: 38005238,
    region: 'Americas',
    subregion: 'North America',
    flags: {
      svg: 'https://flagcdn.com/ca.svg',
      png: 'https://flagcdn.com/w320/ca.png'
    }
  }
];

const mockEuropeanCountries: Country[] = [
  {
    name: {
      common: 'France',
      official: 'French Republic'
    },
    population: 67391582,
    region: 'Europe',
    subregion: 'Western Europe',
    flags: {
      svg: 'https://flagcdn.com/fr.svg',
      png: 'https://flagcdn.com/w320/fr.png'
    }
  },
  {
    name: {
      common: 'Germany',
      official: 'Federal Republic of Germany'
    },
    population: 83240525,
    region: 'Europe',
    subregion: 'Western Europe',
    flags: {
      svg: 'https://flagcdn.com/de.svg',
      png: 'https://flagcdn.com/w320/de.png'
    }
  }
];

describe('useCountries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all countries when no region is specified', async () => {
    vi.mocked(getCountries).mockResolvedValue(mockCountries);

    const { result } = renderHook(() => useCountries());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockCountries);
    });

    expect(getCountries).toHaveBeenCalledTimes(1);
    expect(getCountriesByRegion).not.toHaveBeenCalled();
  });

  it('should fetch countries by region when region is specified', async () => {
    vi.mocked(getCountriesByRegion).mockResolvedValue(mockEuropeanCountries);

    const { result } = renderHook(() => useCountries('europe'));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockEuropeanCountries);
    });

    expect(getCountriesByRegion).toHaveBeenCalledTimes(1);
    expect(getCountriesByRegion).toHaveBeenCalledWith('europe');
    expect(getCountries).not.toHaveBeenCalled();
  });

  it('should not revalidate on focus', async () => {
    vi.mocked(getCountries).mockResolvedValue(mockCountries);
    
    const { result } = renderHook(() => useCountries());

    await waitFor(
      () => {
        expect(result.current.data).toBeDefined();
      },
      { timeout: 2000 }
    );
    
    const callCount = vi.mocked(getCountries).mock.calls.length;

    window.dispatchEvent(new Event('focus'));
    
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    expect(vi.mocked(getCountries).mock.calls.length).toBe(callCount);
  });
});
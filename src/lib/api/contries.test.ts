import { beforeEach, describe, expect, test, vi } from 'vitest'
import { getCountries, getCountriesByRegion } from './countries'

const mockCountries = [
  {
    name: { common: 'Brazil' },
    population: 200000000,
    region: 'Americas',
    subregion: 'South America',
    flags: { svg: 'test.svg', png: 'test.png' }
  }
]

describe('countries api', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    global.fetch = vi.fn()
  })

  test('getCountries calls correct endpoint and returns data', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCountries)
    } as Response)

    const data = await getCountries()

    expect(fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/all?fields=name,population,region,subregion,flags'
    )
    expect(data).toEqual(mockCountries)
  })

  test('getCountriesByRegion calls correct endpoint', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCountries)
    } as Response)

    await getCountriesByRegion('Europe')

    expect(fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/region/Europe?fields=name,population,region,subregion,flags'
    )
  })

  test('throws error on failed request', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    } as Response)

    await expect(getCountries()).rejects.toThrow('API Error: 404 - Not Found')
  })
})
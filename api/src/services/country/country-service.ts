import { CountryRedisRepository } from '../../repository/country-redis-repository'
import { FirstOrgApiService } from '../first-org/first-org-api-service'
import { CountriesList } from '../first-org/types'
import { ListCountriesFilters } from './types'

export class CountryService {
    static async getAll (filters?: ListCountriesFilters) {
        const page = filters?.page ? Number(filters.page) : 1

        let countries: CountriesList
        let isCached = false

        const cachedResult = await CountryRedisRepository.getCountries()

        if (cachedResult) {
            isCached = true
            countries = cachedResult
        } else {
            countries = await FirstOrgApiService.getCountries()
            await CountryRedisRepository.setCountries(countries)
        }

        if (filters?.country) {
            countries = CountryService.filterBy(countries, 'country', filters.country)
        }

        if (filters?.region) {
            countries = CountryService.filterBy(countries, 'region', filters.region)
        }

        countries = CountryService.paginate(countries, page)

        return {
            countries,
            isCached
        }
    }

    private static filterBy (countries: CountriesList, field: 'country' | 'region', searchValue: string) {
        searchValue = searchValue.toLowerCase()

        const filteredEntries = Object.entries(countries)
            .filter(([_, value]) => value[field].toLowerCase().includes(searchValue))
        
        const filteredObject = Object.fromEntries(filteredEntries)

        return filteredObject
    }

    private static paginate (countries: CountriesList, page: number, perPage = 10): CountriesList {
        const start = page * perPage - 10
        const end = page * perPage

        const result =  Object.keys(countries)
            .filter((key, index) => index >= start && index < end)
            .map(key => ({[key]: countries[key]}))

        return Object.assign({}, ...result)
    }
}
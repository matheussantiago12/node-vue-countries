import { firstOrgApi } from './axios'
import { CountriesApiResponse } from './types'

export class FirstOrgApiService {
    static async getCountries() {
        const { data } = await firstOrgApi.get<CountriesApiResponse>('/countries')

        return data.data
    }
}
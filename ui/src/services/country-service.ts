import { api } from './api'

type GetCountriesParams = {
    country?: string
    region?: string
    page: number
}

export class CountryService {
    static async getAll (params?: GetCountriesParams) {
        let queryParams = ''

        if (params?.country)
            queryParams += `country=${params.country}&`

        if (params?.region)
            queryParams += `region=${params.region}&`

        if (params?.page)
            queryParams += 'page=' + String(params.page)

        const { data } = await api.get('/countries?' + queryParams)

        const countries = Object.entries(data.countries).map(([key, value]) => value)

        return countries
    }
}

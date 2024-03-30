export type CountriesList = {
    [key: string]: {
        country: string
        region: string
    }
}

export type CountriesApiResponse = {
    status: string
    'status-code': number
    version: string
    access: string
    data: CountriesList
}
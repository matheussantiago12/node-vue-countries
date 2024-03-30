import { getRedis, setExpirationRedis, setRedis } from '../redis'
import { CountriesList } from '../services/first-org/types'

export class CountryRedisRepository {
    static async getCountries () {
        const data = await getRedis('countries')

        if (data) {
            const countries: CountriesList = JSON.parse(data)
            return countries
        }
    }

    static async setCountries (countries: CountriesList) {
       await setRedis('countries', JSON.stringify(countries))
       await setExpirationRedis('countries', 60) // Depois de 1 minuto os dados expiram
    }
}
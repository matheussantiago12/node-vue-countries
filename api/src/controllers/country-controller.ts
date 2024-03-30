import { Request, Response } from 'express'
import { CountryService } from '../services/country/country-service'

type Query = {
    country?: string
    region?: string
    page?: string
}

export class CountryController {
    async getAll (req: Request<{}, {}, {}, Query>, res: Response): Promise<Response> {
        try {
            const { country, region, page } = req.query
            const data = await CountryService.getAll({ country, region, page })

            return res.json(data)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}
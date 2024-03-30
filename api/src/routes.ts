import { Router } from 'express'
import { CountryController } from './controllers/country-controller'

const countryController = new CountryController()

export const routes = Router()

routes.get('/countries', countryController.getAll)

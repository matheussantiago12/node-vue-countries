import axios from 'axios'

export const firstOrgApi = axios.create({
    baseURL: 'https://api.first.org/data/v1/'
})
import Redis from 'ioredis'
import { promisify } from 'util'

const redisClient = new Redis({ host: 'redis' })

export const getRedis = (value: string) => {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)
  return syncRedisGet(value)
}

export const setRedis = (key: string, value: string) => {
  const syncRedisSet = promisify(redisClient.setnx).bind(redisClient) // Só insere se não tiver dados
  return syncRedisSet(key, value)
}

export const setExpirationRedis = (key: string, value: number) => {
    const syncRedisSetExpiration = promisify(redisClient.expire).bind(redisClient)
    return syncRedisSetExpiration(key, value)
  }

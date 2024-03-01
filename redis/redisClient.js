import Redis from "redis"

export const redisClient = await Redis.createClient({
    database : 3
}).on('error', err => console.log('Redis Client Error', err))
.connect()

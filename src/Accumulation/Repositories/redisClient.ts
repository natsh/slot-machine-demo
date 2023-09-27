import Redis from 'ioredis-mock';

const RedisClient = new Redis();  // This creates a new in-memory Redis client

export default RedisClient;
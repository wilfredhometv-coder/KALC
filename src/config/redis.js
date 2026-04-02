const redis = require('redis');

// Create a Redis client for caching
const cacheClient = redis.createClient();

// Error handling for Redis client
cacheClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

// Function to set value in cache
const setCache = (key, value, expiryInSeconds) => {
    cacheClient.set(key, value, 'EX', expiryInSeconds);
};

// Function to get value from cache
const getCache = (key) => {
    return new Promise((resolve, reject) => {
        cacheClient.get(key, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Exporting cache functions
module.exports = { setCache, getCache, cacheClient };
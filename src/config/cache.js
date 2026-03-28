require("dotenv").config();
const Redis = require("ioredis");

const redis = new Redis({
    host: process.env.HOST,
    port: process.env.PORT,
    password: process.env.PASSWORD,
});

redis.on("connect", () => {
    console.log("✅ Connected to Redis Cloud");
});

redis.on("ready", () => {
    console.log("🚀 Redis ready");
});

redis.on("error", (err) => {
    console.log("❌ Redis error:", err);
});

module.exports = redis;
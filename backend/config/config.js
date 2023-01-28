module.exports = {
    PORT : process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET_KEY,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    COOKIE_EXPIRE: process.env.COOKIE_EXPIRE,
}
module.exports = {
    PORT : process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET_KEY,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    COOKIE_EXPIRE: process.env.COOKIE_EXPIRE,
    SMPT : {
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
            user: process.env.SMPT_USER,
            pass: process.env.SMPT_PASSWORD
        }
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    TEMP_URL: process.env.TEMP_URL,
    STRIPE: {
        API_KEY: process.env.STRIPE_API_KEY,
        SECRET_KEY: process.env.STRIPE_SECRET_KEY
    }
}
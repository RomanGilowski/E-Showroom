require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3002,
    database: process.env.DATABASE || 'mongodb://127.0.0.1:27017/katalog',
    sessionKeySecret: process.env.SESSION_KEY_SECRET,
    ssl: process.env.SSL || false,
}
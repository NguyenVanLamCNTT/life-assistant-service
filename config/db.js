require('dotenv').config();
module.exports = {
    DB: {
        URL: process.env.PRODUCTION_DATABASE_URL,
        CONFIG: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
};

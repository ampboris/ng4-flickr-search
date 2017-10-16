// server/config.js
module.exports = {
    AUTH0_DOMAIN: 'xxx.auth0.com',
    AUTH0_API_AUDIENCE: 'http://localhost:8083/api/',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://',
    NAMESPACE: 'http://myapp.com/roles'
};
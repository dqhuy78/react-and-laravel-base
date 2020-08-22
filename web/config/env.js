const {
    cleanEnv, host, port, str
} = require('envalid');

module.exports = cleanEnv(process.env, {
    APP_URL: str(),
    APP_BACKEND_DIR: str(),
    HMR_HOST: host({
        default: '0.0.0.0'
    }),
    HMR_PORT: port({
        default: '8080'
    }),
    SENTRY_DSN: str()
}, { strict: true });

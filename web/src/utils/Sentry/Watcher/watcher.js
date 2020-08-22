import * as Sentry from '@sentry/browser';

export default function sentryWatcher() {
    if (process.env.NODE_ENV === 'production') {
        Sentry.init({ dsn: process.env.SENTRY_DSN });
    }
}

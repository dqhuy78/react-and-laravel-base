import * as Sentry from '@sentry/browser';

export default function sentryCapture(error, errorInfo) {
    if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error);
    } else {
        /* eslint-disable */
        console.log(error);
        console.log(errorInfo);
        /* eslint-enable */
    }
}

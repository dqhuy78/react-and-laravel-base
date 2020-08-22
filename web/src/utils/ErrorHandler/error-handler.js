import { message } from 'antd';

export default function handleError(error, callback = null) {
    if (process.env.NODE_ENV !== 'production') {
        /* eslint-disable */
        console.log(error);
        /* eslint-enable */
    }
    if (callback != null) {
        callback(error);
    } else {
        message.error('Sorry, something went wrong. Please try again later !');
    }
}

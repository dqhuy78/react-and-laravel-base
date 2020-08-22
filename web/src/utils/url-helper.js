export const getQueryParams = (search) => {
    const queryObject = {};
    const urlParams = new URLSearchParams(search);
    /* eslint-disable */
    for (const key of urlParams.keys()) {
        queryObject[key] = urlParams.get(key);
    }
    /* eslint-enable */

    return queryObject;
};

export const toQueryString = (queryObject) => {
    /* eslint-disable */
    const queryString = Object.keys(queryObject).map((key) => {
        if (queryObject[key]) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`;
        }
    }).join('&');
    /* eslint-enable */
    return queryString;
};

export const pushUrl = (history, queryString) => {
    history.push({
        pathname: history.location.pathname,
        search: `?${queryString}`
    });

    return true;
};

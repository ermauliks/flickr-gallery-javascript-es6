export function buildUrl(url, parameters) {
    let queryString = '';

    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}&`;
        }
    }

    if (queryString.lastIndexOf('&') === queryString.length - 1) {
        queryString = queryString.substring(0, queryString.length - 1);
    }

    return `${url}?${queryString}`;
}

export function extend(object) {
    for (let i = 1; i < arguments.length; i++) {
        for (const key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                object[key] = arguments[i][key];
            }
        }
    }

    return object;
}

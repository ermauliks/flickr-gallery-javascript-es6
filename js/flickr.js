'use strict';

import * as constants from './constants';
import { buildUrl, extend } from './util';

export function getPhotos(parameters) {
    var requestParameters = extend(parameters, {
        method: 'flickr.people.getPublicPhotos',
        api_key: constants.API_KEY,
        user_id: '40246125@N08',
        format: 'json'
    });

    var script = document.createElement('script');
    script.src = buildUrl(constants.API_URL, requestParameters);
    document.head.appendChild(script);
    document.head.removeChild(script);
}

export function buildThumbnailUrl(photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
        '/' + photo.id + '_' + photo.secret + '_q.jpg';
}

export function buildPhotoUrl(photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
        '/' + photo.id + '_' + photo.secret + '.jpg';
}

export function buildPhotoLargeUrl(photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
        '/' + photo.id + '_' + photo.secret + '_b.jpg';
}

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var API_KEY = exports.API_KEY = '00f9f85ead41efb5c77a403fb2004b8d';
var API_URL = exports.API_URL = 'https://api.flickr.com/services/rest/';

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPhotos = getPhotos;
exports.buildThumbnailUrl = buildThumbnailUrl;
exports.buildPhotoUrl = buildPhotoUrl;
exports.buildPhotoLargeUrl = buildPhotoLargeUrl;

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getPhotos(parameters) {
    var requestParameters = (0, _util.extend)(parameters, {
        method: 'flickr.people.getPublicPhotos',
        api_key: constants.API_KEY,
        user_id: '40246125@N08',
        format: 'json'
    });

    var script = document.createElement('script');
    script.src = (0, _util.buildUrl)(constants.API_URL, requestParameters);
    document.head.appendChild(script);
    document.head.removeChild(script);
}

function buildThumbnailUrl(photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
}

function buildPhotoUrl(photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
}

function buildPhotoLargeUrl(photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
}

},{"./constants":1,"./util":5}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flickr = require('./flickr');

var flickr = _interopRequireWildcard(_flickr);

var _lightbox = require('./lightbox');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlickrGallery = function () {
    function FlickrGallery() {
        _classCallCheck(this, FlickrGallery);
    }

    _createClass(FlickrGallery, [{
        key: 'init',
        value: function init() {
            var page = 1;

            this.children = {
                'loadMore': document.getElementsByClassName('js-thumbnails_loadmore')[0]
            };

            var self = this;
            this.children.loadMore.addEventListener('click', function (event) {
                event.preventDefault();
                self.loadMorePhotos(++page);
            });

            this.getPhotos(1);
        }
    }, {
        key: 'showPhotos',
        value: function showPhotos(data) {
            this.lightbox = new _lightbox.LightBox(data, document.getElementsByClassName('js-lightbox_image')[0]);
            this.lightbox.createThumbnailsLightBox(document.getElementsByClassName('js-thumbnails_list')[0]);
        }
    }, {
        key: 'loadMore',
        value: function loadMore(data) {
            this.lightbox.loadMore(data);
            this.lightbox.createThumbnailsLightBox(document.getElementsByClassName('js-thumbnails_list')[0]);
        }
    }, {
        key: 'loadMorePhotos',
        value: function loadMorePhotos(page) {
            flickr.getPhotos({
                per_page: 15,
                jsoncallback: 'flickrGallaryCallbacks.loadMore',
                page: page > 0 ? page : 1
            });
        }
    }, {
        key: 'getPhotos',
        value: function getPhotos(page) {
            flickr.getPhotos({
                per_page: 15,
                jsoncallback: 'flickrGallaryCallbacks.showPhotos',
                page: page > 0 ? page : 1
            });
        }
    }]);

    return FlickrGallery;
}();

// Init entire app


var flickrGallary = new FlickrGallery();
flickrGallary.init();

window.flickrGallaryCallbacks = {
    loadMore: function loadMore(data) {
        flickrGallary.loadMore(data);
    },
    showPhotos: function showPhotos(data) {
        flickrGallary.showPhotos(data);
    }
};

},{"./flickr":2,"./lightbox":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LightBox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flickr = require('./flickr');

var flickr = _interopRequireWildcard(_flickr);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LightBox = exports.LightBox = function () {
    function LightBox(data, container) {
        _classCallCheck(this, LightBox);

        this.currentIndex = 0;
        this.photos = data.photos.photo;
        this.image = container;

        this.children = {
            lightboxWrapper: document.getElementsByClassName('js-lightbox')[0],
            titleBar: document.getElementsByClassName('js-lightbox_photo-title')[0],
            container: document.getElementsByClassName('js-lightbox_inner-content')[0],
            nextButton: document.getElementsByClassName('js-lightbox_arrow--right')[0],
            prevButton: document.getElementsByClassName('js-lightbox_arrow--left')[0],
            cross: document.getElementsByClassName('js-lightbox_close')[0],
            overlay: document.getElementsByClassName('js-lightbox_overlay')[0],
            leftArrow: document.getElementsByClassName('js-lightbox_arrow--left')[0],
            rightArrow: document.getElementsByClassName('js-lightbox_arrow--right')[0]
        };

        this.children.cross.addEventListener('click', this.closeLightBox.bind(this), false);
        this.children.overlay.addEventListener('click', this.closeLightBox.bind(this), false);
        this.children.leftArrow.addEventListener('click', this.showPrevious.bind(this), false);
        this.children.rightArrow.addEventListener('click', this.showNext.bind(this), false);

        this.initShortCuts();
    }

    _createClass(LightBox, [{
        key: 'initShortCuts',
        value: function initShortCuts() {
            var _this = this;

            document.addEventListener('keydown', function (event) {
                switch (event.which) {
                    case 37:
                        _this.showPrevious();
                        break;
                    case 39:
                        _this.showNext();
                        break;
                    case 27:
                        _this.closeLightBox();
                        break;
                }
            }, false);
        }
    }, {
        key: 'loadMore',
        value: function loadMore(data) {
            this.photos = this.photos.concat(data.photos.photo);

            if (data.photos.pages === data.photos.page) {
                var loadMore = document.getElementsByClassName('js-thumbnails_loadmore')[0];
                loadMore.style.display = 'none';
            }
        }
    }, {
        key: 'openLightBox',
        value: function openLightBox(index) {
            this.loadPhoto(index);
            this.children.lightboxWrapper.classList.add('lightbox--open');
            ga('send', { hitType: 'event', eventCategory: 'Lightbox', eventAction: 'Click', eventLabel: index });
        }
    }, {
        key: 'closeLightBox',
        value: function closeLightBox() {
            this.children.lightboxWrapper.classList.remove('lightbox--open');
        }
    }, {
        key: 'loadPhoto',
        value: function loadPhoto(index) {
            this.children.nextButton.disabled = false;
            this.children.prevButton.disabled = false;

            if (index >= 0 && index < this.photos.length) {
                this.currentIndex = index;
                this.image.src = flickr.buildPhotoLargeUrl(this.photos[this.currentIndex]);
                this.image.alt = this.photos[this.currentIndex].title;
                this.children.titleBar.innerHTML = this.photos[this.currentIndex].title;
            }
            if (this.currentIndex === this.photos.length - 1) {
                this.children.nextButton.disabled = true;
            }
            if (this.currentIndex === 0) {
                this.children.prevButton.disabled = true;
            }
        }
    }, {
        key: 'showPrevious',
        value: function showPrevious() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }

            this.loadPhoto(this.currentIndex);
        }
    }, {
        key: 'showNext',
        value: function showNext() {
            if (this.currentIndex < this.photos.length - 1) {
                this.currentIndex++;
            }

            this.loadPhoto(this.currentIndex);
        }
    }, {
        key: 'createThumbnailsLightBox',
        value: function createThumbnailsLightBox(container) {
            // TODO: Shouldn't have to clear it everytime. Needs clean up.

            document.getElementsByClassName('js-thumbnails_list')[0].innerHTML = '';

            function clickHandler(index, lightbox) {
                return function (event) {
                    event.preventDefault();
                    lightbox.openLightBox(index);
                };
            }

            var image = void 0,
                link = void 0,
                listItem = void 0;
            for (var i = 0; i < this.photos.length; i++) {
                image = document.createElement('img');
                image.src = flickr.buildThumbnailUrl(this.photos[i]);
                image.className = 'thumbnail';
                image.alt = this.photos[i].title;
                image.title = this.photos[i].title;

                link = document.createElement('a');
                link.href = image.src;
                link.addEventListener('click', clickHandler(i, this));
                link.appendChild(image);

                listItem = document.createElement('li');
                listItem.appendChild(link);

                container.appendChild(listItem);
            }
        }
    }]);

    return LightBox;
}();

},{"./flickr":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildUrl = buildUrl;
exports.extend = extend;
function buildUrl(url, parameters) {
    var queryString = '';

    for (var key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            queryString += encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]) + '&';
        }
    }

    if (queryString.lastIndexOf('&') === queryString.length - 1) {
        queryString = queryString.substring(0, queryString.length - 1);
    }

    return url + '?' + queryString;
}

function extend(object) {
    for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                object[key] = arguments[i][key];
            }
        }
    }

    return object;
}

},{}]},{},[3]);

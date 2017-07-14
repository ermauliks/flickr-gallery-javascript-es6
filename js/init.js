import * as flickr from './flickr'
import { LightBox } from './lightbox'

class FlickrGallery {
    init() {
        let page = 1;

        this.children = {
            'loadMore': document.getElementsByClassName('js-thumbnails_loadmore')[0]
        };

        let self = this;
        this.children.loadMore.addEventListener('click', event => {
            event.preventDefault();
            self.loadMorePhotos(++page);
        });

        this.getPhotos(1);
    }

    showPhotos(data) {
        this.lightbox = new LightBox(data, document.getElementsByClassName('js-lightbox_image')[0]);
        this.lightbox.createThumbnailsLightBox(document.getElementsByClassName('js-thumbnails_list')[0]);
    }

    loadMore(data) {
        this.lightbox.loadMore(data);
        this.lightbox.createThumbnailsLightBox(document.getElementsByClassName('js-thumbnails_list')[0]);
    }

    loadMorePhotos(page) {
        flickr.getPhotos({
            per_page: 15,
            jsoncallback: 'flickrGallaryCallbacks.loadMore',
            page: page > 0 ? page : 1
        });
    }

    getPhotos(page) {
        flickr.getPhotos({
            per_page: 15,
            jsoncallback: 'flickrGallaryCallbacks.showPhotos',
            page: page > 0 ? page : 1
        });
    }
}

// Init entire app
let flickrGallary = new FlickrGallery();
flickrGallary.init();

window.flickrGallaryCallbacks = {
    loadMore: function(data) { flickrGallary.loadMore(data) },
    showPhotos: function(data) { flickrGallary.showPhotos(data) },
}

import * as flickr from './flickr'

export class LightBox {
    constructor(data, container) {
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
        }

        this.children.cross.addEventListener('click', this.closeLightBox.bind(this), false);
        this.children.overlay.addEventListener('click', this.closeLightBox.bind(this), false);
        this.children.leftArrow.addEventListener('click', this.showPrevious.bind(this), false);
        this.children.rightArrow.addEventListener('click', this.showNext.bind(this), false);

        this.initShortCuts();
    }

    initShortCuts() {
        document.addEventListener('keydown', event => {
            switch (event.which) {
                case 37:
                    this.showPrevious();
                    break;
                case 39:
                    this.showNext();
                    break;
                case 27:
                    this.closeLightBox();
                    break;
            }
        }, false);
    }

    loadMore(data) {
        this.photos = this.photos.concat(data.photos.photo);

        if (data.photos.pages === data.photos.page) {
            const loadMore = document.getElementsByClassName('js-thumbnails_loadmore')[0];
            loadMore.style.display = 'none';
        }
    }

    openLightBox(index) {
        this.loadPhoto(index);
        this.children.lightboxWrapper.classList.add('lightbox--open');
        ga('send', { hitType: 'event', eventCategory: 'Lightbox', eventAction: 'Click', eventLabel: index });
    }

    closeLightBox() {
        this.children.lightboxWrapper.classList.remove('lightbox--open');
    }

    loadPhoto(index) {
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

    showPrevious() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }

        this.loadPhoto(this.currentIndex);
    }

    showNext() {
        if (this.currentIndex < this.photos.length - 1) {
            this.currentIndex++;
        }

        this.loadPhoto(this.currentIndex);
    }

    createThumbnailsLightBox(container) {
        // TODO: Shouldn't have to clear it everytime. Needs clean up.

        document.getElementsByClassName('js-thumbnails_list')[0].innerHTML = '';

        function clickHandler(index, lightbox) {
            return event => {
                event.preventDefault();
                lightbox.openLightBox(index);
            };
        }

        let image, link, listItem;
        for (let i = 0; i < this.photos.length; i++) {
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
}

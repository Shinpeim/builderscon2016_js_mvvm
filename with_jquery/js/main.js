$(function(){
    const selector = new ImageSelector($('.selected-images'), $('.recently-posted-images'));
    selector.showRecentlyImages();
});

class ImageSelector {
    constructor(selectedImagesElement, recentlyPostedImagesElement) {
        this.selectedImagesElement = selectedImagesElement;
        this.recentlyPostedImagesElement = recentlyPostedImagesElement;
    }

    showRecentlyImages() {
        this.recentlyPostedImagesElement.empty();
        this._getRecentlyPostedImages().then(images => {
            for (let i = 0; i < images.length; i++) {
                const img = $(document.createElement("img"));
                img.attr('src', images[i].url);
                this.recentlyPostedImagesElement.append(img);
            }
        });
    }

    _getRecentlyPostedImages() {
        return new Promise(function (resolve) {
            $.ajax("./stub/recently_posted_images.json", {
                success: (data, status, xhr) => {
                    resolve(data);
                }
            });
        });
    }
}

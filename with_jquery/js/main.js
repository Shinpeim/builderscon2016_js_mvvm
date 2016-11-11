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
        $.ajax("./stub/recently_posted_images.json").then(json => {
            const images = JSON.parse(json);
            for (let i = 0; i < images.length; i++) {
                const img = $(document.createElement("img"));
                img.attr('src', images[i].url);
                img.on('click', (ev)=>{
                    this.selectImage($(ev.target).clone());
                });
                this.recentlyPostedImagesElement.append(img);
            }
        });
    }

    selectImage(imageElement) {
        const selectedImageUrl = imageElement.attr('src');
        const sameUrlImages = this.selectedImagesElement.children().filter("img[src='" + selectedImageUrl + "']");
        if (sameUrlImages.length > 0) {
            return;
        }

        imageElement.on('click', ev => {
            $(ev.target).detach();
        });

        this.selectedImagesElement.append(imageElement);
    }
}

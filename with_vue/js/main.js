class Event {
   constructor() {
       this.handlers = [];
   }

   observe(handler) {
       this.handlers.push(handler);
   }

   fire() {
       _.forEach(this.handlers, h => h());
   }
}

/*
 * Model
 */
class ImageSelector {
    set selectedImages(x){
        this._selectedImages = x;
        this.selectedImagesChanged.fire();
    }
    get selectedImages(){
        return this._selectedImages;
    }

    set recentlyPostedImages(x){
        this._recentlyPostedImages = x;
        this.recentlyPostedImagesChanged.fire();
    }
    get recentlyPostedImages(){
        return this._recentlyPostedImages;
    }

    constructor(){
        this.selectedImagesChanged = new Event;
        this.recentlyPostedImagesChanged = new Event;

        this.selectedImages = [];
        this.recentlyPostedImages = [];
    }

    loadRecentlyPostedImages(){
        $.ajax("./stub/recently_posted_images.json").then(json => {
            const images = JSON.parse(json);
            this.recentlyPostedImages = images;
        });
    }

    select(i) {
        if ( _.includes(this.selectedImages, i) ) {
            return;
        }

        this.selectedImages = _.concat(this.selectedImages, [i]);
    }

    unselect(i) {
        this.selectedImages = _.filter(this.selectedImages, el => el.url != i.url);
    }
}

/*
 * ViewModel
 */
$(() => {
    window.vm = new Vue({
        el: ".main",

        init: function(){
            this.model = new ImageSelector();
        },

        ready: function(){
            this.model.loadRecentlyPostedImages();

            this.model.selectedImagesChanged.observe(() => {
                this.selectedImages = this.model.selectedImages;
            });

            this.model.recentlyPostedImagesChanged.observe(() => {
                this.recentlyPostedImages = this.model.recentlyPostedImages;
            })
        },

        data: function(){
            return {
                selectedImages: this.model.selectedImages,
                recentlyPostedImages: this.model.recentlyPostedImages
            }
        },

        methods: {
            select: function(i){ this.model.select(i) },
            unselect: function(i){ this.model.unselect(i) }
        }
    });
});

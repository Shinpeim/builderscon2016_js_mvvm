$(function(){
    getRecentlyPostedImages().then(images => {
        for (let i = 0; i < images.length; i++) {
            const img = $(document.createElement("img"));
            img.attr('src', images[i].url);
            $(".recently_posted_images").append(img);
        }
    });
});

function getRecentlyPostedImages(){
    return new Promise(function(resolve){
        $.ajax("./stub/recently_posted_images.json", {
            success: (data, status, xhr) => {
                resolve(JSON.parse(data));
            }
        });
    });
}
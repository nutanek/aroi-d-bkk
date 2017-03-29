function crop_img() {

	console.log("JQuery");

    $(".wrapimg").each(function() {
		console.log("JQuery1");
        var wFrame = $(this).width();
        var hFrame = wFrame * $(this).data("wrap-height");

        var thisImg = $(this).find(".img");

        var wImg = thisImg.data("img-width");
        var hImg = thisImg.data("img-height");

        $(this).css("height", hFrame + "px");

        var hEnlarge = (hImg * wFrame) / wImg;
        if (hEnlarge >= hFrame) {
            var rest = hEnlarge - hFrame;
            var part = rest / 3;
            thisImg.css({
                "top": -(part) - 2 + "px",
                "width": "100%",
                "height": "auto"
            });
        } else {
            var wEnlarge = (wImg * hFrame) / hImg;
            var rest = wEnlarge - wFrame;
            var part = rest / 2;
            thisImg.css({
                "left": -(part) + "px",
                "height": "100%",
                "width": "auto"
            });
        }
    });
}

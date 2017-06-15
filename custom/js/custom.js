function equalizeHeights(selector) {
    var heights = [];
    var rem = [];
    // Loop to get all element heights
    jQuery(selector).each(function () {
        // Need to let sizes be whatever they want so no overflow on resize
        jQuery(this).css('height', '0');
        jQuery(this).css('max-height', 'none');
        jQuery(this).css('height', 'auto');
        // Then add size (no units) to array
        heights.push(jQuery(this).outerHeight());
    });

    // Find max height of all elements
    var max = Math.max.apply(Math, heights);

    // Set all heights to max height
    jQuery(selector).each(function (i) {
        var self = jQuery(this);
        if (jQuery(window).width() >= 768) {
            jQuery(self).css('height', max + 'px');

        } else {
            jQuery(self).css('height', 'auto');

        }
    });
}

function containerHeight() {

    var minus = jQuery(".i");
    // console.log(minus);
    var el;
    var arr = [];
    var min = 0;
    jQuery(minus).each(function () {
        el = jQuery(this)[0].clientHeight;
        // console.log(jQuery(".eq").outerHeight() - el);
        arr.push(jQuery(".eq").outerHeight() - el);
        // console.log(arr);
        min = Math.min.apply(Math, arr);
    });

    var wW = jQuery(window).width();
    // if (wW >= 1200) {
    //     jQuery(".j").css("height", min);
    // } else {
    //     jQuery(".j").css("height", 'auto');
    // }
}
function positioning() {

    if (jQuery(".t").length) {

        var gutter = 30;

        var h = jQuery(".t")[0].clientHeight;
        var w = jQuery(".t")[0].clientWidth;
        var stEl= jQuery(".t")[0].clientHeight + gutter;
    }
    if (jQuery(window).width() > 767 && !jQuery("body").hasClass("home")) {
        h = h - 50;
        w = w + 8;
    }
    jQuery(".t").css({
        'top': -((h / 2)),
        'right': -(w / 2),
        'position': 'absolute'
    });

    // if(jQuery(window).width() >= 768) {
    //     jQuery(".s").css({
    //         'height' : ((stEl / 2) - 31)
    //     });
    // } else {
    //     jQuery(".s").css({
    //         'height' : "auto"
    //     });
    // }

}
jQuery(function () {
    equalizeHeights(".boxes-container");
    setTimeout(function() {
        equalizeHeights(".steps-visual-boxes ol li");

    },300);
    positioning();


    jQuery("#nav-tabs-wrapper li").each(function (i) {
        jQuery(this).attr("data-pos", jQuery(this).index() + 1);
    });

    //mobile tab menu

    jQuery('.nav-tabs-dropdown').each(function (i, elm) {
        var cl = jQuery(elm).next('ul').find('li:first-child').attr("class");
        var pos = jQuery(elm).next('ul').find('li:first-child').attr("data-pos") + '. ';
        var firstEl = jQuery(elm).next('ul').find("li:first-child").find("a").text();
        jQuery(elm).html('<i class="' + cl + '"></i><span>' + pos + firstEl + '</span>');


    });

    jQuery('.nav-tabs-dropdown').on('click', function (e) {


        if(jQuery(window).width() <= 767) {
            jQuery("#nav-tabs-wrapper").css("height", jQuery(this).children().outerHeight() * 3 + 27);
        }


        jQuery(e.target).toggleClass('open').next('ul').slideToggle();

    });
    jQuery('#nav-tabs-wrapper a[data-toggle="tab"]').on('click', function (e) {
        var pos = jQuery(this).parent().attr("data-pos") + '. ';
        var cl = jQuery(this).parent().attr("class");

        jQuery(e.target).closest('ul').hide().prev('a').removeClass('open').html('<i class="' + cl + '"></i><span>' + pos + jQuery(this).text() + '</span>');

    });


    //Next previous functionallity
    jQuery('.next-step').click(function (e) {
        if(jQuery(window).width() <= 767) {
            jQuery("html, body").animate({ scrollTop: 0 }, 600);
        }
        // console.log(jQuery(this).parent().parent());
        jQuery(this).parent().parent().parent().siblings('.nav-tabs').find(".active").next('li').find('a').trigger('click');
        if (jQuery(this).parent().parent().parent().siblings('.nav-tabs').find(".active").next('li').length === 1) {
            jQuery(this).parent().parent().parent().find(".next-step-link .previous-step").removeClass("hidden");
        }
        // else if (jQuery(this).parent().parent().parent().siblings('.nav-tabs').find(".active").next('li').length === 0) {
        //     // jQuery(".next-step").addClass("hidden");
        // }
    });
    jQuery('.previous-step').click(function () {
        if(jQuery(window).width() <= 767) {
            jQuery("html, body").animate({ scrollTop: 0 }, 600);
        }
        jQuery(this).parent().parent().parent().siblings('.nav-tabs').find(".active").prev('li').find('a').trigger('click');
        if (jQuery(this).parent().parent().parent().siblings('.nav-tabs').find(".active").prev('li').length === 0) {
            jQuery(this).addClass("hidden");
        } else if (jQuery(this).parent().parent().parent().siblings('.nav-tabs').find(".active").prev('li').length === 1) {
            jQuery(".next-step").removeClass("hidden");
        }
    });
    jQuery(".i li").click(function () {
        if (jQuery(this).prev().length === 1) {
            jQuery(this).parent().parent().find(".tab-content .next-step-link .previous-step").removeClass("hidden");
        } else {
            jQuery(this).parent().parent().find(".tab-content .next-step-link .previous-step").addClass("hidden");
        }
        if (jQuery(this).next().length === 0) {
            jQuery(this).parent().parent().find(".tab-content .next-step-link .next-step").addClass("hidden");
        } else {
            jQuery(this).parent().parent().find(".tab-content .next-step-link .next-step").removeClass("hidden");
        }
    });
    window.addEventListener('load', function (e) {

        window.applicationCache.addEventListener('updateready', function (e) {
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                // Browser downloaded a new app cache.
                if (confirm('A new version of this site is available. Load it?')) {
                    window.location.reload();
                }
            } else {
                // Manifest didn't changed. Nothing new to server.
            }
        }, false);

    }, false);

    jQuery("#nav-tabs-wrapper li").click(function () {
        if(jQuery(window).width() <=767) {
            jQuery("html, body").animate({ scrollTop: 0 }, 600);
        }
        if (!jQuery(this).hasClass("home-ic-tm")) {
            jQuery('.gIcon').removeClass("active");

        }
    });


    jQuery('.gIcon').click(function () {
        var self = jQuery(this);
        if (!jQuery(this).hasClass(".active")) {
            jQuery(self).addClass("active");
            console.log("what");

        }
        jQuery("#nav-tabs-wrapper li ").each(function () {
            jQuery(this).removeClass("active");
        });

        if (jQuery(window).width() <= 1199) {
            jQuery(".home-ic-tm a").trigger("click");
        }

    });


    jQuery(".panel-collapse").each(function () {
        var self = jQuery(this);

        if (self.hasClass("in")) {
            jQuery(self).siblings(".panel-heading").addClass("active");
        }
        jQuery(this).on('show.bs.collapse', function (e) {
            jQuery(self).siblings(".panel-heading").addClass("active");

        });
        jQuery(this).on('hide.bs.collapse', function (e) {
            jQuery(self).siblings(".panel-heading").removeClass("active");

        });

    });


});

jQuery(window).resize(function () {
    equalizeHeights(".boxes-container");
    equalizeHeights(".steps-visual-boxes ol li");
    positioning();

    if (jQuery(window).width() >= 1200) {
        jQuery('.sticky').css({
            "width":  calculate()
            // "height" : jQuery(window).outerHeight()
        });
    } else {
        jQuery('.sticky').css({
            "width": "100%",
            "height" : "auto"
        });
    }

    jQuery(".eq").css({
        "margin-left": 0,
        "margin-top": 0
    });

});

jQuery(function () {
    var hash = window.location.hash;
    jQuery('#nav-tabs-wrapper li a[href="' + hash + '"]').trigger('click');
    window.location.hash = "";


    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload()
        }
    };

});

function calculate() {
    // 1 column / 12 grid-columns = 8.33% * 1170px = 97.5px
    var column, columns, resultPercentage, containerWidth, resultPixel;
    containerWidth = jQuery(".container").outerWidth();
    columns = 12;
    column = 3;
    resultPercentage = column / columns;
    resultPixel = resultPercentage * containerWidth;
    resultPixel = Math.floor(resultPixel);

    return resultPixel;

}

if (jQuery(window).width() >= 1200) {
    jQuery('.sticky').css({
        "width":  calculate()
        // "height" : jQuery(window).outerHeight()
    });
} else {
    jQuery('.sticky').css({
        "width": "100%",
        "height" : "auto"
    });
}


var stickyOffset = null;
var check = false;

if(jQuery('.sticky').length) {
    stickyOffset = jQuery('.sticky').offset().top;
    check = true;
    console.log(check);
}

if (check) {
    jQuery(window).scroll(function () {
        var sticky = jQuery('.sticky'),
            relativeContent = jQuery(".eq"),
            scroll = jQuery(window).scrollTop();
        if (jQuery(window).width() <= 1199) {
            // jQuery('.holder-top').css("height", 0);
        }

        if (scroll > 10 && jQuery(".tab-content").outerHeight() > jQuery(".sticky").outerHeight()) {
            if (jQuery(window).width() <= 1199) {
                jQuery('.holder-top').css("height", jQuery('.sticky').outerHeight());

            }else {
                jQuery('.holder-top').css("height", 0);
            }
            if(jQuery(window).width() <=767) {
                jQuery('.holder-top').css("height", jQuery('.sticky').outerHeight());
                jQuery('#nav-tabs-wrapper').css("position", "fixed");
            }

            jQuery('.holder-top').removeClass('hidden');
            sticky.addClass('fixed');
            if (jQuery(window).width() >= 1200) {
                relativeContent.css("margin-left", sticky.outerWidth());
                jQuery('#nav-tabs-wrapper').css("position", "relative");
                sticky.css("width", calculate());
            } else {
                jQuery('.sticky').css("width", "100%");
                relativeContent.css({
                    "margin-left": 0,
                    // "margin-top": sticky.outerHeight()
                });


            }
        }

        else {
            jQuery('.holder-top').addClass('hidden');
            if(jQuery(window).width() <=767) {
                jQuery('#nav-tabs-wrapper').css("position", "relative");
            }
            sticky.removeClass('fixed');
            relativeContent.css({
                "margin-left": 0,
                "margin-top": 0
            });

        }
    });
}


var heightContainer = function() {
    jQuery(".home-container").css("min-height", jQuery(window).height());
};

jQuery('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
 // tabs();
});
jQuery(window).resize(function () {
    // tabs();
    heightContainer()
});



jQuery(function() {
    heightContainer();

    jQuery(".panel").each(function() {
        if (jQuery(this).find(".col-text-accordion").children().length === 1) {
            jQuery(this).find(".col-text-accordion").addClass("one");
        }

    });
    equalizeHeights('.content-tabs .nav-tabs li');
    jQuery(window).resize(function(){
        equalizeHeights('.content-tabs .nav-tabs li');
    });

});
/////////////////////////// SCROLL ///////////////////////////////
$(document).ready(function () {
    let header = $('.header'),
        mobile,
        tablet;

    // DETECT DEVICE 
    let md = new MobileDetect(window.navigator.userAgent);
    function mobileDetect() {
        if (md.mobile() != null || md.tablet() != null) {
            mobile = true
            tablet = true
        } else {
            mobile = false
            tablet = false
        }
    }
    mobileDetect();


    let belowNavHeroContent = $('.sub-nav-hero'),
        headerHeight = header.height();
    //set scrolling variables
    let scrolling = false,
        previousTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;

    $(window).on('scroll', function () {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame)
                ? setTimeout(autoHideHeader, 250)
                : requestAnimationFrame(autoHideHeader);
        }
    });

    $(window).on('resize', function () {
        headerHeight = header.height();
    });

    function autoHideHeader() {
        var currentTop = $(window).scrollTop();
        (belowNavHeroContent.length > 0)
            ? checkStickyNavigation(currentTop) // secondary navigation below intro
            : checkSimpleNavigation(currentTop);
        previousTop = currentTop;
        scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
        if (previousTop - currentTop > scrollDelta) {
            header.removeClass('is-hidden');
        } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
            header.addClass('is-hidden');
        }
    }



    // MENU CLICKED
    function clickedButtonMenu() {
        let btnMenu = $('.header__btnmenu')
        btnMenu.on('click', function () {
            $(this).toggleClass('active');
            $('body').toggleClass('--menu-show');
        })
    }
    clickedButtonMenu();


    // INIT WOW JS ANIMATION
    function wowAmination() {
        if ($('.wow').length) {
            var wow = new WOW(
                {
                    boxClass: 'wow',
                    animateClass: 'animated',
                    offset: 0,
                    scrollContainer: null,
                    resetAnimation: false
                }
            );
            wow.init();
        }
    }
    wowAmination()



    //  CURSOR FOLLOW MOUSE
    let cursor = $('.cursor');
    $(document).on('mousemove', function (e) {
        var xPos = e.pageX;
        var yPos = e.pageY;
        cursor.css({
            'top': yPos - (cursor.width() / 2),
            'left': xPos - (cursor.height() / 2),
        });
    });
    if (md.mobile() != null || md.tablet() != null) {
        cursor.hide()
    } else {
        cursor.show()
    }


    // LI MENU HOVER
    function hoverItemMenu() {
        let itemMenu = $('.nav .menu a')
        itemMenu.on('mouseenter', function () {
            cursor.addClass('active')
        })
        itemMenu.on('mouseleave', function () {
            cursor.removeClass('active')
        })
    }
    hoverItemMenu()


    // CAREER NAV ACTIVE SCROLLING
    let careerContent = $('.careerdt__content'),
        progressBar = $('.careerdt__progress');
    careerContent.scroll(function () {
        var scrollDistance = $(this).scrollTop();
        $('.careerdt__content-row').each(function (i) {
            if ($(this).position().top <= scrollDistance) {
                $('.careerdt__sidebar-nav li.active').removeClass('active');
                $('.careerdt__sidebar-nav li').eq(i).addClass('active');
            }
        });
        let value = 100 * (scrollDistance / (careerContent[0].scrollHeight - careerContent.outerHeight()))
        progressBar.css({
            'height': value + '%'
        })

    }).scroll();

    // https://codepen.io/eksch/pen/xwdOeK


    // =================== HOME ======================//

    // Slider Testimonials
    let sliderTes = $('.testimonials__sliders')
    let tabTes = $('.testimonials__top .tabs .tab')
    let optsliderTes = {
        cellAlign: 'left',
        pageDots: false,
        contain: true,
        accessibility: false,
        wrapAround: true,
        pauseAutoPlayOnHover: true,
        fullscreen: false,
        dragThreshold: 0,
        prevNextButtons: true
    }

    function sliderTestimonials() {
        sliderTes.flickity(optsliderTes);
        if (sliderTes.length) {
            const carousels = document.querySelectorAll('.testimonials__sliders');
            let slider;
            carousels.forEach(carousel => {
                slider = new Flickity(carousel, { optsliderTes });
            });
        }
    }

    //When filter tabs buttons clicked
    function clickTabsTestimonials() {
        tabTes.on('click', function () {
            let id = $(this).index();
            sliderTes.eq(id).addClass('active').siblings().removeClass('active');
            $(this).addClass('active').siblings().removeClass('active');
            sliderTes.flickity('destroy');
            sliderTes.flickity(optsliderTes);
        });
    }
    clickTabsTestimonials()


    // SLIDER EXPERTS ABOUT
    function sliderExAbout() {
        if ($('.aboutex__slider').length) {
            let slider = $('.aboutex__slider-inner')
            let opt = {
                cellAlign: 'left',
                pageDots: false,
                contain: true,
                accessibility: false,
                wrapAround: true,
                pauseAutoPlayOnHover: true,
                dragThreshold: 0,
                prevNextButtons: true
            }
            slider.flickity(opt);
        }
    }
    sliderExAbout()


    // BIO VIEWMORE ABOUT TEAM
    function clickBioTeamAbout() {
        let btnBio = $('.team .team__list .item .bio')
        btnBio.on('click', function () {
            $(this).find('.btnroundmore').toggleClass('active');
            $(this).next().slideToggle(200)
        })
    }
    clickBioTeamAbout()


    // FORM INPUT FOCUS

    function focusInputForm() {
        let input = $('.form .field .input')
        input.on('focus', function () {
            input.removeClass('active')
            $(this).closest('.field').addClass('active')
        })
        input.on('focusout', function () {
            if ($(this).val().length == '') {
                $(this).closest('.field').removeClass('active')
            }
        })
    }
    focusInputForm()



    // POLICY NAV CLICKED SCROLLING

    $('.policy__nav a').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr("href");
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top - header.height()
        }, 600);
        return false;
    });

    // INIT
    function init() {
        $('body').imagesLoaded()
            .progress({ background: true }, function (instance, image) { })
            .always(function (instance) {
                setTimeout(function () {
                    $('.loading').addClass('--hide')
                    sliderTestimonials()
                    console.clear();
                }, 400)
            })
            .fail(function () {
                // console.log('all images loaded, at least one is broken');
            })
            .done(function (instance) {
                // console.log('all images successfully loaded');
            });
    }
    init();



})
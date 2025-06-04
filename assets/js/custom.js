// Custom JavaScript
$(document).ready(function() {
    "use strict";

	// sticky header
	function headerSticky(){
		var windowPos=$(window).scrollTop();
		if( windowPos>20){
			$('.fixed-top').addClass("on-scroll");
			$('.light-nav-on-scroll').addClass("dtr-menu-light").removeClass("dtr-menu-dark");
			$('.dark-nav-on-scroll').addClass("dtr-menu-dark").removeClass("dtr-menu-light");
		} else {
			$('.fixed-top').removeClass("on-scroll");
			$('.light-nav-on-load').addClass("dtr-menu-light").removeClass("dtr-menu-dark");
			$('.dark-nav-on-load').addClass("dtr-menu-dark").removeClass("dtr-menu-light");
		}
	}
	headerSticky();
	$(window).scroll(headerSticky);

	// main menu
	$('.main-navigation .sf-menu').superfish({
		delay: 100,
		animation: { opacity: 'show', height: 'show' },
		speed: 300,
	});

	// menudropdown auto align
	var wapoMainWindowWidth = $(window).width();
	$('.sf-menu ul li').mouseover(function(){
		var subMenuExist = $(this).find('.sub-menu').length;
		if( subMenuExist > 0){
			var subMenuWidth = $(this).find('.sub-menu').width();
			var subMenuOffset = $(this).find('.sub-menu').parent().offset().left + subMenuWidth;

			if((subMenuOffset + subMenuWidth) > wapoMainWindowWidth){
				var newSubMenuPosition = subMenuWidth;
				$(this).find('.sub-menu').css({
					left: -newSubMenuPosition,
					top: '0',
				});
			}
		}
	});

	// scrollspy
	$('body').scrollspy({
		offset: 120,
		target: '.dtr-scrollspy'
	});

	// nav scroll
	if($('#dtr-header-global').length){
		var navoffset = $('#dtr-header-global').height();
		$('.dtr-nav a[href^="#"], .dtr-scroll-link').on("click", function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $($(this).attr('href')).offset().top - navoffset - 37
			}, "slow","easeInSine");
		});
	} else {
		$('.dtr-scroll-link').on("click", function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $($(this).attr('href')).offset().top
			}, "slow","easeInSine");
		});
	}

	// responsive header nav scroll
	var mnavoffset = $('.dtr-responsive-header').height();
	var scroll = new SmoothScroll('.dtr-responsive-header-menu a', {
		speed: 500,
		speedAsDuration: true,
		offset: mnavoffset + 15
	});

	// responsive menu
	$('.main-navigation .dtr-nav').slicknav({
		label:"",
		prependTo: '.dtr-responsive-header-menu',
		closedSymbol: '',
		openedSymbol: '',
		allowParentLinks:"true",
		menuButton: '#dtr-menu-button',
		closeOnClick:true
	});
	$('.slicknav_nav').addClass("dtr-scrollspy");
	$("#dtr-menu-button").on("click", function(e) {
		$(".slicknav_nav").slideToggle();
	});
	var $hamburger = $("#dtr-menu-button");
	$hamburger.on("click", function(e) {
		$hamburger.toggleClass("is-active");
	});

	// sectionAnchor
	function sectionAnchor() {
		var navoffset = $('#dtr-header-global').height();
		var hash = window.location.hash;
		if (hash != '') {
			setTimeout(function() {
				$('html, body').stop().animate({
					scrollTop: $(hash).offset().top - navoffset - 37
				}, 800, 'easeInSine');
				history.pushState('', document.title, window.location.pathname);
			}, 500);
		}
	} sectionAnchor();

	if($(window).width()<992){
		function responsiveAnchor() {
			var mnavoffset = $('.dtr-responsive-header').height();
			var hash = window.location.hash;
			if (hash != '') {
				setTimeout(function() {
					$('html, body').stop().animate({
						scrollTop: $(hash).offset().top - mnavoffset - 15
					}, 800, 'easeInSine');
					history.pushState('', document.title, window.location.pathname);
				}, 500);
			}
		} responsiveAnchor();
	}

	// testimonial sliders
	$('.dtr-testimonial-style-center, .dtr-testimonial-style-left').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite:true,
		autoplay: true,
		autoplaySpeed: 4000,
		fade: true,
		speed: 1000
	});

	$('.dtr-img-slider-3col').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite:true,
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: [{ breakpoint: 768, settings: { slidesToShow: 2 } }]
	});

	$('.dtr-img-slider-2col, .dtr-img-slider-1col').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite:true,
		autoplay: true,
		autoplaySpeed: 4500,
		responsive: [{ breakpoint: 768, settings: { slidesToShow: 2 } }]
	});

	if( $(window).outerWidth() >= 767 ) {
		new WOW().init({ mobile: false });
		$(".parallax").parallaxie({ speed: 0.60, size: 'auto' });
		$(".parallax.parallax-slow").parallaxie({ speed: 0.30 });
	}

	$('.dtr-video-popup').venobox();
	$(".popup-video").magnificPopup({ type: 'iframe', mainClass: 'mfp-fade', removalDelay: 150, preloader: false, fixedContentPos: false });
	$('.popup-image').magnificPopup({ type: 'image' });
	$('.popup-gallery').magnificPopup({ type: 'image', mainClass: 'mfp-fade', removalDelay: 150, gallery: { enabled: true } });

        // Unified Contact + Quote Form Submission (simplified)
        ["contactform", "quoteform"].forEach(function(formId) {
                var $form = $("#" + formId);
                if (!$form.length) return;

                $form.on('submit', function(event) {
                        event.preventDefault();

                        var formData = new FormData(this);

                        fetch($form.attr('action'), {
                                method: 'POST',
                                body: formData,
                                headers: { 'Accept': 'application/json' }
                        }).then(function(response) {
                                if (response.ok) {
                                        $('#' + formId + '-result').html('<p class="text-success">Thank you! Your message has been sent.</p>');
                                        event.target.reset();
                                } else {
                                        $('#' + formId + '-result').html('<p class="text-danger">There was an error. Please try again later.</p>');
                                }
                        }).catch(function() {
                                $('#' + formId + '-result').html('<p class="text-danger">There was an error. Please try again later.</p>');
                        });
                });
        });

	$('#contactform #message, #quoteform #message').val('');

});

$(window).on('load', function(){
	$('.dtr-preloader').delay(400).fadeOut(500);
	$('.dtr-portfolio-grid').imagesLoaded(function () {
		$('.dtr-portfolio-grid').isotope({ itemSelector: '.dtr-portfolio-item', masonry: {} });
	});
	$('.dtr-filter-nav a').on('click', function () {
		$('.dtr-filter-nav a').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
		$('.dtr-portfolio-grid').isotope({ filter: selector });
		return false;
	});
});

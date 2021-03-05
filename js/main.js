$(document).ready(function () {
    
    var init = function () {
        navFn();
        mainSlideFn();
        newsSlideFn();
        newsSlideFn02();
        policyFn();
        bannerFn();
        footerFn();
        tabFn();
    };

    var navFn = function(){

        var $nav = $('#header nav'),
            $navTit = $('#header .nav-depth1 .cont1'),
            $navBg = $('#header .nav-bg'),
            $navDepth = $('#header .nav-depth2'),
            $navDepth3 = $('#header .nav-depth3'),
            $navTit2 = $('#header nav .cont2-tit'),
            $navCont2 = $('#header nav .cont2'),
            $siteBox = $('#header .site-box'),
            $searchWrap = $('#header .search-wrap'),
            $mSearchBtn = $('#header .m-search-btn');

        var $headerHeight = $('#header .container').innerHeight();
        var isMobile = $(window).innerWidth() >= 998 ? false : true;

        if(isMobile){
            $nav.addClass('mobile');
            $siteBox.addClass('mobile');
        }

        $navTit.on({
            mouseenter: function(e){
                e.preventDefault();
                if(isMobile) return false;
                $(this).addClass('show');
                $navBg.css('height', $(this).find('.nav-depth2').innerHeight()+'');
                $navBg.stop().show();
            },
            mouseleave: function(e){
                e.preventDefault();
                if(isMobile) return false;
                $(this).removeClass('show');
                $navBg.stop().hide();
            }, 
            click: function(e){
                e.preventDefault();
                if(!isMobile) return false;
                $navDepth.removeClass('show');
                $(this).find('.nav-depth2').stop().show();
            }
        })

        $navTit2.on({
            click: function(e){
                e.preventDefault();
                if(!isMobile) return false;
                $navCont2.removeClass('m-active');
                $(this).parent().addClass('m-active');             
            }
        })

        $siteBox.on({
            click: function(e){
                e.preventDefault();
                if(!isMobile) return false;
                $nav.css({'display':'block', 'left':'0'});
            }
        })

        $nav.on({
            click: function(e){
                e.preventDefault();
                if(!isMobile) return false;
                if(e.offsetX>=300) $nav.css({'display':'none', 'left':'-100vw'});
            }
        })

        $mSearchBtn.on({
            click: function(e){
                e.preventDefault();
                $searchWrap.toggleClass('mobile-active');
            }
        })


        $(window).scroll(function(e){
            e.preventDefault();
            if(isMobile) return false;
            if($(this).scrollTop()>=$headerHeight) {
                $nav.addClass('fixed');
                $siteBox.addClass('fixed');
            }
            else {
                $nav.removeClass('fixed');
                $siteBox.removeClass('fixed');
            }
        });

        $(window).resize(function(e){
            e.preventDefault();
            if($(this).innerWidth()>=998){
                if(isMobile) {
                    $navDepth3.removeClass('m-active');
                    $nav.removeClass('mobile');
                    $nav.css({'display':'block', 'left':'0'});
                    $siteBox.removeClass('mobile');
                    $searchWrap.removeClass('mobile-active');
                    isMobile = !isMobile;
                }
            }
            else{
                if(!isMobile){
                    if($nav.hasClass('fixed')) $nav.removeClass('fixed');
                    $nav.css({'display':'none', 'left':'-100vw'});
                    $navTit.removeClass('show');
                    $siteBox.addClass('mobile');
                    $nav.addClass('mobile');
                    isMobile =!isMobile;
                } 
            }
        })

    };

    var tabFn = function () {
        var $tabBtn = $('#section01 .tab-btn .btn');
        var $tabBtn02 = $('#section02 .tab-btn .btn');
        var $targetItem = null;

        $tabBtn.each(function (idx) {

            $(this).click(function (e) {
                e.preventDefault();
                $(this).parent().find('.btn').removeClass('active');
                $targetItem = $(this).parents('.tab-box').find('.tab-item');
                $targetItem.removeClass('active');
                $(this).addClass('active');
                setTimeout(function () {
                    $targetItem.eq(idx).addClass('active');
                }, 150);
            })
        })

        $tabBtn02.each(function(idx){
            $(this).click(function (e) {
                e.preventDefault();
                $(this).parent().find('.btn').removeClass('active');
                $targetItem = $(this).parents('.tab-box').find('.tab-item');
                $targetItem.removeClass('active');
                $(this).addClass('active');
                setTimeout(function () {
                    $targetItem.eq(idx).addClass('active');
                }, 150);
            })
        })
    };

    var mainSlideFn = function () {
        var $slideBtns = $('#section01 .slider-wrap .slide-btns button'),
            $prevBtn = $slideBtns.eq(0),
            $nextBtn = $slideBtns.eq(2),
            $pauseBtn = $slideBtns.eq(1),
            $slide = $('#section01 .slider-wrap .slide'),
            $slideLength = $slide.length,
            $numText = $('#section01 .slider-wrap .slide-btns .num');
        // var $numsText = $('#section01 .slider-wrap .slide-btns .nums');
        var $currentIdx = 0,
            nextIdx = 0,
            isPaused = false;

        var fadeOutFn = function (fromSlide, toSldie) {
            fromSlide.animate({
                opacity: 0
            }, 500, 'linear');
            toSldie.animate({
                opacity: 1
            }, 700, 'linear');
        };

        var handleNumTxt = function () {
            var newNum = '';
            if ($currentIdx < 10) newNum = '0' + ($currentIdx + 1);
            else newNum = numTxt + ($currentIdx + 1);
            $numText.text(newNum);
        };

        $prevBtn.click(function (e) {
            e.preventDefault();

            $slideBtns.removeClass('active');
            $(this).addClass('active');

            if ($currentIdx == 0) nextIdx = $slideLength - 1;
            else nextIdx = $currentIdx - 1;

            clearInterval(startAutoFade);
            fadeOutFn($slide.eq($currentIdx), $slide.eq(nextIdx));
            $currentIdx = nextIdx;
            handleNumTxt();
            handleAutoFade();
        });

        $nextBtn.click(function (e) {
            e.preventDefault();

            $slideBtns.removeClass('active');
            $(this).addClass('active');

            if ($currentIdx == $slideLength - 1) nextIdx = 0;
            else nextIdx = $currentIdx + 1;

            clearInterval(startAutoFade);
            fadeOutFn($slide.eq($currentIdx), $slide.eq(nextIdx));
            $currentIdx = nextIdx;
            handleNumTxt();
            handleAutoFade();
        });

        $pauseBtn.click(function (e) {
            e.preventDefault();
            $slideBtns.removeClass('active');
            if (isPaused) {
                $(this).removeClass('active');
                isPaused = false;
                handleAutoFade();
            } else {
                $(this).addClass('active');
                clearInterval(startAutoFade);
                isPaused = true;
            }
        });

        var handleAutoFade = function () {
            startAutoFade = setInterval(function () {
                if ($currentIdx >= $slideLength - 1) nextIdx = 0;
                else nextIdx = $currentIdx + 1;
                fadeOutFn($slide.eq($currentIdx), $slide.eq(nextIdx));
                $currentIdx = nextIdx;
                handleNumTxt();
            }, 4000);
        };

        handleNumTxt();
        handleAutoFade();

    };

    var newsSlideFn = function () {

        var $slideWrap = $('#section01 .news:nth-child(4) .slide-wrap'),
            $slide = $slideWrap.find('.slide'),
            $slideWidth = $slide.innerWidth(),
            $slideLength = $slide.length - 1, //4
            $slideBtn = $('#section01 .news:nth-child(4) .top-cover i');

        var $currentIdx = 0;
            $targetIdx = 0,
            positionX = 0;

        $slideBtn.each(function (idx) {
            $(this).click(function (e) {
                e.preventDefault();

                if (idx === $currentIdx) return false;

                clearInterval(setAutoSlide);
                $targetIdx = idx;
                shiftSlideFn();
                $currentIdx = $targetIdx;
                setTimeout(function () {
                    autoSlideFn();
                }, 1000)

            })
        })

        var shiftSlideFn = function () {

            $slideBtn.eq($currentIdx).removeClass('active');
            $slideBtn.eq($targetIdx).addClass('active');

            positionX = -$slideWidth * ($currentIdx);

            if ($currentIdx >= $slideLength - 1 && $targetIdx === 0) {
                $slideWrap.stop().animate({
                    left: positionX - $slideWidth + 'px'
                }, 800, 'swing', function () {
                    $slideWrap.css({
                        'left': 0
                    });
                });
            } else {
                $slideWrap.stop().animate({
                    left: positionX + $slideWidth * ($currentIdx - $targetIdx) + 'px'
                }, 800, 'swing');
            }
        };

        var autoSlideFn = function () {
            setAutoSlide = setInterval(function () {
                $targetIdx++;
                if ($currentIdx >= $slideLength - 1) $targetIdx = 0;
                shiftSlideFn();
                $currentIdx = $targetIdx;
            }, 2000);
        }

        $(window).resize(function (e) {
            e.preventDefault();
            $slideWidth = $slide.innerWidth();
        })

        autoSlideFn();

    };

    var newsSlideFn02 = function () {

        var $slideWrap02 = $('#section02 .area02 .slide-wrap'),
            $slide02 = $slideWrap02.find('.slide'),
            $slideWidth02 = $slide02.innerWidth(),
            $slideLength02 = $slide02.length - 1, //4
            $slideBtn02 = $('#section02 .area02 .top-cover i');

        var $currentIdx02 = 0;
            $targetIdx02 = 0,
            positionX02 = 0;

        $slideBtn02.each(function (idx) {
            $(this).click(function (e) {
                e.preventDefault();

                if (idx === $currentIdx02) return false;

                clearInterval(setAutoSlide02);
                $targetIdx02 = idx;
                shiftSlideFn02();
                $currentIdx02 = $targetIdx02;
                setTimeout(function () {
                    autoSlideFn02();
                }, 1000)

            })
        })

        var shiftSlideFn02 = function () {

            $slideBtn02.eq($currentIdx02).removeClass('active');
            $slideBtn02.eq($targetIdx02).addClass('active');

            positionX02 = -$slideWidth02 * ($currentIdx02);

            if ($currentIdx02 >= $slideLength02 - 1 && $targetIdx02 === 0) {
                $slideWrap02.stop().animate({
                    left: positionX02 - $slideWidth02 + 'px'
                }, 800, 'swing', function () {
                    $slideWrap02.css({
                        'left': 0
                    });
                });
            } else {
                $slideWrap02.stop().animate({
                    left: positionX02 + $slideWidth02 * ($currentIdx02 - $targetIdx02) + 'px'
                }, 800, 'swing');
            }
        };

        var autoSlideFn02 = function () {
            setAutoSlide02 = setInterval(function () {
                $targetIdx02++;
                if ($currentIdx02 >= $slideLength02 - 1) $targetIdx02 = 0;
                shiftSlideFn02();
                $currentIdx02 = $targetIdx02;
            }, 2000);
        }

        $(window).resize(function (e) {
            e.preventDefault();
            $slideWidth02 = $slide02.innerWidth();
        })

        autoSlideFn02();

    };

    var policyFn = function () {

        var $policyImg = $('#main #section02 .wrap .container .area03 .img-wrap .list01'),
            $policyCover = $policyImg.find('.img-cover'),
            $policyLink = $('#main #section02 .wrap .container .area03 .img-wrap .list a'),
            $policyTitle = $policyLink.find('.title'),
            $policyText = $policyLink.find('.text'),
            $policyBtn = $('#section02 .area03 .menu-list a');
        
        var imgList = [
            {
                imgUrl : '../img/policy_bg01.jpg',
                title: '국토도시',
                text: '대한민국 모두를 생각하는 국토 및 도시 <br> 정책을 확인하실 수 있습니다.',
                linkUrl:'#none'
            },
            {
                imgUrl : '../img/policy_bg02.jpg',
                title: '주택토지',
                text: '주택시장 안정 및 합리적인 토지이용을 <br> 위한 정책 자료를 확인하실 수 있습니다.',
                linkUrl:'#none'
            },
            {
                imgUrl : '../img/policy_bg03.jpg',
                title: '건설',
                text: '건설 기술력 증대를 위한 다양한 건설경제, <br> 기술안전, 해외건설 등의 정책 자료를 제공합니다.',
                linkUrl:'#none'
            },
            {
                imgUrl : '../img/policy_bg04.jpg',
                title: '교통물류',
                text: '기술안전, 해외건설 등의 정책 자료를 제공합니다. <br> 있습니다.',
                linkUrl:'new link'
            },
            {
                imgUrl : '../img/policy_bg05.jpg',
                title: '항공',
                text: '편리하고 안전한 항공교통 관련 정책을 <br> 제공합니다.',
                linkUrl:'new link'
            },
            {
                imgUrl : '../img/policy_bg06.jpg',
                title: '도로철도',
                text: '국민을 위한 안전한 도로 및 철도환경을 <br> 위한 정책을 확인하실 수 있습니다.',
                linkUrl:'new link'
            },
        ];

        var data = null;

        $policyBtn.each(function(idx){
            $(this).on({
                mouseenter: function(e){
                    e.preventDefault();
                    data = imgList[idx];
                    //btn css
                    $policyBtn.removeClass('active');
                    $(this).addClass('active');
                    //img css
                    $policyImg.css({background:'url('+data.imgUrl+') no-repeat'});
                    $policyTitle.text(data.title);
                    $policyText.html(data.text);
                    $policyLink.attr('href',data.linkUrl);
                    $policyCover.addClass('active');
                    setTimeout(function(){
                        $policyCover.removeClass('active');
                    },600);
                }
            })
        })

    }

    var bannerFn = function () {

        var $bannerWrap = $('#section03 .banner-wrap'),
            $banner = $('#section03 .banner-item'),
            $bannerBtns = $('#section03 .btn-wrap button');

        var moveX = $banner.first().innerWidth();
        var isPaused = false;

        $bannerBtns.eq(0).click(function (e) {
            e.preventDefault();
            if (!isPaused) {
                clearInterval(setAutoBanner);
                $bannerBtns.eq(1).addClass('active');
                isPaused = true;
            } else {
                $bannerBtns.eq(2).removeClass('active');
            }
            $(this).addClass('active');
            toPrevShift();
        });
        $bannerBtns.eq(1).click(function (e) { //pouse
            e.preventDefault();
            if (!isPaused) { // -> pause slide
                clearInterval(setAutoBanner);
                $(this).addClass('active');
                isPaused = true;
            } else { // -> restart slide
                autoBannerFn();
                $bannerBtns.removeClass('active');
                isPaused = false;
            }

        });
        $bannerBtns.eq(2).click(function (e) {
            e.preventDefault();
            if (!isPaused) { //-> pause slide
                clearInterval(setAutoBanner);
                $bannerBtns.eq(1).addClass('active');
                isPaused = true;
            } else { // -> remove btnBorder
                $bannerBtns.eq(0).removeClass('active');
            }
            $(this).addClass('active');
            toNextShift();
        });

        /* initialize banner slide */
        var setBanner = function () {
            $banner.last().after($banner.first().clone());
            $banner.first().before($banner.last().clone());
            $bannerWrap.css('left', -moveX + 'px');
        }

        var toNextShift = function () {
            $banner = $('#section03 .banner-item');
            $banner.first().detach();
            $bannerWrap.css('left', '0');

            $bannerWrap.animate({
                'left': -moveX + 'px'
            }, 600, 'linear');

            $banner.last().after($banner.eq(2).clone());

        };

        var toPrevShift = function () {
            $banner = $('#section03 .banner-item');
            $banner.first().before($banner.eq($banner.length - 3).clone());
            $banner.last().detach();
            $bannerWrap.css('left', -moveX * 2 + 'px');

            $bannerWrap.animate({
                'left': -moveX + 'px'
            }, 600, 'linear');

        };

        var autoBannerFn = function () {

            setAutoBanner = setInterval(function () {
                toPrevShift();
            }, 3000)
        }

        setBanner();
        autoBannerFn();

    };


    var footerFn = function () {
        var $goBtn = $('#footer .go-item > a, #footer .go-item > a > i'),
            $goItem = $('#footer .go-item');

        $goBtn.click(function (e) {
            e.preventDefault();
            $(this).parent().toggleClass('active');
        })

        $('body').click(function (e) {
            e.preventDefault();
            if (!$goBtn.is(e.target)) $goItem.removeClass('active');
        });

    };

    init();

});
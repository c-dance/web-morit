$(document).ready(function(){

    var init = function(){

        mainSlideFn();
        newsSlideFn();
        bannerFn();
        footerFn();
        tabFn();
    };

    var tabFn = function(){
        var $tabBtn = $('#section01 .tab-btn .btn');
        var $tabItem = $('#section01 .tab-item');

        $tabBtn.each(function(idx){
            $(this).click(function(e){
                $tabBtn.removeClass('active');
                $tabItem.removeClass('active');
                $(this).addClass('active');
                setTimeout(function(){
                    $tabItem.eq(idx).addClass('active');
                },150);
            })
        })
    };

    var mainSlideFn = function(){
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

        var fadeOutFn = function(fromSlide, toSldie){
            fromSlide.animate({
                opacity: 0
            },500, 'linear');
            toSldie.animate({
                opacity: 1
            },700, 'linear');
        };

        var handleNumTxt = function(){
            var newNum = '';
            if($currentIdx<10) newNum = '0' + ($currentIdx+1);
            else newNum = numTxt+($currentIdx+1);
            $numText.text(newNum);
        };
        
        $prevBtn.click(function(e){
            e.preventDefault();

            $slideBtns.removeClass('active');
            $(this).addClass('active');

            if($currentIdx==0) nextIdx = $slideLength-1;
            else nextIdx = $currentIdx - 1;

            clearInterval(startAutoFade);
            fadeOutFn($slide.eq($currentIdx), $slide.eq(nextIdx));          
            $currentIdx = nextIdx;
            handleNumTxt();
            handleAutoFade();
        });

        $nextBtn.click(function(e){
            e.preventDefault();

            $slideBtns.removeClass('active');
            $(this).addClass('active');

            if($currentIdx==$slideLength-1) nextIdx = 0;
            else nextIdx = $currentIdx+1;

            clearInterval(startAutoFade);
            fadeOutFn($slide.eq($currentIdx), $slide.eq(nextIdx));
            $currentIdx = nextIdx;
            handleNumTxt();
            handleAutoFade();
        });

        $pauseBtn.click(function(e){
            e.preventDefault();
            $slideBtns.removeClass('active');
            if(isPaused) {
                $(this).removeClass('active');
                isPaused = false;
                handleAutoFade();
            }else {
                $(this).addClass('active');
                clearInterval(startAutoFade);
                isPaused = true;
            }
        });

        var handleAutoFade = function(){
            startAutoFade = setInterval(function(){ 
                if($currentIdx>=$slideLength-1) nextIdx = 0;
                else nextIdx = $currentIdx+1;
                fadeOutFn($slide.eq($currentIdx), $slide.eq(nextIdx));
                $currentIdx = nextIdx;
                handleNumTxt();
            }, 4000);
        };

        handleNumTxt();
        handleAutoFade();

    };

    var newsSlideFn = function(){

        var $slideWrap = $('#section01 .news:nth-child(4) .slide-wrap'),
            $slide = $slideWrap.find('.slide'),
            $slideWidth = $slide.innerWidth(),
            $slideLength = $slide.length-1,//4
            $slideBtn = $('#section01 .news:nth-child(4) .top-cover i');
            

        var $currentIdx = 0;
            $targetIdx = 0,
            positionX = 0,
            moveWidth = 0;

        $slideBtn.each(function(idx){
            $(this).click(function(e){
                e.preventDefault();

                if(idx===$currentIdx) return false;

                clearInterval(setAutoSlide);
                $targetIdx = idx;
                shiftSlideFn();
                $currentIdx = $targetIdx;
                setTimeout(function(){
                    autoSlideFn();
                },1000)
                
            })
        })

        var shiftSlideFn = function(){

            $slideBtn.eq($currentIdx).removeClass('active');
            $slideBtn.eq($targetIdx).addClass('active');

            positionX = - $slideWidth * ($currentIdx);

            if($currentIdx >= $slideLength-1 && $targetIdx===0){ 
                console.log('rotate');
                $slideWrap.stop().animate({
                    left : positionX - $slideWidth + 'px'
                },800,'swing', function(){
                    $slideWrap.css({'left': 0});
                });
            }else{
                moveWidth = $slideWidth * ($currentIdx - $targetIdx);
                $slideWrap.stop().animate({
                    left : positionX + moveWidth + 'px'
                },800,'swing');
            }
        };

        var autoSlideFn = function(){
            setAutoSlide = setInterval(function(){
                $targetIdx ++;
                if($currentIdx >= $slideLength-1) $targetIdx = 0;
                shiftSlideFn();
                $currentIdx = $targetIdx;
            },2000);
        }

        $(window).resize(function(e){
            e.preventDefault();
            $slideWidth = $slide.innerWidth();
        })

        autoSlideFn();

    };

    var bannerFn = function(){

        var $bannerWrap = $('#section03 .banner-wrap'),
            $banner = $('#section03 .banner-item'),
            $bannerBtns = $('#section03 .btn-wrap button');

        var moveX = $banner.first().innerWidth();
        var isPaused = false;

        $bannerBtns.eq(0).click(function(e){
            e.preventDefault();
            if(!isPaused){
                clearInterval(setAutoBanner);
                $bannerBtns.eq(1).addClass('active');
                isPaused = true;
            }else{
                $bannerBtns.eq(2).removeClass('active');
            }
            $(this).addClass('active');
            toPrevShift();
        });
        $bannerBtns.eq(1).click(function(e){//pouse
            e.preventDefault();
            if(!isPaused){ // -> pause slide
                clearInterval(setAutoBanner);
                $(this).addClass('active');
                isPaused = true;
            }else{ // -> restart slide
                autoBannerFn();
                $bannerBtns.removeClass('active');
                isPaused = false;
            }   
            
        });
        $bannerBtns.eq(2).click(function(e){
            e.preventDefault();
            if(!isPaused){ //-> pause slide
                clearInterval(setAutoBanner);
                $bannerBtns.eq(1).addClass('active');
                isPaused = true;
            }else{ // -> remove btnBorder
                $bannerBtns.eq(0).removeClass('active');
            }
            $(this).addClass('active');
            toNextShift();
        });

        /* initialize banner slide */
        var setBanner = function(){
            $banner.last().after($banner.first().clone());
            $banner.first().before($banner.last().clone());
            $bannerWrap.css('left', - moveX+'px');
        }

        var toNextShift = function(){
            $banner = $('#section03 .banner-item');
            $banner.first().detach();
            $bannerWrap.css('left','0'); 

            $bannerWrap.animate({
                'left' : - moveX + 'px'
            }, 600, 'linear');

            $banner.last().after($banner.eq(2).clone());
   
        };

        var toPrevShift = function(){
            $banner = $('#section03 .banner-item');
            $banner.first().before($banner.eq($banner.length-3).clone());
            $banner.last().detach(); 
            $bannerWrap.css('left',- moveX*2 + 'px'); 

            $bannerWrap.animate({
                'left' : - moveX + 'px'
            }, 600, 'linear');

        };

        var autoBannerFn = function(){

            setAutoBanner = setInterval(function(){
                toPrevShift();
            },3000)
        }

        setBanner();
        autoBannerFn();

    };


    var footerFn = function(){
        var $goBtn = $('#footer .go-item > a'),
            $goMenu = $('#footer .go-item > div');

        $goBtn.click(function(e){
            e.preventDefault();
            $goMenu.removeClass('active');   
            $(this).next('div').delay(3000).toggleClass('active');
        })

        $('body').click(function(e){
            e.preventDefault();
            if(!$goBtn.is(e.target)) $goMenu.removeClass('active');
        });
        
    };

    init();

});
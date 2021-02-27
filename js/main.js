$(document).ready(function(){

    var init = function(){
        fadeSlideFn();
        moveSlideFn();
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

    var fadeSlideFn = function(){
        var $slideBtns = $('#section01 .slider-wrap .slide-btns button');
        var $prevBtn = $slideBtns.eq(0);
        var $nextBtn = $slideBtns.eq(2);
        var $pauseBtn = $slideBtns.eq(1);

        var $numsText = $('#section01 .slider-wrap .slide-btns .nums');
        var $numText = $('#section01 .slider-wrap .slide-btns .num');

        var $slide = $('#section01 .slider-wrap .slide');
        var $slideLength = $slide.length;

        var $currentIdx = 0;
        var nextIdx = 0;
        var isPaused = false;

        var fadeslide = function(fromSlide, toSldie){
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
            fadeslide($slide.eq($currentIdx), $slide.eq(nextIdx));          
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
            fadeslide($slide.eq($currentIdx), $slide.eq(nextIdx));
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
                fadeslide($slide.eq($currentIdx), $slide.eq(nextIdx));
                $currentIdx = nextIdx;
                handleNumTxt();
            }, 4000);
        };

        handleNumTxt();
        handleAutoFade();

    };

    var moveSlideFn = function(){
        var $slideWrap = $('#section01 .news:nth-child(4) .slide-wrap');
        var $slide = $('#section01 .news:nth-child(4) .slide');
        var $slideBtn = $('#section01 .news:nth-child(4) .top-cover i')
        var $slideLength = $slide.length;

        var $currentIdx = 0;
        var $targetIdx = -1;
        var moveX = 0;
        var isRotated = false;


        $slideBtn.each(function(idx){
            $(this).click(function(e){
                e.preventDefault();
                $targetIdx = idx;
                moveSlide();
            })
        })

        // var handleAutoMove = function(){  
        //     setAutoMove = setInterval(function(){
        //         if($currentIdx < $slideLength-1) $targetIdx = $currentIdx + 1;
        //         else $targetIdx = 0;
        //         moveSlide();
        //     }, 4000);
        // };

        var moveSlide = function(){
            moveX = - ($slideWrap.find('.slide'+$targetIdx).offset().left- $slideWrap.find('.slide'+$currentIdx).offset().left);
            
            $slideWrap.animate({
                left : $slideWrap.position().left + moveX
            }, 600, 'swing');

            $slideBtn.eq($currentIdx).removeClass('active');
            $slideBtn.eq($targetIdx).addClass('active');

            $currentIdx = $targetIdx;  

            if($currentIdx===$slideLength-1){
                $slide.last().after($slide.first());
                $slideWrap.css({'left':$slideWrap.position().left+$slide.last().innerWidth()});
                console.log($slideWrap.position().left);
                isRotated = true;               
            };
            if($currentIdx===0 && isRotated){
                for(var i = 0; i<$slideLength-1; i++){
                    $slide.eq(i).after($slide.eq(i+1).detach());
                }
                $slideWrap.css({'left':0});
                isRotated = false;
            }

            // setTimeout(function(){
            //     console.log($slideWrap.position().left);
            //     if($currentIdx===$slideLength-1){
            //         $slide.last().after($slide.first());
            //         $slideWrap.css({'left':$slideWrap.position().left+$slide.last().innerWidth()});
            //         console.log($slideWrap.position().left);
            //         isRotated = true;               
            //     };
            //     if($currentIdx===0 && isRotated){
            //         for(var i = 0; i<$slideLength-1; i++){
            //             $slide.eq(i).after($slide.eq(i+1).detach());
            //         }
            //         $slideWrap.css({'left':0});
            //         isRotated = false;
            //     }
            // },600);
        };


        // handleAutoMove();
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
            }
            toPrevShift();
        });
        $bannerBtns.eq(1).click(function(e){//pouse
            e.preventDefault();
            if(!isPaused){
                clearInterval(setAutoBanner);
                $(this).addClass('active');
                isPaused = true;
            }else{
                autoBannerFn();
                $(this).removeClass('active');
                isPaused = false;
            }   
            
        });
        $bannerBtns.eq(2).click(function(e){
            e.preventDefault();
            if(!isPaused){
                clearInterval(setAutoBanner);
                $bannerBtns.eq(1).addClass('active');
                isPaused = true;
            }
            toNextShift();
        });

        var setBanner = function(){
            $banner.last().after($banner.first().clone());
            $banner.first().before($banner.last().clone());
            $bannerWrap.css('left', - moveX+'px');
        }

        var toNextShift = function(){
            $banner = $('#section03 .banner-item');//현재 배너 배열 받아옴
            $banner.first().detach(); //앞의 여분 배너 제거
            $bannerWrap.css('left','0'); 

            $bannerWrap.animate({
                'left' : - moveX + 'px'
            }, 600, 'linear');

            $banner.last().after($banner.eq(2).clone()); //맨 뒤에 여분 배너 추가 (처음에 받아올 때, 앞에서 세번째 였던 것)
   
        };

        var toPrevShift = function(){
            $banner = $('#section03 .banner-item');
            $banner.first().before($banner.eq($banner.length-3).clone());
            $banner.last().detach(); //뒤의 여분 배너 제거
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

        console.log($goMenu);

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
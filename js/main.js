$(document).ready(function(){

    var init = function(){
        fadeSlideFn();
        moveSlideFn();
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
            
            //stop autoSlide
        });


        var handleAutoFade = function(){
            startAutoFade = setInterval(function(){ 
                if($currentIdx>=$slideLength-1) nextIdx = 0;
                else nextIdx = $currentIdx+1;
                fadeslide($slide.eq($currentIdx), $slide.eq(nextIdx));
                $currentIdx = nextIdx;
                handleNumTxt();
            }, 3000);
        };

        handleNumTxt();
        handleAutoFade();

    };

    var moveSlideFn = function(){
        var $slideWrap = $('#section01 .news:nth-child(4) .slide-wrap');
        var $slide = $('#section01 .news:nth-child(4) .slide');
        var $slideBtn = $('#section01 .news:nth-child(4) .top-cover i')

        var $currentIdx = 0;

        var clickSlide = function(){
            var moveX = 0;
            $slideBtn.each(function(idx){
                $(this).click(function(e){
                    e.preventDefault();
                    if($currentIdx !== idx){
                        moveX = - ($slide.eq(idx).innerWidth() * idx);
                        $slideWrap.animate({
                            marginLeft: moveX+'px'
                        },400,'swing');
                        $slideBtn.eq($currentIdx).removeClass('active');
                        $slideBtn.eq(idx).addClass('active');
                        $currentIdx = idx;
                    }else{
                        return;
                    }
                })
            })
        };

        // var autoSlide = function(index){
        //     console.log($slide.length);
        //     console.log($slide.eq(index).innerWidth());


            
        // };


        clickSlide();
        
    };

    var footerFn = function(){
        var $goBtn = $('#footer .go-item > a');
        var $goMenu = $('#footer .go-item > div');

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
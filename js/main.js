$(document).ready(function(){

    var init = function(){
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

    var footerFn = function(){
        var $goBtn = $('#footer .go-item > a');
        var $goMenu = $('#footer .go-item > div');

        $goBtn.click(function(e){
            e.preventDefault();
            $goMenu.removeClass('active');
            $(this).next().toggleClass('active');
        })

        $('body').click(function(e){
            e.preventDefault();
            if(!$goBtn.is(e.target)) $goMenu.removeClass('active');
        });
        
    };


    init();

});
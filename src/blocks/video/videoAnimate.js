function videoCssAnimation(){
    $('.video__item-1').click(function(){
        $('.video__item-1').addClass('h-40 w-100');
        $('.video__item-2').addClass('h-40 w-0 o-0' );
        $('.video__item-3').addClass('h-0 o-0');
        $('.video__item-4').addClass('h-0 o-0');
        $('.video__controls').addClass('o-1');
        videoNum = 1;
        videoControlsChangeValue(videoNum);
    });
    $('.video__item-2').click(function(){
        $('.video__item-1').addClass('h-40 w-0 o-0' );
        $('.video__item-2').addClass('h-40 w-100');
        $('.video__item-3').addClass('h-0 o-0');
        $('.video__item-4').addClass('h-0 o-0');
        $('.video__controls').addClass('o-1');
        videoNum = 2;
        videoControlsChangeValue(videoNum);
    });
    $('.video__item-3').click(function(){
        $('.video__item-1').addClass('h-0 o-0');
        $('.video__item-2').addClass('h-0 o-0' );
        $('.video__item-3').addClass('w-100 h-40');
        $('.video__item-4').addClass('w-0 h-40 o-0');
        $('.video__controls').addClass('o-1');
        videoNum = 3;
        videoControlsChangeValue(videoNum);
    });

    $('.video__item-4').click(function(){
        $('.video__item-1').addClass('h-0 o-0');
        $('.video__item-2').addClass('h-0 o-0' );
        $('.video__item-3').addClass('w-0 h-40 o-0');
        $('.video__item-4').addClass('w-100 h-40');
        $('.video__controls').addClass('o-1');
        videoNum = 4;
        videoControlsChangeValue(videoNum);
    });

    //show all videos animation
    $('.video__button').click(function(){
        setVideoDefaultCss();
        videoNum = null;
    });
}
function setVideoDefaultCss(){
    $('.video__item-1').removeClass('h-0 w-0 o-0 h-40 w-100');
    $('.video__item-2').removeClass('h-0 w-0 o-0 h-40 w-100');
    $('.video__item-3').removeClass('h-0 w-0 o-0 h-40 w-100');
    $('.video__item-4').removeClass('h-0 w-0 o-0 h-40 w-100');
    $('.video__controls').removeClass('o-1');
}
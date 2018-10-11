function videoAnimation(){
    $('.video__item-1').click(function(){
        $('.video__item-1').addClass('h-40 w-100');
        $('.video__item-2').addClass('h-40 w-0 o-0' );
        $('.video__item-3').addClass('h-0 o-0');
        $('.video__item-4').addClass('h-0 o-0');
        $('.video__controls').addClass('o-1');
        $("#video-1").prop("controls",true);
        document.getElementById("video-2").pause();
        document.getElementById("video-3").pause();
        document.getElementById("video-4").pause();
        videoNum = 1;
        videoControlsChangeValue(videoNum);
        audioAnalyzer(videoNum);
    });
    $('.video__item-2').click(function(){
        $('.video__item-1').addClass('h-40 w-0 o-0' );
        $('.video__item-2').addClass('h-40 w-100');
        $('.video__item-3').addClass('h-0 o-0');
        $('.video__item-4').addClass('h-0 o-0');
        $('.video__controls').addClass('o-1');
        $("#video-2").prop("controls",true);
        document.getElementById("video-1").pause();
        document.getElementById("video-3").pause();
        document.getElementById("video-4").pause();
        videoNum = 2;
        videoControlsChangeValue(videoNum);
        audioAnalyzer(videoNum);

    });
    $('.video__item-3').click(function(){
        $('.video__item-1').addClass('h-0 o-0');
        $('.video__item-2').addClass('h-0 o-0' );
        $('.video__item-3').addClass('w-100 h-40');
        $('.video__item-4').addClass('w-0 h-0 o-0');
        $("#video-3").prop("controls",true);
        $('.video__controls').addClass('o-1');
        document.getElementById("video-1").pause();
        document.getElementById("video-2").pause();
        document.getElementById("video-4").pause();
        videoNum = 3;
        videoControlsChangeValue(videoNum);
        audioAnalyzer(videoNum);
    });

    $('.video__item-4').click(function(){
        $('.video__item-1').addClass('h-0 o-0');
        $('.video__item-2').addClass('h-0 o-0' );
        $('.video__item-3').addClass('w-0 h-0 o-0');
        $('.video__item-4').addClass('w-100 h-40');
        $("#video-4").prop("controls",true);
        $('.video__controls').addClass('o-1');
        document.getElementById("video-1").pause();
        document.getElementById("video-2").pause();
        document.getElementById("video-3").pause();
        videoNum = 4;
        videoControlsChangeValue(videoNum);
        audioAnalyzer(videoNum);
    });

    //show all videos animation
    $('.video__button').click(function(){
        setVideoDefaultCss();
        document.getElementById("video-1").play();
        document.getElementById("video-2").play();
        document.getElementById("video-3").play();
        document.getElementById("video-4").play();
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
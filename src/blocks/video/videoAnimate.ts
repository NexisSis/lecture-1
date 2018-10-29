function videoAnimation(){

    //check if audio analyzer was init
    let audioAnalyzerChecker = [0,0,0,0];
    var audioContext: AudioContext = audioContext || initAudioAnalyzer();
    var audioSrc = {};

    $('.video__item-1').click(function(){
        $('.video__item-1').addClass('h-40 w-100');
        $('.video__item-2').addClass('h-40 w-0 o-0' );
        $('.video__item-3').addClass('h-0 o-0');
        $('.video__item-4').addClass('h-0 o-0');
        $('.video__controls').addClass('o-1');
        $("#video-1").prop("controls",true);
        document.querySelector<HTMLMediaElement>("#video-2").pause();
        document.querySelector<HTMLMediaElement>("#video-3").pause();
        document.querySelector<HTMLMediaElement>("#video-4").pause();
        videoNum = 1;
        videoControlsChangeValue(videoNum);
        audioAnalyzerSetup(videoNum,audioContext,audioAnalyzerChecker,audioSrc);
    });
    $('.video__item-2').click(function(){
        $('.video__item-1').addClass('h-40 w-0 o-0' );
        $('.video__item-2').addClass('h-40 w-100');
        $('.video__item-3').addClass('h-0 o-0');
        $('.video__item-4').addClass('h-0 o-0');
        $('.video__controls').addClass('o-1');
        $("#video-2").prop("controls",true);
        document.querySelector<HTMLMediaElement>("#video-1").pause();
        document.querySelector<HTMLMediaElement>("#video-3").pause();
        document.querySelector<HTMLMediaElement>("#video-4").pause();
        videoNum = 2;
        videoControlsChangeValue(videoNum);
        audioAnalyzerSetup(videoNum,audioContext,audioAnalyzerChecker,audioSrc);

    });
    $('.video__item-3').click(function(){
        $('.video__item-1').addClass('h-0 o-0');
        $('.video__item-2').addClass('h-0 o-0' );
        $('.video__item-3').addClass('w-100 h-40');
        $('.video__item-4').addClass('w-0 h-0 o-0');
        $("#video-3").prop("controls",true);
        $('.video__controls').addClass('o-1');
        document.querySelector<HTMLMediaElement>("#video-1").pause();
        document.querySelector<HTMLMediaElement>("#video-2").pause();
        document.querySelector<HTMLMediaElement>("#video-4").pause();
        videoNum = 3;
        videoControlsChangeValue(videoNum);
        audioAnalyzerSetup(videoNum,audioContext,audioAnalyzerChecker,audioSrc);
    });

    $('.video__item-4').click(function(){
        $('.video__item-1').addClass('h-0 o-0');
        $('.video__item-2').addClass('h-0 o-0' );
        $('.video__item-3').addClass('w-0 h-0 o-0');
        $('.video__item-4').addClass('w-100 h-40');
        $("#video-4").prop("controls",true);
        $('.video__controls').addClass('o-1');
        document.querySelector<HTMLMediaElement>("#video-1").pause();
        document.querySelector<HTMLMediaElement>("#video-2").pause();
        document.querySelector<HTMLMediaElement>("#video-3").pause();
        videoNum = 4;
        videoControlsChangeValue(videoNum);
        audioAnalyzerSetup(videoNum,audioContext,audioAnalyzerChecker,audioSrc);
    });


    $('.video__button').click(function(){
        setVideoDefaultCss();
        document.querySelector<HTMLMediaElement>("#video-1").play();
        document.querySelector<HTMLMediaElement>("#video-2").play();
        document.querySelector<HTMLMediaElement>("#video-3").play();
        document.querySelector<HTMLMediaElement>("#video-4").play();
        $("#video-1").prop("controls",false);
        $("#video-1").prop("muted",true);
        $("#video-2").prop("controls",false);
        $("#video-2").prop("muted",true);
        $("#video-3").prop("controls",false);
        $("#video-3").prop("muted",true);
        $("#video-4").prop("controls",false);
        $("#video-4").prop("muted",true);
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
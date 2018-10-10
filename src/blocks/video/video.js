//Video from https://bitmovin.com/mpeg-dash-hls-examples-sample-streams/
function initVideo(video, url) {
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
}
function videoCssAnimation(){
    $('.video__item-1').click(function(){
        $('.video__item-1').addClass('h-45 w-100');
        $('.video__item-2').addClass('h-45 w-0 o-0' );
        $('.video__item-3').addClass('h-0 o-0');
        $('.video__item-4').addClass('h-0 o-0');
        $('.video__controls').addClass('o-1');
        videoNum = 1;
    });
    $('.video__item-2').click(function(){
        $('.video__item-1').addClass('h-45 w-0 o-0' );
        $('.video__item-2').addClass('h-45 w-100');
        $('.video__item-3').addClass('h-0 o-0');
        $('.video__item-4').addClass('h-0 o-0');
        $('.video__controls').addClass('o-1');
        videoNum = 2;
    });
    $('.video__item-3').click(function(){
        $('.video__item-1').addClass('h-0 o-0');
        $('.video__item-2').addClass('h-0 o-0' );
        $('.video__item-3').addClass('w-100 h-45');
        $('.video__item-4').addClass('w-0 h-45 o-0');
        $('.video__controls').addClass('o-1');
        videoNum = 3;
    });

    $('.video__item-4').click(function(){
        $('.video__item-1').addClass('h-0 o-0');
        $('.video__item-2').addClass('h-0 o-0' );
        $('.video__item-3').addClass('w-0 h-45 o-0');
        $('.video__item-4').addClass('w-100 h-45');
        $('.video__controls').addClass('o-1');
        videoNum = 4;
    });

    //show all videos animation
    $('.video__button').click(function(){
        $('.video__item-1').removeClass('h-0 w-0 o-0 h-45 w-100');
        $('.video__item-2').removeClass('h-0 w-0 o-0 h-45 w-100');
        $('.video__item-3').removeClass('h-0 w-0 o-0 h-45 w-100');
        $('.video__item-4').removeClass('h-0 w-0 o-0 h-45 w-100');
        $('.video__controls').removeClass('o-1');
        videoNum = null;
    });
}
function changeContrast(val){
    if(videoNum){
        var itemClassName = '.video__item-'+videoNum;
        var cssContract='contrast('+val/100+')';
        $(itemClassName).css('filter',cssContract);
    }
}
function changeBrightness(val){
    if(videoNum){
        var itemClassName = '.video__item-'+videoNum;
        var cssBrightness='brightness('+val/100+')';
        $(itemClassName).css('filter',cssBrightness);
    }
}
initVideo(
    document.getElementById('video-1'),
    'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
);
initVideo(
    document.getElementById('video-2'),
    'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
);
initVideo(
    document.getElementById('video-3'),
    'http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8'
);
initVideo(
    document.getElementById('video-4'),
    'http://www.streambox.fr/playlists/test_001/stream.m3u8'
);

var videoNum;
if($(document).width()>450) {
    videoCssAnimation();
}

$( window ).resize(function() {
  if($(document).width()>450){
      videoCssAnimation();
  }
});

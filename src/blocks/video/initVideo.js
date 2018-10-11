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
function initVideoFilters(){
    var result = {};
    var count = $('.video__item').length;
    for(var i=0;i<count;i++){
        result[i]={};
        result[i].contrast=1;
        result[i].brightness=1;
    }
    return result;
}
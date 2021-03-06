//Video from https://bitmovin.com/mpeg-dash-hls-examples-sample-streams/
function initVideo(video: HTMLVideoElement | null, url:string) {

    if(!video){
        console.log(video);
        console.log('empty video');
        return;
    }

    if (Hls.isSupported()) {
        const hls = new Hls();
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
// interface ResultValue {
//     contrast?: number;
//     brightness?: number;
// }

function initVideoFilters(){

    // let result : ResultValue;
    let result = {};

    const count = $('.video__item').length;
    for(var i=0;i<count;i++){
        result[i]={};
        result[i].contrast=1;
        result[i].brightness=1;
    }
    return result;
}
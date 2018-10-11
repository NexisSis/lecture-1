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


//opened video
var videoNum;

var videoFilters = initVideoFilters();

if($(document).width()>450) {
    videoCssAnimation();
}else{
    setVideoDefaultCss();
}

$( window ).resize(function() {
  if($(document).width()>450){
      videoCssAnimation();
  }else{
      setVideoDefaultCss();
  }
});


var audioContext = initAudioAnalyzer();

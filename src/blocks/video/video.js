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
    'https://www.streambox.fr/playlists/test_001/stream.m3u8'
);
initVideo(
    document.getElementById('video-4'),
    'https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8'
);

//opened video
var videoNum =1;

var videoFilters = initVideoFilters();

if($(document).width()>450) {
    videoAnimation();
}else{
    setVideoDefaultCss();
}

$( window ).resize(function() {
  if($(document).width()>450){
      videoAnimation();
  }else{
      setVideoDefaultCss();
  }
});



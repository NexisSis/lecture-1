// function initVideo(video, url) {
//     if (Hls.isSupported()) {
//         var hls = new Hls();
//         hls.loadSource(url);
//         hls.attachMedia(video);
//         hls.on(Hls.Events.MANIFEST_PARSED, function () {
//             video.play();
//         });
//     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//         video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
//         video.addEventListener('loadedmetadata', function () {
//             video.play();
//         });
//     }
// }
// initVideo(
//     document.getElementById('video-1'),
//     'https://www.youtube.com/embed/qyEzsAy4qeU'
// );
// initVideo(
//     document.getElementById('video-2'),
//     'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8'
// );
// initVideo(
//     document.getElementById('video-3'),
//     'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8'
// );
// initVideo(
//     document.getElementById('video-4'),
//     'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8'
// );

$(document).ready(function(){
  if($(document).width>450){
    //open video animation
    $('.video__item-1').click(function(){
      $('.video__item-1').addClass('h-50 w-100');
      $('.video__item-2').addClass('h-50 w-0 o-0' );
      $('.video__item-3').addClass('h-0 o-0');
      $('.video__item-4').addClass('h-0 o-0');
      $('.video__button').addClass('o-1');
    });
    $('.video__item-2').click(function(){
      $('.video__item-1').addClass('h-50 w-0 o-0' );
      $('.video__item-2').addClass('h-50 w-100');
      $('.video__item-3').addClass('h-0 o-0');
      $('.video__item-4').addClass('h-0 o-0');
      $('.video__button').addClass('o-1');
    });
    $('.video__item-3').click(function(){
      $('.video__item-1').addClass('h-0 o-0');
      $('.video__item-2').addClass('h-0 o-0' );
      $('.video__item-3').addClass('w-100 h-50');
      $('.video__item-4').addClass('w-0 h-50 o-0');
      $('.video__button').addClass('o-1');
    });

    $('.video__item-4').click(function(){
      $('.video__item-1').addClass('h-0 o-0');
      $('.video__item-2').addClass('h-0 o-0' );
      $('.video__item-3').addClass('w-0 h-50 o-0');
      $('.video__item-4').addClass('w-100 h-50');
      $('.video__button').addClass('o-1');
    });

    //show all videos animation
    $('.video__button').click(function(){
      $('.video__item-1').removeClass('h-0 w-0 o-0 h-50 w-100');
      $('.video__item-2').removeClass('h-0 w-0 o-0 h-50 w-100');
      $('.video__item-3').removeClass('h-0 w-0 o-0 h-50 w-100');
      $('.video__item-4').removeClass('h-0 w-0 o-0 h-50 w-100');
      $('.video__button').removeClass('o-1');
    });
  }
});

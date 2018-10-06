$(document).ready(function() {

    var firstSongName = $('.player__song').text();
    cutSongName(firstSongName);
    $( window ).resize(function() {
        cutSongName(firstSongName);
    });
});


function cutSongName(songName){
    if ($(window).width() < 450) {
        var a = songName;
        if (a.length > 23) {
            a = a.substring(0, 23);
            a += "...";
        }
        $('.player__song').text(a);
    }
}
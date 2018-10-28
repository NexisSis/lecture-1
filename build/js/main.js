"use strict";
$(document).ready(function () {
    var firstSongName = $('.player__song').text();
    cutSongName(firstSongName);
    $(window).resize(function () {
        cutSongName(firstSongName);
    });
    function cutSongName(songName) {
        var width = $(window).width() || null;
        if (width) {
            if (width < 450) {
                var a = songName;
                if (a.length > 23) {
                    a = a.substring(0, 23);
                    a += "...";
                }
                $('.player__song').text(a);
            }
        }
    }
});
function videoAnimation() {
    //check if audio analyzer was init
    var audioAnalyzerChecker = [0, 0, 0, 0];
    //create audioContext
    var audioContext = audioContext || initAudioAnalyzer();
    var audioSrc = {};
    $('.video__item-1').click(function () {
        $('.video__item-1').addClass('h-40 w-100');
        $('.video__item-2').addClass('h-40 w-0 o-0');
        $('.video__item-3').addClass('h-0 o-0');
        $('.video__item-4').addClass('h-0 o-0');
        $('.video__controls').addClass('o-1');
        $("#video-1").prop("controls", true);
        document.getElementById("video-2").pause();
        document.getElementById("video-3").pause();
        document.getElementById("video-4").pause();
        videoNum = 1;
        videoControlsChangeValue(videoNum);
        audioAnalyzerSetup(videoNum, audioContext, audioAnalyzerChecker, audioSrc);
    });
    $('.video__item-2').click(function () {
        $('.video__item-1').addClass('h-40 w-0 o-0');
        $('.video__item-2').addClass('h-40 w-100');
        $('.video__item-3').addClass('h-0 o-0');
        $('.video__item-4').addClass('h-0 o-0');
        $('.video__controls').addClass('o-1');
        $("#video-2").prop("controls", true);
        document.getElementById("video-1").pause();
        document.getElementById("video-3").pause();
        document.getElementById("video-4").pause();
        videoNum = 2;
        videoControlsChangeValue(videoNum);
        audioAnalyzerSetup(videoNum, audioContext, audioAnalyzerChecker, audioSrc);
    });
    $('.video__item-3').click(function () {
        $('.video__item-1').addClass('h-0 o-0');
        $('.video__item-2').addClass('h-0 o-0');
        $('.video__item-3').addClass('w-100 h-40');
        $('.video__item-4').addClass('w-0 h-0 o-0');
        $("#video-3").prop("controls", true);
        $('.video__controls').addClass('o-1');
        document.getElementById("video-1").pause();
        document.getElementById("video-2").pause();
        document.getElementById("video-4").pause();
        videoNum = 3;
        videoControlsChangeValue(videoNum);
        audioAnalyzerSetup(videoNum, audioContext, audioAnalyzerChecker, audioSrc);
    });
    $('.video__item-4').click(function () {
        $('.video__item-1').addClass('h-0 o-0');
        $('.video__item-2').addClass('h-0 o-0');
        $('.video__item-3').addClass('w-0 h-0 o-0');
        $('.video__item-4').addClass('w-100 h-40');
        $("#video-4").prop("controls", true);
        $('.video__controls').addClass('o-1');
        document.getElementById("video-1").pause();
        document.getElementById("video-2").pause();
        document.getElementById("video-3").pause();
        videoNum = 4;
        videoControlsChangeValue(videoNum);
        audioAnalyzerSetup(videoNum, audioContext, audioAnalyzerChecker, audioSrc);
    });
    $('.video__button').click(function () {
        setVideoDefaultCss();
        document.getElementById("video-1").play();
        document.getElementById("video-2").play();
        document.getElementById("video-3").play();
        document.getElementById("video-4").play();
        $("#video-1").prop("controls", false);
        $("#video-1").prop("muted", true);
        $("#video-2").prop("controls", false);
        $("#video-2").prop("muted", true);
        $("#video-3").prop("controls", false);
        $("#video-3").prop("muted", true);
        $("#video-4").prop("controls", false);
        $("#video-4").prop("muted", true);
        videoNum = null;
    });
}
function setVideoDefaultCss() {
    $('.video__item-1').removeClass('h-0 w-0 o-0 h-40 w-100');
    $('.video__item-2').removeClass('h-0 w-0 o-0 h-40 w-100');
    $('.video__item-3').removeClass('h-0 w-0 o-0 h-40 w-100');
    $('.video__item-4').removeClass('h-0 w-0 o-0 h-40 w-100');
    $('.video__controls').removeClass('o-1');
}
//changed value of video controls after open another video
function videoControlsChangeValue(num) {
    if (videoFilters[num - 1]) {
        if (videoFilters[num - 1].contrast || videoFilters[num - 1].contrast == 0) {
            $('#video__contrast').val(videoFilters[num - 1].contrast * 100);
        }
        else {
            $('#video__contrast').val(100);
        }
        if (videoFilters[num - 1].brightness || videoFilters[num - 1].brightness == 0) {
            $('#video__brightness').val(videoFilters[num - 1].brightness * 100);
        }
        else {
            $('#video__brightness').val(100);
        }
    }
}
function changeContrast(val) {
    if (videoNum) {
        var itemClassName = '.video__item-' + videoNum;
        var cssContract = 'contrast(' + val / 100 + ')';
        $(itemClassName).css('filter', cssContract);
        //save filters
        if (!videoFilters) {
            videoFilters = initVideoFilters();
        }
        videoFilters[videoNum - 1].contrast = val / 100;
    }
}
function changeBrightness(val) {
    if (videoNum) {
        var itemClassName = '.video__item-' + videoNum;
        var cssBrightness = 'brightness(' + val / 100 + ')';
        $(itemClassName).css('filter', cssBrightness);
        //save filters
        if (!videoFilters) {
            videoFilters = initVideoFilters();
        }
        videoFilters[videoNum - 1].brightness = val / 100;
    }
}
var video;
video = document.getElementById('video-1');
initVideo(video, 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8');
initVideo(document.getElementById('video-2'), 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8');
initVideo(document.getElementById('video-3'), 'https://www.streambox.fr/playlists/test_001/stream.m3u8');
initVideo(document.getElementById('video-4'), 'https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8');
//opened video
var videoNum = 1;
var videoFilters = initVideoFilters();
var width = $(window).width() || null;
if (width && width > 450) {
    videoAnimation();
}
else {
    setVideoDefaultCss();
}
$(window).resize(function () {
    if (width && width > 450) {
        videoAnimation();
    }
    else {
        setVideoDefaultCss();
    }
});
//Video from https://bitmovin.com/mpeg-dash-hls-examples-sample-streams/
function initVideo(video, url) {
    if (!video) {
        return;
    }
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
}
function initVideoFilters() {
    var result = {};
    var count = $('.video__item').length;
    for (var i = 0; i < count; i++) {
        result[i] = {};
        result[i].contrast = 1;
        result[i].brightness = 1;
    }
    return result;
}
function initAudioAnalyzer() {
    var audioContext = null;
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
    }
    catch (e) {
        alert('Opps.. Your browser do not support audio API');
    }
    return audioContext;
}
function audioAnalyzer(videoNum, audioContext, audioSrc) {
    if (audioContext) {
        if (analyser == undefined) {
            var analyser = audioContext.createAnalyser();
        }
        //make smaller count of sound for draw
        analyser.fftSize = 32;
        audioSrc.connect(analyser);
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);
        audioSrc.connect(audioContext.destination);
        // loop
        function renderFrame() {
            requestAnimationFrame(renderFrame);
            // update data in frequencyData
            analyser.getByteFrequencyData(frequencyData);
            //move sound line
            var moveTo = parseInt(100 - (frequencyData[0] / 2.55));
            var translate = "translateX(" + moveTo + "%)";
            $(".video__volume-line").css("transform", translate);
        }
        renderFrame();
        audioSrc = null;
    }
    else {
        console.log('audioContext is null');
    }
}
function audioAnalyzerSetup(num, context, checker, src) {
    if (checker[num - 1] == 0) {
        var audio = document.getElementById('video-' + num);
        src[num - 1] = context.createMediaElementSource(audio);
        audioAnalyzer(num, context, src[num - 1]);
        checker[num - 1] = num;
    }
    else {
        if (src[num - 1]) {
            audioAnalyzer(num, context, src[num - 1]);
        }
        else {
            console.log('audio src is null');
        }
    }
}

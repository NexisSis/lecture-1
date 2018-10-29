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
function audioAnalyzer(videoNum, audioContext, audioSrc) {
    if (audioContext) {
        if (analyser == undefined) {
            var analyser = audioContext.createAnalyser();
        }
        //make smaller count of sound for draw
        analyser.fftSize = 32;
        audioSrc.connect(analyser);
        var frequencyData_1 = new Uint8Array(analyser.frequencyBinCount);
        audioSrc.connect(audioContext.destination);
        // loop
        function renderFrame() {
            requestAnimationFrame(renderFrame);
            // update data in frequencyData
            analyser.getByteFrequencyData(frequencyData_1);
            var diffFrequency = frequencyData_1[0] / 2.55;
            //move sound line
            var moveTo = 100 - diffFrequency;
            console.log(moveTo);
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
        if (audio) {
            src[num - 1] = context.createMediaElementSource(audio);
            audioAnalyzer(num, context, src[num - 1]);
            checker[num - 1] = num;
        }
        else {
            console.log("audio is empty");
        }
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
function initAudioAnalyzer() {
    var audioContext = null;
    try {
        this.window.AudioContext = this.window.AudioContext || this.window.webkitAudioContext;
        audioContext = new AudioContext();
    }
    catch (e) {
        alert('Opps.. Your browser do not support audio API');
    }
    return audioContext;
}
//Video from https://bitmovin.com/mpeg-dash-hls-examples-sample-streams/
function initVideo(video, url) {
    if (!video) {
        console.log(video);
        console.log('empty video');
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
// interface ResultValue {
//     contrast?: number;
//     brightness?: number;
// }
function initVideoFilters() {
    // let result : ResultValue;
    var result = {};
    var count = $('.video__item').length;
    for (var i = 0; i < count; i++) {
        result[i] = {};
        result[i].contrast = 1;
        result[i].brightness = 1;
    }
    return result;
}
initVideo(document.querySelector('#video-1'), 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8');
initVideo(document.querySelector('#video-2'), 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8');
initVideo(document.querySelector('#video-3'), 'https://www.streambox.fr/playlists/test_001/stream.m3u8');
initVideo(document.querySelector('#video-4'), 'https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8');
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
function videoAnimation() {
    //check if audio analyzer was init
    var audioAnalyzerChecker = [0, 0, 0, 0];
    var audioContext = audioContext || initAudioAnalyzer();
    var audioSrc = {};
    $('.video__item-1').click(function () {
        $('.video__item-1').addClass('h-40 w-100');
        $('.video__item-2').addClass('h-40 w-0 o-0');
        $('.video__item-3').addClass('h-0 o-0');
        $('.video__item-4').addClass('h-0 o-0');
        $('.video__controls').addClass('o-1');
        $("#video-1").prop("controls", true);
        document.querySelector("#video-2").pause();
        document.querySelector("#video-3").pause();
        document.querySelector("#video-4").pause();
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
        document.querySelector("#video-1").pause();
        document.querySelector("#video-3").pause();
        document.querySelector("#video-4").pause();
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
        document.querySelector("#video-1").pause();
        document.querySelector("#video-2").pause();
        document.querySelector("#video-4").pause();
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
        document.querySelector("#video-1").pause();
        document.querySelector("#video-2").pause();
        document.querySelector("#video-3").pause();
        videoNum = 4;
        videoControlsChangeValue(videoNum);
        audioAnalyzerSetup(videoNum, audioContext, audioAnalyzerChecker, audioSrc);
    });
    $('.video__button').click(function () {
        setVideoDefaultCss();
        document.querySelector("#video-1").play();
        document.querySelector("#video-2").play();
        document.querySelector("#video-3").play();
        document.querySelector("#video-4").play();
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
document.addEventListener("DOMContentLoaded", function (event) {
    var image = document.querySelector('.image');
    //stackoverflow fix
    var parentNode = image.parentNode;
    // что б не таскалась картинка
    image.addEventListener('dragstart', function (event) {
        event.preventDefault();
    });
    var stateImg = {
        moveMin: -(image.offsetWidth - parentNode.offsetWidth),
        left: 0,
        moveMax: 0,
        zoomMin: 100,
        zoom: 100,
        zoomMax: 300
    };
    var pointerNow = {};
    var isMove = false;
    image.addEventListener('pointerdown', function (event) {
        pointerNow[event.pointerId] = event;
        isMove = true;
    });
    var calcDistance = function (e1, e2) {
        var x1 = e1.clientX, y1 = e1.clientY;
        var x2 = e2.clientX, y2 = e2.clientY;
        var distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        return distance;
    };
    var move = function (val) {
        var moveMin = stateImg.moveMin, moveMax = stateImg.moveMax;
        stateImg.left += val;
        if (stateImg.left < moveMin) {
            stateImg.left = moveMin;
        }
        else if (stateImg.left > moveMax) {
            stateImg.left = moveMax;
        }
        image.style.left = stateImg.left + 'px';
        document.querySelector('.left').innerText = (-(Math.round(stateImg.left * 100) / 100)).toString();
    };
    var calcAngle = function (e1, e2) {
        var x1 = e1.clientX, y1 = e1.clientY;
        var x2 = e2.clientX, y2 = e2.clientY;
        var radius = Math.atan2(x2 - x1, y2 - y1);
        var angle = 180 + Math.round(radius * 180 / Math.PI);
        return angle;
    };
    image.addEventListener('pointermove', function (e) {
        var pointersCount = Object.keys(pointerNow).length;
        if (pointersCount === 1 && pointerNow[e.pointerId] && isMove) {
            // calc distance
            move(e.clientX - pointerNow[e.pointerId].clientX);
            pointerNow[e.pointerId] = e;
        }
        else if (pointersCount === 2) {
            pointerNow[e.pointerId] = e;
            var events = Object.values(pointerNow);
            var distanceDifferent = calcDistance(events[0], events[1]) - stateImg.zoom;
            var zoomMin = stateImg.zoomMin, zoomMax = stateImg.zoomMax;
            var zoom = void 0;
            if (distanceDifferent < 0) {
                zoom = Math.max(stateImg.zoom + distanceDifferent, zoomMin);
            }
            else {
                zoom = Math.min(stateImg.zoom + distanceDifferent, zoomMax);
            }
            stateImg.zoom = zoom;
            image.style.height = zoom + '%';
            document.querySelector('.zoom').innerText = (Math.round(zoom * 100) / 100).toString();
        }
    });
    image.addEventListener('pointerup', function (event) {
        delete pointerNow[event.pointerId];
        isMove = false;
    });
    image.addEventListener('pointerleave', function (event) {
        delete pointerNow[event.pointerId];
        isMove = false;
    });
    // сделал после просмотра разбора
    var fakePointer = document.querySelector('.fake-pointer');
    image.addEventListener('dblclick', function (event) {
        if (pointerNow['fake']) {
            delete pointerNow['fake'];
            fakePointer.style.left = '0';
            fakePointer.style.top = '0';
            fakePointer.classList.remove('active');
        }
        else {
            pointerNow['fake'] = event;
            width = fakePointer.offsetWidth;
            fakePointer.classList.add('active');
            fakePointer.style.left = (stateImg.left + event.offsetX - width / 2).toString();
            fakePointer.style.top = (event.offsetY - width / 2).toString();
        }
    });
});

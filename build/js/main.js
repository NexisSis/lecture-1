var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("flux/MyDispatcher", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MyDispatcher = /** @class */ (function () {
        function MyDispatcher() {
            this.callbacks = [];
        }
        MyDispatcher.prototype.dispatch = function (payload) {
            for (var i = 0; i < this.callbacks.length; i++) {
                this.callbacks[i](payload);
            }
        };
        MyDispatcher.prototype.register = function (callback) {
            this.callbacks.push(callback);
        };
        return MyDispatcher;
    }());
    exports.default = MyDispatcher;
});
define("flux/MyStore", ["require", "exports", "flux/MyDispatcher"], function (require, exports, MyDispatcher_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MyDispatcher_1 = __importDefault(MyDispatcher_1);
    var dispatcher = new MyDispatcher_1.default();
    var MyStore = {
        events: {},
        currentPage: '',
        getCurrentPage: function () {
            return this.currentPage;
        },
        bind: function (e, callback) {
            this.events[e] = this.events[e] || {};
            this.events[e].push(callback);
        },
        trigger: function (e) {
            this.events[e] = this.events[e] || {};
            for (var i = 0; i < this._events[e].length; i++) {
                this._events[e][i].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    };
    dispatcher.register(function (payload) {
        switch (payload.eventName) {
            case 'change-page':
                MyStore.currentPage = payload.pageName;
                MyStore.trigger('change-page');
                break;
        }
    });
    var componentDidMount = function () {
        MyStore.bind('change-page', changePage);
    };
    var changePage = function () {
        var currentPageName = MyStore.currentPage;
        $('.index').removeClass('active');
        $('index__' + currentPageName).addClass('active');
    };
    function userClickEventChangePage(name) {
        event.preventDefault();
        dispatcher.dispatch({
            eventName: 'change-page',
            pageName: name
        });
    }
});
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
        var audio = document.querySelector('#video-' + num);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1aWxkL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbmRlZmluZShcImZsdXgvTXlEaXNwYXRjaGVyXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICB2YXIgTXlEaXNwYXRjaGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIE15RGlzcGF0Y2hlcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTXlEaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uIChwYXlsb2FkKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW2ldKHBheWxvYWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNeURpc3BhdGNoZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIE15RGlzcGF0Y2hlcjtcclxuICAgIH0oKSk7XHJcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBNeURpc3BhdGNoZXI7XHJcbn0pO1xyXG5kZWZpbmUoXCJmbHV4L015U3RvcmVcIiwgW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJmbHV4L015RGlzcGF0Y2hlclwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIE15RGlzcGF0Y2hlcl8xKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgIE15RGlzcGF0Y2hlcl8xID0gX19pbXBvcnREZWZhdWx0KE15RGlzcGF0Y2hlcl8xKTtcclxuICAgIHZhciBkaXNwYXRjaGVyID0gbmV3IE15RGlzcGF0Y2hlcl8xLmRlZmF1bHQoKTtcclxuICAgIHZhciBNeVN0b3JlID0ge1xyXG4gICAgICAgIGV2ZW50czoge30sXHJcbiAgICAgICAgY3VycmVudFBhZ2U6ICcnLFxyXG4gICAgICAgIGdldEN1cnJlbnRQYWdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZDogZnVuY3Rpb24gKGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2VdID0gdGhpcy5ldmVudHNbZV0gfHwge307XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2VdLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZV0gPSB0aGlzLmV2ZW50c1tlXSB8fCB7fTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9ldmVudHNbZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1tlXVtpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uIChwYXlsb2FkKSB7XHJcbiAgICAgICAgc3dpdGNoIChwYXlsb2FkLmV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlICdjaGFuZ2UtcGFnZSc6XHJcbiAgICAgICAgICAgICAgICBNeVN0b3JlLmN1cnJlbnRQYWdlID0gcGF5bG9hZC5wYWdlTmFtZTtcclxuICAgICAgICAgICAgICAgIE15U3RvcmUudHJpZ2dlcignY2hhbmdlLXBhZ2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmFyIGNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIE15U3RvcmUuYmluZCgnY2hhbmdlLXBhZ2UnLCBjaGFuZ2VQYWdlKTtcclxuICAgIH07XHJcbiAgICB2YXIgY2hhbmdlUGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY3VycmVudFBhZ2VOYW1lID0gTXlTdG9yZS5jdXJyZW50UGFnZTtcclxuICAgICAgICAkKCcuaW5kZXgnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnaW5kZXhfXycgKyBjdXJyZW50UGFnZU5hbWUpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiB1c2VyQ2xpY2tFdmVudENoYW5nZVBhZ2UobmFtZSkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogJ2NoYW5nZS1wYWdlJyxcclxuICAgICAgICAgICAgcGFnZU5hbWU6IG5hbWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmaXJzdFNvbmdOYW1lID0gJCgnLnBsYXllcl9fc29uZycpLnRleHQoKTtcclxuICAgIGN1dFNvbmdOYW1lKGZpcnN0U29uZ05hbWUpO1xyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY3V0U29uZ05hbWUoZmlyc3RTb25nTmFtZSk7XHJcbiAgICB9KTtcclxuICAgIGZ1bmN0aW9uIGN1dFNvbmdOYW1lKHNvbmdOYW1lKSB7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKCkgfHwgbnVsbDtcclxuICAgICAgICBpZiAod2lkdGgpIHtcclxuICAgICAgICAgICAgaWYgKHdpZHRoIDwgNDUwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYSA9IHNvbmdOYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKGEubGVuZ3RoID4gMjMpIHtcclxuICAgICAgICAgICAgICAgICAgICBhID0gYS5zdWJzdHJpbmcoMCwgMjMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGEgKz0gXCIuLi5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICQoJy5wbGF5ZXJfX3NvbmcnKS50ZXh0KGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB2YXIgaW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2UnKTtcclxuICAgIC8vc3RhY2tvdmVyZmxvdyBmaXhcclxuICAgIHZhciBwYXJlbnROb2RlID0gaW1hZ2UucGFyZW50Tm9kZTtcclxuICAgIC8vINGH0YLQviDQsSDQvdC1INGC0LDRgdC60LDQu9Cw0YHRjCDQutCw0YDRgtC40L3QutCwXHJcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgc3RhdGVJbWcgPSB7XHJcbiAgICAgICAgbW92ZU1pbjogLShpbWFnZS5vZmZzZXRXaWR0aCAtIHBhcmVudE5vZGUub2Zmc2V0V2lkdGgpLFxyXG4gICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgbW92ZU1heDogMCxcclxuICAgICAgICB6b29tTWluOiAxMDAsXHJcbiAgICAgICAgem9vbTogMTAwLFxyXG4gICAgICAgIHpvb21NYXg6IDMwMFxyXG4gICAgfTtcclxuICAgIHZhciBwb2ludGVyTm93ID0ge307XHJcbiAgICB2YXIgaXNNb3ZlID0gZmFsc2U7XHJcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHBvaW50ZXJOb3dbZXZlbnQucG9pbnRlcklkXSA9IGV2ZW50O1xyXG4gICAgICAgIGlzTW92ZSA9IHRydWU7XHJcbiAgICB9KTtcclxuICAgIHZhciBjYWxjRGlzdGFuY2UgPSBmdW5jdGlvbiAoZTEsIGUyKSB7XHJcbiAgICAgICAgdmFyIHgxID0gZTEuY2xpZW50WCwgeTEgPSBlMS5jbGllbnRZO1xyXG4gICAgICAgIHZhciB4MiA9IGUyLmNsaWVudFgsIHkyID0gZTIuY2xpZW50WTtcclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHgxIC0geDIpICogKHgxIC0geDIpICsgKHkxIC0geTIpICogKHkxIC0geTIpKTtcclxuICAgICAgICByZXR1cm4gZGlzdGFuY2U7XHJcbiAgICB9O1xyXG4gICAgdmFyIG1vdmUgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgdmFyIG1vdmVNaW4gPSBzdGF0ZUltZy5tb3ZlTWluLCBtb3ZlTWF4ID0gc3RhdGVJbWcubW92ZU1heDtcclxuICAgICAgICBzdGF0ZUltZy5sZWZ0ICs9IHZhbDtcclxuICAgICAgICBpZiAoc3RhdGVJbWcubGVmdCA8IG1vdmVNaW4pIHtcclxuICAgICAgICAgICAgc3RhdGVJbWcubGVmdCA9IG1vdmVNaW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHN0YXRlSW1nLmxlZnQgPiBtb3ZlTWF4KSB7XHJcbiAgICAgICAgICAgIHN0YXRlSW1nLmxlZnQgPSBtb3ZlTWF4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbWFnZS5zdHlsZS5sZWZ0ID0gc3RhdGVJbWcubGVmdCArICdweCc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnQnKS5pbm5lclRleHQgPSAoLShNYXRoLnJvdW5kKHN0YXRlSW1nLmxlZnQgKiAxMDApIC8gMTAwKSkudG9TdHJpbmcoKTtcclxuICAgIH07XHJcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIHBvaW50ZXJzQ291bnQgPSBPYmplY3Qua2V5cyhwb2ludGVyTm93KS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHBvaW50ZXJzQ291bnQgPT09IDEgJiYgcG9pbnRlck5vd1tlLnBvaW50ZXJJZF0gJiYgaXNNb3ZlKSB7XHJcbiAgICAgICAgICAgIC8vIGNhbGMgZGlzdGFuY2VcclxuICAgICAgICAgICAgbW92ZShlLmNsaWVudFggLSBwb2ludGVyTm93W2UucG9pbnRlcklkXS5jbGllbnRYKTtcclxuICAgICAgICAgICAgcG9pbnRlck5vd1tlLnBvaW50ZXJJZF0gPSBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwb2ludGVyc0NvdW50ID09PSAyKSB7XHJcbiAgICAgICAgICAgIHBvaW50ZXJOb3dbZS5wb2ludGVySWRdID0gZTtcclxuICAgICAgICAgICAgdmFyIGV2ZW50cyA9IE9iamVjdC52YWx1ZXMocG9pbnRlck5vdyk7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZURpZmZlcmVudCA9IGNhbGNEaXN0YW5jZShldmVudHNbMF0sIGV2ZW50c1sxXSkgLSBzdGF0ZUltZy56b29tO1xyXG4gICAgICAgICAgICB2YXIgem9vbU1pbiA9IHN0YXRlSW1nLnpvb21NaW4sIHpvb21NYXggPSBzdGF0ZUltZy56b29tTWF4O1xyXG4gICAgICAgICAgICB2YXIgem9vbSA9IHZvaWQgMDtcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlRGlmZmVyZW50IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgem9vbSA9IE1hdGgubWF4KHN0YXRlSW1nLnpvb20gKyBkaXN0YW5jZURpZmZlcmVudCwgem9vbU1pbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB6b29tID0gTWF0aC5taW4oc3RhdGVJbWcuem9vbSArIGRpc3RhbmNlRGlmZmVyZW50LCB6b29tTWF4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdGF0ZUltZy56b29tID0gem9vbTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gem9vbSArICclJztcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnpvb20nKS5pbm5lclRleHQgPSAoTWF0aC5yb3VuZCh6b29tICogMTAwKSAvIDEwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGRlbGV0ZSBwb2ludGVyTm93W2V2ZW50LnBvaW50ZXJJZF07XHJcbiAgICAgICAgaXNNb3ZlID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJsZWF2ZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGRlbGV0ZSBwb2ludGVyTm93W2V2ZW50LnBvaW50ZXJJZF07XHJcbiAgICAgICAgaXNNb3ZlID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIC8vINGB0LTQtdC70LDQuyDQv9C+0YHQu9C1INC/0YDQvtGB0LzQvtGC0YDQsCDRgNCw0LfQsdC+0YDQsFxyXG4gICAgdmFyIGZha2VQb2ludGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZha2UtcG9pbnRlcicpO1xyXG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBpZiAocG9pbnRlck5vd1snZmFrZSddKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBwb2ludGVyTm93WydmYWtlJ107XHJcbiAgICAgICAgICAgIGZha2VQb2ludGVyLnN0eWxlLmxlZnQgPSAnMCc7XHJcbiAgICAgICAgICAgIGZha2VQb2ludGVyLnN0eWxlLnRvcCA9ICcwJztcclxuICAgICAgICAgICAgZmFrZVBvaW50ZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwb2ludGVyTm93WydmYWtlJ10gPSBldmVudDtcclxuICAgICAgICAgICAgd2lkdGggPSBmYWtlUG9pbnRlci5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgZmFrZVBvaW50ZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGZha2VQb2ludGVyLnN0eWxlLmxlZnQgPSAoc3RhdGVJbWcubGVmdCArIGV2ZW50Lm9mZnNldFggLSB3aWR0aCAvIDIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGZha2VQb2ludGVyLnN0eWxlLnRvcCA9IChldmVudC5vZmZzZXRZIC0gd2lkdGggLyAyKS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuZnVuY3Rpb24gYXVkaW9BbmFseXplcih2aWRlb051bSwgYXVkaW9Db250ZXh0LCBhdWRpb1NyYykge1xyXG4gICAgaWYgKGF1ZGlvQ29udGV4dCkge1xyXG4gICAgICAgIGlmIChhbmFseXNlciA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFyIGFuYWx5c2VyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbWFrZSBzbWFsbGVyIGNvdW50IG9mIHNvdW5kIGZvciBkcmF3XHJcbiAgICAgICAgYW5hbHlzZXIuZmZ0U2l6ZSA9IDMyO1xyXG4gICAgICAgIGF1ZGlvU3JjLmNvbm5lY3QoYW5hbHlzZXIpO1xyXG4gICAgICAgIHZhciBmcmVxdWVuY3lEYXRhXzEgPSBuZXcgVWludDhBcnJheShhbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudCk7XHJcbiAgICAgICAgYXVkaW9TcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgIC8vIGxvb3BcclxuICAgICAgICBmdW5jdGlvbiByZW5kZXJGcmFtZSgpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlckZyYW1lKTtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIGRhdGEgaW4gZnJlcXVlbmN5RGF0YVxyXG4gICAgICAgICAgICBhbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YShmcmVxdWVuY3lEYXRhXzEpO1xyXG4gICAgICAgICAgICB2YXIgZGlmZkZyZXF1ZW5jeSA9IGZyZXF1ZW5jeURhdGFfMVswXSAvIDIuNTU7XHJcbiAgICAgICAgICAgIC8vbW92ZSBzb3VuZCBsaW5lXHJcbiAgICAgICAgICAgIHZhciBtb3ZlVG8gPSAxMDAgLSBkaWZmRnJlcXVlbmN5O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtb3ZlVG8pO1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNsYXRlID0gXCJ0cmFuc2xhdGVYKFwiICsgbW92ZVRvICsgXCIlKVwiO1xyXG4gICAgICAgICAgICAkKFwiLnZpZGVvX192b2x1bWUtbGluZVwiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgdHJhbnNsYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVuZGVyRnJhbWUoKTtcclxuICAgICAgICBhdWRpb1NyYyA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYXVkaW9Db250ZXh0IGlzIG51bGwnKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBhdWRpb0FuYWx5emVyU2V0dXAobnVtLCBjb250ZXh0LCBjaGVja2VyLCBzcmMpIHtcclxuICAgIGlmIChjaGVja2VyW251bSAtIDFdID09IDApIHtcclxuICAgICAgICB2YXIgYXVkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlkZW8tJyArIG51bSk7XHJcbiAgICAgICAgaWYgKGF1ZGlvKSB7XHJcbiAgICAgICAgICAgIHNyY1tudW0gLSAxXSA9IGNvbnRleHQuY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKGF1ZGlvKTtcclxuICAgICAgICAgICAgYXVkaW9BbmFseXplcihudW0sIGNvbnRleHQsIHNyY1tudW0gLSAxXSk7XHJcbiAgICAgICAgICAgIGNoZWNrZXJbbnVtIC0gMV0gPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImF1ZGlvIGlzIGVtcHR5XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChzcmNbbnVtIC0gMV0pIHtcclxuICAgICAgICAgICAgYXVkaW9BbmFseXplcihudW0sIGNvbnRleHQsIHNyY1tudW0gLSAxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXVkaW8gc3JjIGlzIG51bGwnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5pdEF1ZGlvQW5hbHl6ZXIoKSB7XHJcbiAgICB2YXIgYXVkaW9Db250ZXh0ID0gbnVsbDtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy53aW5kb3cuQXVkaW9Db250ZXh0ID0gdGhpcy53aW5kb3cuQXVkaW9Db250ZXh0IHx8IHRoaXMud2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcclxuICAgICAgICBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGFsZXJ0KCdPcHBzLi4gWW91ciBicm93c2VyIGRvIG5vdCBzdXBwb3J0IGF1ZGlvIEFQSScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF1ZGlvQ29udGV4dDtcclxufVxyXG4vL1ZpZGVvIGZyb20gaHR0cHM6Ly9iaXRtb3Zpbi5jb20vbXBlZy1kYXNoLWhscy1leGFtcGxlcy1zYW1wbGUtc3RyZWFtcy9cclxuZnVuY3Rpb24gaW5pdFZpZGVvKHZpZGVvLCB1cmwpIHtcclxuICAgIGlmICghdmlkZW8pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh2aWRlbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2VtcHR5IHZpZGVvJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKEhscy5pc1N1cHBvcnRlZCgpKSB7XHJcbiAgICAgICAgdmFyIGhscyA9IG5ldyBIbHMoKTtcclxuICAgICAgICBobHMubG9hZFNvdXJjZSh1cmwpO1xyXG4gICAgICAgIGhscy5hdHRhY2hNZWRpYSh2aWRlbyk7XHJcbiAgICAgICAgaGxzLm9uKEhscy5FdmVudHMuTUFOSUZFU1RfUEFSU0VELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpKSB7XHJcbiAgICAgICAgdmlkZW8uc3JjID0gJ2h0dHBzOi8vdmlkZW8tZGV2LmdpdGh1Yi5pby9zdHJlYW1zL3gzNnhoenoveDM2eGh6ei5tM3U4JztcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbi8vIGludGVyZmFjZSBSZXN1bHRWYWx1ZSB7XHJcbi8vICAgICBjb250cmFzdD86IG51bWJlcjtcclxuLy8gICAgIGJyaWdodG5lc3M/OiBudW1iZXI7XHJcbi8vIH1cclxuZnVuY3Rpb24gaW5pdFZpZGVvRmlsdGVycygpIHtcclxuICAgIC8vIGxldCByZXN1bHQgOiBSZXN1bHRWYWx1ZTtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIHZhciBjb3VudCA9ICQoJy52aWRlb19faXRlbScpLmxlbmd0aDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIHJlc3VsdFtpXSA9IHt9O1xyXG4gICAgICAgIHJlc3VsdFtpXS5jb250cmFzdCA9IDE7XHJcbiAgICAgICAgcmVzdWx0W2ldLmJyaWdodG5lc3MgPSAxO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5pbml0VmlkZW8oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZGVvLTEnKSwgJ2h0dHBzOi8vYml0ZGFzaC1hLmFrYW1haWhkLm5ldC9jb250ZW50L01JMjAxMTA5MjEwMDg0XzEvbTN1OHMvZjA4ZTgwZGEtYmYxZC00ZTNkLTg4OTktZjBmNjE1NWY2ZWZhLm0zdTgnKTtcclxuaW5pdFZpZGVvKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWRlby0yJyksICdodHRwczovL2JpdGRhc2gtYS5ha2FtYWloZC5uZXQvY29udGVudC9zaW50ZWwvaGxzL3BsYXlsaXN0Lm0zdTgnKTtcclxuaW5pdFZpZGVvKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWRlby0zJyksICdodHRwczovL3d3dy5zdHJlYW1ib3guZnIvcGxheWxpc3RzL3Rlc3RfMDAxL3N0cmVhbS5tM3U4Jyk7XHJcbmluaXRWaWRlbyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlkZW8tNCcpLCAnaHR0cHM6Ly9tbm1lZGlhcy5hcGkudGVsZXF1ZWJlYy50di9tM3U4LzI5ODgwLm0zdTgnKTtcclxuLy9vcGVuZWQgdmlkZW9cclxudmFyIHZpZGVvTnVtID0gMTtcclxudmFyIHZpZGVvRmlsdGVycyA9IGluaXRWaWRlb0ZpbHRlcnMoKTtcclxudmFyIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKCkgfHwgbnVsbDtcclxuaWYgKHdpZHRoICYmIHdpZHRoID4gNDUwKSB7XHJcbiAgICB2aWRlb0FuaW1hdGlvbigpO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgc2V0VmlkZW9EZWZhdWx0Q3NzKCk7XHJcbn1cclxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAod2lkdGggJiYgd2lkdGggPiA0NTApIHtcclxuICAgICAgICB2aWRlb0FuaW1hdGlvbigpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc2V0VmlkZW9EZWZhdWx0Q3NzKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5mdW5jdGlvbiB2aWRlb0FuaW1hdGlvbigpIHtcclxuICAgIC8vY2hlY2sgaWYgYXVkaW8gYW5hbHl6ZXIgd2FzIGluaXRcclxuICAgIHZhciBhdWRpb0FuYWx5emVyQ2hlY2tlciA9IFswLCAwLCAwLCAwXTtcclxuICAgIHZhciBhdWRpb0NvbnRleHQgPSBhdWRpb0NvbnRleHQgfHwgaW5pdEF1ZGlvQW5hbHl6ZXIoKTtcclxuICAgIHZhciBhdWRpb1NyYyA9IHt9O1xyXG4gICAgJCgnLnZpZGVvX19pdGVtLTEnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnZpZGVvX19pdGVtLTEnKS5hZGRDbGFzcygnaC00MCB3LTEwMCcpO1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS0yJykuYWRkQ2xhc3MoJ2gtNDAgdy0wIG8tMCcpO1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS0zJykuYWRkQ2xhc3MoJ2gtMCBvLTAnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tNCcpLmFkZENsYXNzKCdoLTAgby0wJyk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19jb250cm9scycpLmFkZENsYXNzKCdvLTEnKTtcclxuICAgICAgICAkKFwiI3ZpZGVvLTFcIikucHJvcChcImNvbnRyb2xzXCIsIHRydWUpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmlkZW8tMlwiKS5wYXVzZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmlkZW8tM1wiKS5wYXVzZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmlkZW8tNFwiKS5wYXVzZSgpO1xyXG4gICAgICAgIHZpZGVvTnVtID0gMTtcclxuICAgICAgICB2aWRlb0NvbnRyb2xzQ2hhbmdlVmFsdWUodmlkZW9OdW0pO1xyXG4gICAgICAgIGF1ZGlvQW5hbHl6ZXJTZXR1cCh2aWRlb051bSwgYXVkaW9Db250ZXh0LCBhdWRpb0FuYWx5emVyQ2hlY2tlciwgYXVkaW9TcmMpO1xyXG4gICAgfSk7XHJcbiAgICAkKCcudmlkZW9fX2l0ZW0tMicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tMScpLmFkZENsYXNzKCdoLTQwIHctMCBvLTAnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tMicpLmFkZENsYXNzKCdoLTQwIHctMTAwJyk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19pdGVtLTMnKS5hZGRDbGFzcygnaC0wIG8tMCcpO1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS00JykuYWRkQ2xhc3MoJ2gtMCBvLTAnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2NvbnRyb2xzJykuYWRkQ2xhc3MoJ28tMScpO1xyXG4gICAgICAgICQoXCIjdmlkZW8tMlwiKS5wcm9wKFwiY29udHJvbHNcIiwgdHJ1ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2aWRlby0xXCIpLnBhdXNlKCk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2aWRlby0zXCIpLnBhdXNlKCk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2aWRlby00XCIpLnBhdXNlKCk7XHJcbiAgICAgICAgdmlkZW9OdW0gPSAyO1xyXG4gICAgICAgIHZpZGVvQ29udHJvbHNDaGFuZ2VWYWx1ZSh2aWRlb051bSk7XHJcbiAgICAgICAgYXVkaW9BbmFseXplclNldHVwKHZpZGVvTnVtLCBhdWRpb0NvbnRleHQsIGF1ZGlvQW5hbHl6ZXJDaGVja2VyLCBhdWRpb1NyYyk7XHJcbiAgICB9KTtcclxuICAgICQoJy52aWRlb19faXRlbS0zJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS0xJykuYWRkQ2xhc3MoJ2gtMCBvLTAnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tMicpLmFkZENsYXNzKCdoLTAgby0wJyk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19pdGVtLTMnKS5hZGRDbGFzcygndy0xMDAgaC00MCcpO1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS00JykuYWRkQ2xhc3MoJ3ctMCBoLTAgby0wJyk7XHJcbiAgICAgICAgJChcIiN2aWRlby0zXCIpLnByb3AoXCJjb250cm9sc1wiLCB0cnVlKTtcclxuICAgICAgICAkKCcudmlkZW9fX2NvbnRyb2xzJykuYWRkQ2xhc3MoJ28tMScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmlkZW8tMVwiKS5wYXVzZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmlkZW8tMlwiKS5wYXVzZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmlkZW8tNFwiKS5wYXVzZSgpO1xyXG4gICAgICAgIHZpZGVvTnVtID0gMztcclxuICAgICAgICB2aWRlb0NvbnRyb2xzQ2hhbmdlVmFsdWUodmlkZW9OdW0pO1xyXG4gICAgICAgIGF1ZGlvQW5hbHl6ZXJTZXR1cCh2aWRlb051bSwgYXVkaW9Db250ZXh0LCBhdWRpb0FuYWx5emVyQ2hlY2tlciwgYXVkaW9TcmMpO1xyXG4gICAgfSk7XHJcbiAgICAkKCcudmlkZW9fX2l0ZW0tNCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tMScpLmFkZENsYXNzKCdoLTAgby0wJyk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19pdGVtLTInKS5hZGRDbGFzcygnaC0wIG8tMCcpO1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS0zJykuYWRkQ2xhc3MoJ3ctMCBoLTAgby0wJyk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19pdGVtLTQnKS5hZGRDbGFzcygndy0xMDAgaC00MCcpO1xyXG4gICAgICAgICQoXCIjdmlkZW8tNFwiKS5wcm9wKFwiY29udHJvbHNcIiwgdHJ1ZSk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19jb250cm9scycpLmFkZENsYXNzKCdvLTEnKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ZpZGVvLTFcIikucGF1c2UoKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ZpZGVvLTJcIikucGF1c2UoKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ZpZGVvLTNcIikucGF1c2UoKTtcclxuICAgICAgICB2aWRlb051bSA9IDQ7XHJcbiAgICAgICAgdmlkZW9Db250cm9sc0NoYW5nZVZhbHVlKHZpZGVvTnVtKTtcclxuICAgICAgICBhdWRpb0FuYWx5emVyU2V0dXAodmlkZW9OdW0sIGF1ZGlvQ29udGV4dCwgYXVkaW9BbmFseXplckNoZWNrZXIsIGF1ZGlvU3JjKTtcclxuICAgIH0pO1xyXG4gICAgJCgnLnZpZGVvX19idXR0b24nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2V0VmlkZW9EZWZhdWx0Q3NzKCk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2aWRlby0xXCIpLnBsYXkoKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ZpZGVvLTJcIikucGxheSgpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmlkZW8tM1wiKS5wbGF5KCk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2aWRlby00XCIpLnBsYXkoKTtcclxuICAgICAgICAkKFwiI3ZpZGVvLTFcIikucHJvcChcImNvbnRyb2xzXCIsIGZhbHNlKTtcclxuICAgICAgICAkKFwiI3ZpZGVvLTFcIikucHJvcChcIm11dGVkXCIsIHRydWUpO1xyXG4gICAgICAgICQoXCIjdmlkZW8tMlwiKS5wcm9wKFwiY29udHJvbHNcIiwgZmFsc2UpO1xyXG4gICAgICAgICQoXCIjdmlkZW8tMlwiKS5wcm9wKFwibXV0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgJChcIiN2aWRlby0zXCIpLnByb3AoXCJjb250cm9sc1wiLCBmYWxzZSk7XHJcbiAgICAgICAgJChcIiN2aWRlby0zXCIpLnByb3AoXCJtdXRlZFwiLCB0cnVlKTtcclxuICAgICAgICAkKFwiI3ZpZGVvLTRcIikucHJvcChcImNvbnRyb2xzXCIsIGZhbHNlKTtcclxuICAgICAgICAkKFwiI3ZpZGVvLTRcIikucHJvcChcIm11dGVkXCIsIHRydWUpO1xyXG4gICAgICAgIHZpZGVvTnVtID0gbnVsbDtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIHNldFZpZGVvRGVmYXVsdENzcygpIHtcclxuICAgICQoJy52aWRlb19faXRlbS0xJykucmVtb3ZlQ2xhc3MoJ2gtMCB3LTAgby0wIGgtNDAgdy0xMDAnKTtcclxuICAgICQoJy52aWRlb19faXRlbS0yJykucmVtb3ZlQ2xhc3MoJ2gtMCB3LTAgby0wIGgtNDAgdy0xMDAnKTtcclxuICAgICQoJy52aWRlb19faXRlbS0zJykucmVtb3ZlQ2xhc3MoJ2gtMCB3LTAgby0wIGgtNDAgdy0xMDAnKTtcclxuICAgICQoJy52aWRlb19faXRlbS00JykucmVtb3ZlQ2xhc3MoJ2gtMCB3LTAgby0wIGgtNDAgdy0xMDAnKTtcclxuICAgICQoJy52aWRlb19fY29udHJvbHMnKS5yZW1vdmVDbGFzcygnby0xJyk7XHJcbn1cclxuLy9jaGFuZ2VkIHZhbHVlIG9mIHZpZGVvIGNvbnRyb2xzIGFmdGVyIG9wZW4gYW5vdGhlciB2aWRlb1xyXG5mdW5jdGlvbiB2aWRlb0NvbnRyb2xzQ2hhbmdlVmFsdWUobnVtKSB7XHJcbiAgICBpZiAodmlkZW9GaWx0ZXJzW251bSAtIDFdKSB7XHJcbiAgICAgICAgaWYgKHZpZGVvRmlsdGVyc1tudW0gLSAxXS5jb250cmFzdCB8fCB2aWRlb0ZpbHRlcnNbbnVtIC0gMV0uY29udHJhc3QgPT0gMCkge1xyXG4gICAgICAgICAgICAkKCcjdmlkZW9fX2NvbnRyYXN0JykudmFsKHZpZGVvRmlsdGVyc1tudW0gLSAxXS5jb250cmFzdCAqIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjdmlkZW9fX2NvbnRyYXN0JykudmFsKDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2aWRlb0ZpbHRlcnNbbnVtIC0gMV0uYnJpZ2h0bmVzcyB8fCB2aWRlb0ZpbHRlcnNbbnVtIC0gMV0uYnJpZ2h0bmVzcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICQoJyN2aWRlb19fYnJpZ2h0bmVzcycpLnZhbCh2aWRlb0ZpbHRlcnNbbnVtIC0gMV0uYnJpZ2h0bmVzcyAqIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjdmlkZW9fX2JyaWdodG5lc3MnKS52YWwoMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY2hhbmdlQ29udHJhc3QodmFsKSB7XHJcbiAgICBpZiAodmlkZW9OdW0pIHtcclxuICAgICAgICB2YXIgaXRlbUNsYXNzTmFtZSA9ICcudmlkZW9fX2l0ZW0tJyArIHZpZGVvTnVtO1xyXG4gICAgICAgIHZhciBjc3NDb250cmFjdCA9ICdjb250cmFzdCgnICsgdmFsIC8gMTAwICsgJyknO1xyXG4gICAgICAgICQoaXRlbUNsYXNzTmFtZSkuY3NzKCdmaWx0ZXInLCBjc3NDb250cmFjdCk7XHJcbiAgICAgICAgLy9zYXZlIGZpbHRlcnNcclxuICAgICAgICBpZiAoIXZpZGVvRmlsdGVycykge1xyXG4gICAgICAgICAgICB2aWRlb0ZpbHRlcnMgPSBpbml0VmlkZW9GaWx0ZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZpZGVvRmlsdGVyc1t2aWRlb051bSAtIDFdLmNvbnRyYXN0ID0gdmFsIC8gMTAwO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNoYW5nZUJyaWdodG5lc3ModmFsKSB7XHJcbiAgICBpZiAodmlkZW9OdW0pIHtcclxuICAgICAgICB2YXIgaXRlbUNsYXNzTmFtZSA9ICcudmlkZW9fX2l0ZW0tJyArIHZpZGVvTnVtO1xyXG4gICAgICAgIHZhciBjc3NCcmlnaHRuZXNzID0gJ2JyaWdodG5lc3MoJyArIHZhbCAvIDEwMCArICcpJztcclxuICAgICAgICAkKGl0ZW1DbGFzc05hbWUpLmNzcygnZmlsdGVyJywgY3NzQnJpZ2h0bmVzcyk7XHJcbiAgICAgICAgLy9zYXZlIGZpbHRlcnNcclxuICAgICAgICBpZiAoIXZpZGVvRmlsdGVycykge1xyXG4gICAgICAgICAgICB2aWRlb0ZpbHRlcnMgPSBpbml0VmlkZW9GaWx0ZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZpZGVvRmlsdGVyc1t2aWRlb051bSAtIDFdLmJyaWdodG5lc3MgPSB2YWwgLyAxMDA7XHJcbiAgICB9XHJcbn0iXX0=

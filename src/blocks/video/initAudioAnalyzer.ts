function initAudioAnalyzer(){
    var audioContext = null;
    try {
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        audioContext = new AudioContext();
    }
    catch(e) {
        alert('Opps.. Your browser do not support audio API');
    }
    return audioContext;
}
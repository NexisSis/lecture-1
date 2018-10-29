function initAudioAnalyzer(){
    var audioContext = null;
    try {
        this.window.AudioContext = this.window.AudioContext || this.window.webkitAudioContext!;
        audioContext = new AudioContext();
    }
    catch(e) {
        alert('Opps.. Your browser do not support audio API');
    }
    return audioContext;
}
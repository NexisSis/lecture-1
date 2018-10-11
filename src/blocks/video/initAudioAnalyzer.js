function initAudioAnalyzer(){
    window.addEventListener('load', function(){
        try {
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            return new AudioContext()
        }
        catch(e) {
            alert('Opps.. Your browser do not support audio API');
        }
    }, false);
}
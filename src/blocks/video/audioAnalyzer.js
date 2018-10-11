function audioAnalyzer(videoNum){
    var audio = document.getElementById('video-'+videoNum);
    var audioContext = initAudioAnalyzer();
    if(audioContext) {
        var audioSrc = audioContext.createMediaElementSource(audio);
        var analyser = audioContext.createAnalyser();

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
            var moveTo = parseInt(100-(frequencyData[0]/2.55));
            var translate = "translateX("+moveTo+"%)";
            $(".video__volume-line").css("transform",translate);
        }
        renderFrame();
    }else{
        console.log('audioContext is null');
    }
}
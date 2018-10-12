function audioAnalyzer(videoNum,audioContext,audioSrc){
    if(audioContext) {
        if(analyser == undefined){
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
            var moveTo = parseInt(100-(frequencyData[0]/2.55));
            var translate = "translateX("+moveTo+"%)";
            $(".video__volume-line").css("transform",translate);
        }
        renderFrame();
        audioSrc = null;
    }else{
        console.log('audioContext is null');
    }
}
function audioAnalyzerSetup(num,context,checker,src){
    if(checker[num-1] == 0){
        var audio = document.getElementById('video-'+num);
        src[num-1]  = context.createMediaElementSource(audio);
        audioAnalyzer(num,context,src[num-1]);
        checker[num-1] = num;
    }else{
        if(src[num-1]){
            audioAnalyzer(num,context,src[num-1]);
        }else{
            console.log('audio src is null');
        }
    }
}
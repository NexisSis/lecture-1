function audioAnalyzer(videoNum:number,audioContext:AudioContext ,audioSrc:MediaStreamAudioSourceNode){
    if(audioContext) {
        if(analyser == undefined){
            var analyser = audioContext.createAnalyser();
        }
        //make smaller count of sound for draw
        analyser.fftSize = 32;
        audioSrc.connect(analyser);
        let frequencyData = new Uint8Array(analyser.frequencyBinCount);
        audioSrc.connect(audioContext.destination);

        // loop
        function renderFrame() {
            requestAnimationFrame(renderFrame);

            // update data in frequencyData
            analyser.getByteFrequencyData(frequencyData);
            let diffFrequency : number = frequencyData[0]/2.55;

            //move sound line
            let moveTo = 100 - diffFrequency;
            console.log(moveTo);
            let translate = "translateX("+moveTo+"%)";
            $(".video__volume-line").css("transform",translate);
        }
        renderFrame();
        audioSrc = null;
    }else{
        console.log('audioContext is null');
    }
}
function audioAnalyzerSetup(num:number,context:AudioContext,checker:Array<number>,src:object){
    if(checker[num-1] == 0){
        let audio = document.querySelector<HTMLMediaElement>('#video-'+num);
        if(audio){
            src[num-1]  = context.createMediaElementSource(audio);
            audioAnalyzer(num,context,src[num-1]);
            checker[num-1] = num;
        }else {
            console.log("audio is empty");
        }
    }else{
        if(src[num-1]){
            audioAnalyzer(num,context,src[num-1]);
        }else{
            console.log('audio src is null');
        }
    }
}
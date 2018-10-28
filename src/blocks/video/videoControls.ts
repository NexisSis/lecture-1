//changed value of video controls after open another video
function videoControlsChangeValue(num){
    if(videoFilters[num-1]){
        if(videoFilters[num-1].contrast || videoFilters[num-1].contrast == 0 ){
            $('#video__contrast').val(videoFilters[num-1].contrast*100);
        }
        else{
            $('#video__contrast').val(100);
        }

        if(videoFilters[num-1].brightness || videoFilters[num-1].brightness == 0){
            $('#video__brightness').val(videoFilters[num-1].brightness*100);
        }
        else{
            $('#video__brightness').val(100);
        }
    }
}
function changeContrast(val){
    if(videoNum){
        var itemClassName = '.video__item-'+videoNum;
        var cssContract='contrast('+val/100+')';
        $(itemClassName).css('filter',cssContract);

        //save filters
        if(!videoFilters){
            videoFilters = initVideoFilters();
        }
        videoFilters[videoNum-1].contrast = val/100;

    }
}
function changeBrightness(val){
    if(videoNum){
        var itemClassName = '.video__item-'+videoNum;
        var cssBrightness='brightness('+val/100+')';
        $(itemClassName).css('filter',cssBrightness);

        //save filters
        if(!videoFilters){
            videoFilters = initVideoFilters();
        }
        videoFilters[videoNum-1].brightness = val/100;
    }
}
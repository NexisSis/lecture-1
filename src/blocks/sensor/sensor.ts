document.addEventListener("DOMContentLoaded", function(event) {

    const image = document.querySelector<HTMLScriptElement>('.image');
    //stackoverflow fix
    const parentNode =  <HTMLScriptElement>image.parentNode;
    // что б не таскалась картинка
    image.addEventListener('dragstart', (event) => {
        event.preventDefault()
    });


    const stateImg = {
        moveMin: -(image.offsetWidth - parentNode.offsetWidth),
        left: 0,
        moveMax: 0,
        zoomMin: 100,
        zoom: 100,
        zoomMax: 300
    };
    const pointerNow = {};


    let isMove = false;

    image.addEventListener('pointerdown', (event) => {
        pointerNow[event.pointerId] = event;
        isMove = true;
    });

    const calcDistance = (e1:PointerEvent, e2:PointerEvent) => {
        const {
            clientX: x1,
            clientY: y1
        } = e1;
        const {
            clientX: x2,
            clientY: y2
        } = e2;
        const distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        return distance;
    }

    const move = (val:number) => {
        const {
            moveMin,
            moveMax
        } = stateImg;
        stateImg.left += val;
        if (stateImg.left < moveMin) {

            stateImg.left = moveMin;

        } else if (stateImg.left > moveMax) {

            stateImg.left = moveMax;

        }
        image.style.left = stateImg.left + 'px';
        document.querySelector<HTMLElement>('.left').innerText = (-(Math.round(stateImg.left * 100) / 100)).toString();
    }

        image.addEventListener('pointermove', (e) => {
            const pointersCount = Object.keys(pointerNow).length;
            if (pointersCount === 1 && pointerNow[e.pointerId] && isMove) {
                // calc distance
                move(e.clientX - pointerNow[e.pointerId].clientX);
                pointerNow[e.pointerId] = e;

            } else if (pointersCount === 2) {
                pointerNow[e.pointerId] = e;
                let events : Array<PointerEvent> = Object.values(pointerNow);
                const distanceDifferent = calcDistance(events[0], events[1]) - stateImg.zoom;
                const {
                    zoomMin,
                    zoomMax
                } = stateImg;
                let zoom;
                if (distanceDifferent < 0) {
                    zoom = Math.max(stateImg.zoom + distanceDifferent, zoomMin);
                } else {
                    zoom = Math.min(stateImg.zoom + distanceDifferent, zoomMax);
                }
                stateImg.zoom = zoom;
                image.style.height = zoom + '%';
                document.querySelector<HTMLDivElement>('.zoom').innerText = (Math.round(zoom * 100) / 100).toString();
            }
        });


        image.addEventListener('pointerup', function (event) {
            delete pointerNow[event.pointerId];
            isMove = false;
        });
        image.addEventListener('pointerleave', function (event) {
            delete pointerNow[event.pointerId];
            isMove = false
        });

        // сделал после просмотра разбора
        const fakePointer = document.querySelector<HTMLDivElement>('.fake-pointer');
        image.addEventListener('dblclick', (event) => {
            if (pointerNow['fake']) {
                delete pointerNow['fake'];
                fakePointer.style.left = '0';
                fakePointer.style.top = '0';
                fakePointer.classList.remove('active');
            } else {
                pointerNow['fake'] = event;
                width = fakePointer.offsetWidth;
                fakePointer.classList.add('active');
                fakePointer.style.left = (stateImg.left + event.offsetX - width / 2).toString();
                fakePointer.style.top = (event.offsetY - width / 2).toString();
            }
        });

});
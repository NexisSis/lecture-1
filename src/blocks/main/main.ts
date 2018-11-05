import MyDispatcher from '../../flux/MyDispatcher';
function changePage(n : string){
    let dispatcher = new MyDispatcher();
    dispatcher.dispatch({
        eventName:'change-page',
        pageName:{ name: n}
    });
}
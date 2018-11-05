import MyDispatcher from 'MyDispatcher';
interface iPayload{
    pageName: string,
    eventName: string
}

const dispatcher = new MyDispatcher();

const MyStore = {
    events:{},
    currentPage: '',

    getCurrentPage: function () {
        return this.currentPage;
    },
    bind: function(e: string,callback: Function){
        this.events[e] = this.events[e] || {};
        this.events[e].push(callback);
    },
    trigger: function (e: string) {
        this.events[e] = this.events[e] || {};
        for(let i = 0; i < this._events[e].length; i++){
            this._events[e][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
}

dispatcher.register(function (payload: iPayload) {
   switch(payload.eventName){
       case 'change-page':
           MyStore.currentPage = payload.pageName;
           MyStore.trigger('change-page');
           break;
   }
});

const componentDidMount = function() {
    MyStore.bind( 'change-page', changePage );
}

const changePage = function () {
    const currentPageName = MyStore.currentPage;
    $('.index').removeClass('active');
    $('index__' + currentPageName).addClass('active');
}


function userClickEventChangePage(name : string){
    event.preventDefault();

    dispatcher.dispatch({
        eventName:'change-page',
        pageName:name
    });
}

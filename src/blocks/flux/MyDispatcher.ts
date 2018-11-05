export default class MyDispatcher{
    callbacks: Array<Function>;

    constructor(){
        this.callbacks = [];
    }

    dispatch(payload : object){
        for (let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i](payload);
        }
    }

    register(callback : Function){
        this.callbacks.push(callback);
    }
}
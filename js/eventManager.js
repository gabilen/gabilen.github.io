var EventManager = function () {
     this.initialize();
};
EventManager.prototype = {
    initialize: function() {
        this.listeners = {};
    },
    addListener: function(event, func, order) {
        if (!this.listeners[event]) {
            this.listeners[event] = {};
        }
        var maxCount = function (obj) {
            var max;
            for(var key in obj) {
                if(max == undefined){
                    max = key;
                }
                else if(max<key) {
                    max = key;
                }
            }
            return max || 0;
        };
        var order = order || maxCount(this.listeners[event]);
        if (func instanceof Function) {
            if(! this.listeners[event][order]){
                this.listeners[event][order] = [];
            }
            this.listeners[event][order].push(func);

        }
        return this;
    },
    fireListener: function(){

    },
    removeListener: function(){

    }
};

  var eventManager = new EventManager();
(function(){
    eventManager.addListener("fire",function () {
        console.log('good');
    },2);
    eventManager.addListener("fire",function () {
        console.log('green');
    },1);
     eventManager.addListener("fire",function () {
        console.log('blue');
    },1);
     eventManager.addListener("water",function () {
        console.log('bad');
    });
    console.log(eventManager.listeners);
}())
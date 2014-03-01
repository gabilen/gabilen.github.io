define([
    'config'
], function(CONFIG){
    return function Route(){
        /**
         *
         *@param {text} name NameRoute
         *
         */
        this.open = function(name){
            console.log(name);
            return this;
        };
    };
});
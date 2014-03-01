define([
    'route',
    'config'
], function(Route, CONFIG){
    return function(){
        console.log(CONFIG.CONSTANT.startText);
        var route = new Route();
        route.open('start');
    };
});
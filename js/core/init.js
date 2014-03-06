define([
    'core/route',
    'config',
    'core/logger'
], function(Route, CONFIG, Logger){
    return function(){
        Logger.log(CONFIG.get('CONSTANT.startText'));
        var route = new Route();
        route.open('start');
    };
});
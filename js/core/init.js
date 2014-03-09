define([
    'core/route',
    'startapp'
], function(Route, StartCtrl){
    return function(){        
        var start = new StartCtrl().init();
    };
});
define([
    'core/router',
    'startapp',
    'core/logger'
], function(Router, StartCtrl, Logger) {
    return function() {
        "use strict";
        
        var router = new Router();
        var start = new StartCtrl().init();
        
        router.when('/#test', function() {
            Logger.log('test One');
        });
        router.when('/#test2/:name/:id', function(name, id) {
            Logger.log('test Two');
        });
        router.when('/', function() {
            Logger.log('main');
        });
         router.when('404', function() {
            Logger.log('error');
        });
        router.start();
        
        router.remove('404');
        router.pause();
        window.location.hash = 'test';
    };
});
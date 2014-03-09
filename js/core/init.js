define([
    'core/router',
    'startapp',
    'core/logger'
], function(Router, StartCtrl, Logger){
    return function(){
        var router = new Router();
        router.when('/#test', function(){
            Logger.log('test One');
        });
        router.when('/#test2/:name/:id', function(name, id){
            Logger.log('test Two');
            Logger.log(name);
            Logger.log(id);
        });
        router.when('/', function(){
            Logger.log('main');
        });
         router.when('404', function(){
            Logger.log('error');
        });
        router.start();
        var start = new StartCtrl().init();

        window.location.hash = 'test';
    };
});
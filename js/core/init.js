define([
    'core/router',
    'config',
    'core/logger'
], function(Router, CONFIG, Logger){
    return function(){
        Logger.log(CONFIG.get('CONSTANT.startText'));
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

        window.location.hash = 'test';
    };
});
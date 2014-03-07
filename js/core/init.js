define([
    'core/router',
    'config',
    'core/logger'
], function(Router, CONFIG, Logger){
    return function(){
        Logger.log(CONFIG.get('CONSTANT.startText'));
        var router = new Router();
        //        Logger.log(router);
        //        Logger.log(router.routes);
        router.when('/#test', function(){
            Logger.log('test');
        });
        router.when('/#test2/:name/:id', function(name, id){
            Logger.log('test2');
            Logger.log(name);
            Logger.log(id);
        });
        router.when('/', function(){
            Logger.log('main');
        });
        router.init();
        //Logger.log(router.routes);
    };
});
define([
    'core/router',
    'config',
    'core/logger'
], function(Router, CONFIG, Logger){
    return function(){
        Logger.log(CONFIG.get('CONSTANT.startText'));
        var router = new Router();
        router.when('/#test', function(){
            Logger.log('testasdasdasdasdasd');
        });
        router.when('/#test2/:name/:id', function(name, id){
            Logger.log('test2asdasdsadadadad');
            //Logger.log(name);
            //Logger.log(id);
        });
        router.when('/', function(){
            Logger.log('mainasdasdasdasd');
        });
         router.when('404', function(){
            Logger.log('errorasdasdasdsad');
        });
        router.init();
        //router.nav('/#test');
    };
});
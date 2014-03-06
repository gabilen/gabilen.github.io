require([
    'js/configs/config.require'
], function(){
    require([
        'core/init',
        '_',
        'router'
    ], function(init, core, Router){
        "use strict";
        init();
        var router = new Router();
//        Logger.log(router);
//        Logger.log(router.routes);
        router.when('/#test', function(){
            Logger.log('test');
        });
        router.when('/', function(){
            Logger.log('main');
        });
        router.init();
        //Logger.log(router.routes);
    });
});
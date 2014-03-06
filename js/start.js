require([
    'js/configs/config.require'
], function(){
    require([
        'init',
        'core',
        'router'
    ], function(init, core, Router){
        "use strict";
        init();
        var router = new Router();
//        console.log(router);
//        console.log(router.routes);
        router.when('/#test', function(){
            console.log('test');
        });
        router.when('/', function(){
            console.log('main');
        });
        router.init();
        console.log(router.routes);
    });
});
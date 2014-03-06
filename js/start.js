require([
    'js/configs/config.require'
], function(){
    require([
        'core/init',
        '_',
        'router'
    ], function(init, _, router){
        "use strict";
        init();
        var router = router();
        router.when('/test', function(){
            console.log('test');
        });
        router.init();
    });
});
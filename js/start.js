require([
    'js/configs/config.require'
], function(){
    require([
        'init', 
        'core',
        'router'
    ], function(init,core,router){
        "use strict";
        init();
        var router = router();
        router.when('/test', function(){
            console.log('test');
        });
        router.init();
    });
});
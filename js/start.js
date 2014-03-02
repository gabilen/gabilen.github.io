require([
    'js/configs/config.require'
], function(){
    require([
        'init',
        'core',
    ],function(init,core){
        "use strict";
        init();
    });
});
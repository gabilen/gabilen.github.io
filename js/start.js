require([
    'js/configs/config.require'
], function(){
    require([
        'init',
        'eventManager'
    ],function(init,EventManager){
        init();
    });
});
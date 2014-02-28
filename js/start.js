require([
    'js/configs/config.require'
], function(){
    require([
        'config'
    ],function(CONFIG){
        console.log(CONFIG.startText);
    });
});
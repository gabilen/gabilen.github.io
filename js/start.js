require([
    'js/configs/config.require'
], function(){
    require([
        'init',
        'eventManager'
    ],function(init,EventManager){
        init();
        var event1 = new EventManager();
        event1.on("test",function(){console.log("Fuu4")},6);
        event1.on("test",function(){console.log("Fuu2")},4);
        event1.on("test",function(){console.log("Fuu1")},4);
        event1.on("test",function(){console.log("Fuu3")},3);
        event1.trigger("test");
        event1.off("test",function(){console.log("Fuu3")});
        
        console.log(event1.listeners);
    });
});
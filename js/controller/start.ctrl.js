define([
    'core/abstract.ctrl',
    'core/extend',
    'view/start.view'
], function(AbstractController, extend, StartView) {
    "use strict";
    return function StartCtrl() {
        extend(this, AbstractController);
        this.setView(StartView);
        
        this.init = function(){
            this.getView().appendTo(window.document.body);
            return this;
        };
    };
});
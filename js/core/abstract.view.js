define([
    'react'
    , 'eventManager'
], function(React, EventManager) {
    "use strict";
    return function AbstractView(View) {
        var view = React.createClass(View).apply({}, arguments);
        view.em = new EventManager();
        
        /**
         *@param {object} container
         */
        view.appendTo = function(container) {
//            this.em.trigger('before.appendto');            
            React.renderComponent(this, container);
//            this.em.trigger('after.appendto');
            return this;
        };
        return view;
    };
});
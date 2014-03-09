define([
    'core/abstract.view'
], function(View) {
    return function AbstractView() {
        this.view = null;

        /**
         *@param {object} View
         */
        this.setView = function(view) {
            this.view = View(view);
            return this;
        };

        this.getView = function() {
            return this.view;
        };
    };
});
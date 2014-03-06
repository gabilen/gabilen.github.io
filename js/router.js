/**
* Class Router
* Для Работы с роутингом
*/
define([
    'core'
], function (core) {
    "use strict";
    var Router = function () {
        this.routes = {};
    };
    Router.prototype = {
        /**
        *  
        *
        */
        when: function (url, callback) {
            this.routes.url = {};
            if(callback) {
                this.routes.url.callback = callback;
            }
        },
        /**
        *  
        *
        */
        init: function () {
            
        },
        /**
        *  
        *
        */
        nav: function (path) {
            
        }
    };
    return Router;
});
/**
* Class Router
* Для Работы с роутингом
*/
define([
    'core/core'
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
        when: function (url, template, callback) {
            this.routes.url = {};
            if(template) {
                this.routes.url.template = template;
            }
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
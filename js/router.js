/**
* Class Router
* Для Работы с роутингом
*/
define([
    '_',
	'core/logger'
], function (core, Logger) {
    "use strict";
    console.log(core);
    var Router = function () {
        this.routes = {};
    };
    Router.prototype = {
        /**
        *  
        *
        */
        when: function (url, callback) {
            this.routes[url] = {};
            if(callback) {
                this.routes[url].callback = callback;
            }
        },
        /**
        *  
        *
        */
        init: function () {
            var hash = location.hash || '/',
                args = [];
            Logger.log(this.routes);
//            this.routes.forEach(function triggerEvent (element, index, array) {
//               core.invoke(element.callback,args);
//            });
            //check location url
            //find route url
            //run callback function
        },
        /**
        *  
        *
        */
        nav: function (path) {
            //adapter
            //hash or historyApi
        }
    };
    return Router;
});
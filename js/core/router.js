/**
* Class Router
* Для Работы с роутингом
*/
define([
    'config',
    '_',
	'core/logger'
], function (CONFIG, core, Logger) {
    "use strict";
    //console.log(core);
    
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
        *   Запускает инициализацию маршрута
        *   по текущему url
        */
        init: function () {
            this._routes = [];
            var path = '/' + location.hash;
            
            for(var route in this.routes) {
                this._routes.push({
                    pattern: new RegExp('^'+route.replace(/:\w+/g, '(\\w+)').replace(/\//g, '\\/')+'$'),
                    callback: this.routes[route].callback
                });
            }
            
            var i = this._routes.length;          
            while(i--) {               
                var args = path.match(this._routes[i].pattern);
                if(args){
                    core.invoke(this._routes[i].callback, args.slice(1));
                }
            }
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
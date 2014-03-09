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
    
    var Router = function () {
        this.routes = {};
    };
    Router.prototype = {
        /**
        * Добавление пути и функции обратного вызова
        * @param {string} url путь роутинга
        * @param {function} callback Функция обратного вызова
        */
        when: function (url, callback) {
            this.routes[url] = {};
            if(callback) {
                this.routes[url].callback = callback;
            }
        },
        /**
        * инициирует роутер
        * вызывает обработчик текущего url
        */
        init: function () {
            this._routes = [];
            for(var route in this.routes) {
                this._routes.push({
                    pattern: new RegExp('^'+route.replace(/:\w+/g, '(\\w+)').replace(/\//g, '\\/')+'$'),
                    callback: this.routes[route].callback
                });
            }
            this.nav('/' + location.hash);
        },
        /**
        * вызывает обработчик указанного пути
        * @param {string} path путь роутинга
        * @return {bool} возвращает результат навигации
        */
        nav: function (path) {
            location.hash = path.replace(/^\/#/, '');
            var i = this._routes.length;
            var found = false;
            
            while(i--) {
                var args = path.match(this._routes[i].pattern);
                if(args){
                    found = true;
                    core.invoke.apply(this,[].concat(this._routes[i].callback, args.slice(1)));
                }
            }
            
            if(!found){
                core.invoke(this.routes['404'].callback);
            }
            return found;
        }
    };
    return Router;
});
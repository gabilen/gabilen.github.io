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
        this._routes = [];
    };
     
    /**
    * Добавление пути и функции обратного вызова
    * @param {string} url путь роутинга
    * @param {function} callback Функция обратного вызова
    */
    Router.prototype.when = function (url, callback) {
        if( typeof url === 'string' && typeof callback === 'function') {
            this.routes[url] = {};
            this.routes[url].callback = callback;
            this._routes.push({
                pattern: new RegExp('^'+url.replace(/:\w+/g, '(\\w+)').replace(/\//g, '\\/')+'$'),
                callback: this.routes[url].callback
            });
        }
        return this;
    };
    /**
    * инициирует роутер
    * вызывает обработчик текущего url
    * вешает обработчик на смену хеша
    */
    Router.prototype.start = function () {
        window.addEventListener("hashchange", this.checkState.bind(this), false);
        this.checkState();
        return this;
    };
    /**
    * вызывает обработчик при смене хеша
    * @return {bool} возвращает результат навигации
    */
    Router.prototype.checkState = function () {
        var path = '/' + location.hash;
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
    };
    
    return Router;
});
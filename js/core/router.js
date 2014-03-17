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
        this._routes = [];
        this._on = false;
    };
    /**
    * Возвращает хеш урла
    * написана для удобного юнит-тестирования
    * @return {string} возвращает хеш урла
    */
    Router.prototype.getHash = function () {
      return window.location.hash;
    };    
    /**
    * Добавление пути и функции обратного вызова
    * @param {string} url путь роутинга
    * @param {function} callback Функция обратного вызова
    */
    Router.prototype.when = function (url, callback) {
        var isCallback = Array.isArray(callback)
            && ((callback[0] === null) || typeof(callback[0]) === "object")
            && callback[1] instanceof Function;
        
		var valid = typeof url === 'string' && ((typeof callback === 'function') || isCallback);
        if (valid) {
            this._routes.push({
                url: url,
                pattern: new RegExp('^'+url.replace(/:\w+/g, '(\\w+)').replace(/\//g, '\\/')+'$'),
                callback: callback
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
        if (this._on) {
            return this;
        }
        if (!this.listener) {
            this.listener = this.checkState.bind(this);
        }
        
        window.addEventListener("hashchange", this.listener, false);
        this._on = true;
        this.checkState();
        
        return this;
    };
    /**
    * вызывает обработчик при смене хеша
    * @return {bool} возвращает результат навигации
    */
    Router.prototype.checkState = function () {
        var path = '/' + this.getHash();
        var i = this._routes.length;
        var found = false;

        while (i--) {
            var args = path.match(this._routes[i].pattern);
            if (args) {
                var func = this._routes[i].callback;
                var funcArgs = args.slice(1);
                return core.invoke.apply(this,[].concat(func, funcArgs));
            }
        }

        if (!found) {
            if (this._routes['404']) {
                core.invoke(this.routes['404'].callback);
            }
        }
        return found;
    };
    /**
    * Удаляет маршрут из карты вместе с обработчиком 
    * @param {string} url путь роутинга
    * @return {bool} возвращает неуспешное удаление маршрута
    * @return {number} возвращает номер удаленного маршрута
    */
    Router.prototype.remove = function (url) {
        var found = false;
        if (typeof url !== 'string') {
            return found;
        }
        
        this._routes.forEach(function (element, index, array) {
            if (element.url === url) {
                found = index;
            }
        });
        if (found !== false) {
            this._routes.splice(found, 1);
        }
        return found;
    };
    /**
    * Приостанавливает работу роутера 
    */
    Router.prototype.stop = function () {
        if (!this._on) {
            return this;
        }
        window.removeEventListener("hashchange", this.listener, false);
        this._on = false;
        
        return this;
    };

    return Router;
});
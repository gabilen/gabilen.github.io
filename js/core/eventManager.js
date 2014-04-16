/**
 * Class EventManager
 * Для управления событиями, ихним порядков выполнения
 * вызов событий и удаления событий или обработчика
 */
define([
    '_'
], function (core) {
    "use strict";
    
    var EventManager = function () {
        this.listeners = {};
    };
    
    /**
     * Добавить обработчик
     * @param {string} event имя обработчика
     * @param {function} callback имя функции обратного вызова
     * @return возвращает саму себя
     */
    EventManager.prototype.on = function (event, callback) {
        if (!this.listeners.hasOwnProperty(event)) {
            this.listeners[event] = [];
        }
        
        var isCallback = Array.isArray(callback)
            && ((callback[0] === null) || typeof(callback[0]) === "object")
            && callback[1] instanceof Function;
        
        if (callback instanceof Function || isCallback) {
            this.listeners[event].push(callback);
        }

        return this;
    };
    /**
     * Триггер
     * @param {string} event Имя вызываемого события
     * @param {arguments} args перечень аргументов в функцию обратного вызова
     */
    EventManager.prototype.trigger = function (event, args) {
        this.listeners[event].forEach(function triggerEvent (element, index, array) {
            core.invoke(element,args);
        });
    };
    /**
     * Удаление обработчика
     * Если указанна функция обратного вызова,
     * она удаляеться из события
     * иначе удаляеться событие
     * @param {string} event Имя удаляеммого события
     * @param {string} callback Имя удаляеммой функции из события
     */
    EventManager.prototype.off = function (event, callback) {
        if (!this.listeners.hasOwnProperty(event)) {
            return this;
        }
        if (!callback) {
            delete this.listeners[event];
        } else {
            var self = this;
            var id = null;
            this.listeners[event].forEach(function offEvent (element, index, array) {
                if (element.toString() === callback.toString()) {
                    id = index;
                }
            });
            if (id) {
                self.listeners[event].splice(id, 1);
            }
        }
    };
    
    return EventManager;
});

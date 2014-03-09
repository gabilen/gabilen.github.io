/**
 * Class EventManager
 * Для управления событиями, ихним порядков выполнения
 * вызов событий и удаления событий или обработчика
 */
define([
    '_',
    'core/logger'
], function (core, Logger) {
    "use strict";
    var EventManager = function () {
        this.listeners = {};
    };
    EventManager.prototype = {
        /**
         * Добавить обработчик
         * @param {string} event имя обработчика
         * @param {function} callback имя функции обратного вызова
         * @return возвращает саму себя
         */
        on: function (event, callback) {
            if (!this.listeners.hasOwnProperty(event)) {
                this.listeners[event] = [];
            }
            if (callback instanceof Function) {
                this.listeners[event].push(callback);
            }
            return this;
        },
        /**
         * Триггер
         * @param {string} event Имя вызываемого события
         * @param {arguments} args перечень аргументов в функцию обратного вызова
         */
        trigger: function (event, args) {
            this.listeners[event].forEach(function triggerEvent (element, index, array) {
                core.invoke(element,args);
            });
        },
        /**
         * Удаление обработчика
         * Если указанна функция обратного вызова,
         * она удаляеться из события
         * иначе удаляеться событие
         * @param {string} event Имя удаляеммого события
         * @param {string} event Имя удаляеммой функции из события
         */
        off: function (event, callback) {
            if (this.listeners.hasOwnProperty(event)) {
                if(!callback) {
                    delete this.listeners[event];
                }else{
                    var self = this;
                    var id = null;
                    this.listeners[event].forEach(function offEvent (element, index, array) {
                        if(element.toString() === callback.toString()) {
                            id = index;
                        }
                    });
                    if(id) {
                        self.listeners[event].splice(id, 1);
                    }
                }
            }
        }
    };
    return EventManager;
});
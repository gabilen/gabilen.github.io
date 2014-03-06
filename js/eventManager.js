/**
 * Class EventManager
 * to add events with order to initialize them,
 * trigger events
 * and delete events
 */
define([
    'core'
], function (core) {
    "use strict";
    var EventManager = function () {
        this.listeners = {};
    };
    EventManager.prototype = {
        /**
         * Add new listener
         * @param {string} event event name
         * @param {function} func function to run when fire an event
         * @return return itself
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
         * trigger listener
         * @param {string} event name to run event
         */
        trigger: function (event, args) {
            this.listeners[event].forEach(function triggerEvent (element, index, array) {
                core.invoke(element,args);
            });
        },
        /**
         * Delete listener
         * @param {string} event name to delete event
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
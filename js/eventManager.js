/**
 * Class EventManager
 * to add events with order to initialize them,
 * trigger events
 * and delete events
 */
define([
    'core/core'
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
         * @param {number} order order of event to run (optional)
         * @return return itself
         */
        on: function (event, callback, order) {
            if (!this.listeners.hasOwnProperty(event)) {
                this.listeners[event] = [];
            }
            order = order || this.listeners[event].length;

            if (callback instanceof Function) {
                if (!this.listeners[event][order]) {
                    this.listeners[event][order] = [];
                }
                this.listeners[event][order].push(callback);

            }
            return this;
        },
        /**
         * trigger listener
         * @param {string} event name to run event
         */
        trigger: function (event, args) {
            this.listeners[event].forEach(function (element, index, array) {
                element.forEach(function (elem, ind, arr) {
                    core.invoke(elem);
                })
            })
        },
        /**
         * Delete listener
         * @param {string} event name to delete event
         */
        off: function (event, callback) {
            if (this.listeners.hasOwnProperty(event)) {
                console.log(event);
                console.log(callback);
                if(!callback) {
                    delete this.listeners[event];
                }
//                don't work help)
                else {
                    this.listeners[event].forEach(function (element, index, array) {
                        element.forEach(function (elem, ind, arr) {
                            console.log(elem);
                            console.log(elem === callback);
                            if(elem == callback) {
                                elem.splice(elem, 1);
                            }
                        })
                    })
                }
            }
        }
    };
    return EventManager;
});
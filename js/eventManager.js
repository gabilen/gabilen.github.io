/**
 * Class EventManager
 * to add events with order to initialize them,
 * trigger events
 * and delete events
 */
define([
    'core/core'
], function (core) {
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
        on: function (event, func, order) {
            if (!this.listeners[event]) {
                this.listeners[event] = {};
            }
            /**
             * Max order of event
             * @param {obj} obj object to parse
             * @return max order count of event
             */
            var maxOrder = function (obj) {
                var max,
                    key;
                for (key in obj) {
                    if (max === undefined) {
                        max = key;
                    } else if (max < key) {
                        max = key;
                    }
                }
                return parseInt(max) || 0;
            };
            order = order || maxOrder(this.listeners[event]) + 1;
            if (func instanceof Function) {
                if (!this.listeners[event][order]) {
                    this.listeners[event][order] = [];
                }
                this.listeners[event][order].push(func);

            }
            return this;
        },
        /**
         * trigger listener
         * @param {string} event name to run event
         */
        trigger: function (event) {
            var order;
            for (order in this.listeners[event]) {
                var func;
                for (func in this.listeners[event][order]) {
                    core.invoke(this.listeners[event][order][func]);
                }
            }
        },
        /**
         * Delete listener
         * @param {string} event name to delete event
         */
        off: function (event) {
            if (this.listeners[event]) {
                delete this.listeners[event];
            }
        }
    };
});
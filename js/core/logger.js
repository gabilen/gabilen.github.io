define(['config'], function (config) {
    'use strict';
    return {
        namespace: new function(){
            var namespaces = [];
            var hideAll = false;

            this.isShow = function (namespace) {
                if (namespace) {
                    if (hideAll) {
                        return false;
                    }
                    if (0 !== namespaces.length) {
                        if (-1 == namespaces.indexOf(namespace)) {
                            return false;
                        }
                    }
                }
                return true;
            };

            this.showAll = function () {
                hideAll = false;
                namespaces = [];
            };

            this.showOnly = function () {
                hideAll = false;
                for (var i = 0; i < arguments.length; i++) {
                    if (-1 === namespaces.indexOf(arguments[i])) {
                        namespaces.push(arguments[i]);
                    }
                }
            };

            this.hideAll = function () {
                hideAll = true;
            };
        },

        write: function (text, color, namespace) {
            if (config.get('debug') && window.console) {
                if (!this.namespace.isShow(namespace)) {
                    return;
                }
                if (namespace) {
                    text = namespace + ': ' + text;
                }
                var args = [text];
                if (color) {
                    args = ['%c ' + text, color];
                }
                console.log.apply(console, args);
            }
        },

        log: function (log, namespace) {
            return this.write(log, null, namespace);
        },

        notice: function (log, namespace) {
            return this.write(log, 'color: #0074c9; font-weight: bold', namespace);
        },

        warning: function (log, namespace) {
            return this.write(log, 'color: #e67e22; font-weight: bold', namespace);
        },

        success: function (log, namespace) {
            return this.write(log, 'color: #27ae60; font-weight: bold', namespace);
        },

        error: function (log, namespace) {
            return this.write(log, 'color: #d83343; font-weight: bold', namespace);
        },

        alert: function (log, namespace) {
            return this.write(log, 'color: #8e44ad; font-weight: bold', namespace);
        }
    };
});
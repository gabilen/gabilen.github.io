define([
    '_'
], function(_) {
    return new function IntervalService() {
        this.streams = [];
        this.countStream = 20;
        
        (function init(context) {
            for (var i = 0 ; i < context.countStream; i++) {
                context.streams.push({
                    id: i,
                    busy: false,
                    callback: null,
                    time: 0,
                    intervalFunc: null,
                    run: false,
                    idStream: 0,                    
                    start: function() {
                        if (this.run) {
                            return this;
                        }
                        this.run = true;
                        
                        this.intervalFunc = function() {
                            if (!this.run) {
                                return;
                            }
                            _.invoke(this.callback);
                            this.idStream = window.setTimeout(this.intervalFunc, this.time);
                        }.bind(this);
                        
                        this.intervalFunc();
                        return this;
                    },
                    stop: function() {
                        if (!this.run) {
                            return this;
                        }
                        this.run = false;
                        window.clearTimeout(this.idStream);
                        return this;
                    },
                    clear: function() {
                        this.run = false;
                        this.busy = false;
                        this.callback = null;
                        this.time = 0;
                        this.intervalFunc = null;
                        if (this.idStream) {
                            window.clearTimeout(this.idStream);
                            this.idStream = 0;
                        }
                        return this;
                    },
                    init: function(object) {
                        this.busy = true;
                        this.time = object.time;
                        this.callback = object.callback;
                        if (!this.time || !this.callback) {
                            this.clear();
                            return null;
                        }
                        return this.id;
                    }
                });
            }            
        })(this);
        
        /**
         *@param {function} callback
         *@param {number} time
         */
        this.addStream = function(callback, time) {
           for (var i = 0 ; i < this.countStream; i++) {
               if (!this.streams[i].busy) {
                    return this.streams[i].init({
                        callback: callback,
                        time: time
                    });                   
               }               
           }
           return false;
        };
        
        /**
         *@param {number} id
         */
        this.startStream = function(id) {
            if (!this.streams[id]) {
                return false;
            }
            this.streams[id].start();
            return true;
        };
        
         /**
         *@param {number} id
         */
        this.stopStream = function(id) {
            if (!this.streams[id]) {
                return false;
            }
            this.streams[id].stop();
            return true;
        };
        
        /**
         *@param {number} id
         */
        this.clearStream = function(id) {
            if (!this.streams[id]) {
                return false;
            }
            this.streams[id].clear();
            return true;
        };
    };
});
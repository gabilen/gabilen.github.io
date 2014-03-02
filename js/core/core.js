define([], function () {
    "use strict";
    return new function () {
        if (!Array.prototype.forEach) {
          Array.prototype.forEach = function(fun /*, thisArg */){
            "use strict";

            if (this === void 0 || this === null)
              throw new TypeError();

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function")
              throw new TypeError();

            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
              if (i in t)
                fun.call(thisArg, t[i], i, t);
            }
          };
        }
        /**
         * run function and set params
         * @param {function} {array} callback function to run, or array with context function and arguments
         */
        this.invoke = function (callback) {
            if (!callback) {
                return this;
            }
            callback instanceof Array 
                ? callback[1].apply(callback[0], Array.prototype.slice.call(arguments, 1)) 
                : callback.apply(this, Array.prototype.slice.call(arguments, 1));
            return this;
        };
    };
});
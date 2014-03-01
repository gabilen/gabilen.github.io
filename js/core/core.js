define([], function () {
    return function core() {
        /**
         * run function and set params
         * @param {function} {array}  function to run, or array with context function and arguments
         */
        this.invoke = function (func) {
            if (!func) {
                return this;
            }
            func instanceof Array 
                ? func[1].apply(func[0], Array.prototype.slice.call(arguments, 1)) 
                : func.apply(this, Array.prototype.slice.call(arguments, 1));
            return this;
        };
    };
});
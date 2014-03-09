define([],function() {
        return function() {
            var obj = arguments[0];
            for (var i = 1, ln = arguments.length; i < ln; i++) {                
                arguments[i].call(obj);
            }
            return obj;
        };
    }
);
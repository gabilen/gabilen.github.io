define(function() {
    var defaults = {
        debug: true,
        CONSTANT: {
            startText: 'Hello World'
        }
    };

    /**
     * Функция get().
     * Возвращает значение из конфига.
     * Аргумент: paramName.paramName.paramName
     * Пример:
     * get('CONSTANT.startText'); Вернет: 'Hello World'
     */
    return {
        get: function (name) {
            if (name) {
                name = name.split('.');
                var value = defaults[name[0]];
                for (var i = 1; i < name.length; i++) {
                    if (value[name[i]]) {
                        value = value[name[i]]
                    } else {
                        return null;
                    }
                }
                return value;
            }
            return null;
        }
    };
});
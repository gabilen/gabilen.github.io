require.config({
    paths: {
        'chai': '../node_modules/chai/chai',
        'mocha': '../node_modules/mocha/mocha',
        'sinon': '../node_modules/sinon/pkg/sinon',
        'app_require_config': '../js/configs/config.require',
        'spec_require_config': 'spec_require_config',
        'tests_list': 'tests.list',
        'tests': '../tests'
    },
    shim: {
        'mocha': {
            deps: ['chai'],
            exports: 'mocha'
        },
        'sinon': {
            exports: 'sinon'
        }
    }
});
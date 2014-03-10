require(['spec_require_config'], function() {
    require([
        'mocha',
		'tests_list'
    ],function(mocha, TestsList) {
        mocha.setup('bdd');
        mocha.checkLeaks();
        require(['app_require_config'], function onLoad() {
            require.config({
                baseUrl: '../js'
            });
            require(TestsList, function(){
                mocha.run();
            });
        });
    });
});
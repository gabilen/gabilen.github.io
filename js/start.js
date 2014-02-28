require.config({
    baseUrl: 'js/',
    paths: {
        "config": "config"
    },
});

require([
    'config'
], function(CONFIG) {
        console.log(CONFIG.startText);
});
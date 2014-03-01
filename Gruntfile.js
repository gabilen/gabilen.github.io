module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            files: [
                './*'
                , './Gruntfile.js'
                , './content/css/less'
            ],
            tasks: ['less']
        },
        less: {
            development: {
                files: {
                    './content/css/layout.css': './content/css/less/layout.less'
                }
            },
            production: {
                options: {
                    cleancss: true
                },
                files: {
                    './content/css/layout.min.css': './content/css/less/layout.less'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['less']);
};
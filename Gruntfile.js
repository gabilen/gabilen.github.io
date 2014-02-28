module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            files: [
                './*'
                , './Gruntfile.js'
            ],
            tasks: ['tratata1', 'tratata2']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('tratata1', 'Task Tratata1', function(){
        console.log('tratata1');
    });

    grunt.registerTask('tratata2', 'Task Tratata2', function(){
        console.log('tratata2');
    });

    grunt.registerTask('dev-build', 'Task dev-build', function(){
        console.log('dev-build');
    });

    grunt.registerTask('default', ['tratata1', 'tratata2']);
};
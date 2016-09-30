'use strict';

module.exports = function (grunt) {
    // Show elapsed time after tasks run
    require('time-grunt')(grunt);
    // Load all Grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jsdoc : {
            dist : {
                src: ["api/**/*.js", "README.md"],
                options: {
                    destination: ".doc",
                    //template : "node_modules/ink-docstrap/template",
                    template : "node_modules/docdash",
                    //template : "node_modules/minami",
                    configure : "jsdoc-conf.json"
                }
            }
        }
    });

    grunt.registerTask('doc', [
        'jsdoc'
    ]);

};

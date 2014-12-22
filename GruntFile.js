
'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: ['tasks/*.js', 'test/*.js'],
      options: {
          boss: true,
          camelcase: true,
          curly: true,
          eqeqeq: true,
          eqnull: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          node: true,
          strict: true,
          sub: true,
          undef: true,
          unused: true
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    periodic: {
        build: {
          when: 'build',
          tasks: ['']
        },
        hourly: {
          when: 'hourly',
          tasks: ['']
        },
        dayly: {
          when: 'dayly',
          tasks: ['']
        },
        weekly: {
          when: 'weekly',
          tasks: ['']
        },
        monthly: {
          when: 'monthly',
          tasks: ['']
        }, 
        yearly: {
          when: 'yearly',
          tasks: ['']
        },                                               
        checkout: {
          when: 'checkout',
          tasks: ['']
        }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['jshint', 'clean', 'periodic', 'nodeunit']);

  grunt.registerTask('default', ['test']);

};
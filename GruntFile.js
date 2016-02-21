
'use strict';

var sinon = require('sinon');


module.exports = function(grunt) {

  var clock;

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
      tests: ['.grunt', 'temp']
    },

    // Configuration to be run (and then tested).
    periodic: {
      build: {
        when: 'build',
        tasks: ['TestTask:build']
      },
      hourly: {
        when: 'hourly',
        tasks: ['TestTask:hourly']
      },
      daily: {
        when: 'daily',
        tasks: ['TestTask:daily']
      },
      weekly: {
        when: 'weekly',
        tasks: ['TestTask:weekly']
      },
      weeklyNotFirst: {
        when: 'weekly',
        tasks: ['TestTask:weeklyNotFirst'],
        options: {
          runFirstTime: false
        }
      },      
      monthly: {
        when: 'monthly',
        tasks: ['TestTask:monthly']
      }, 
      yearly: {
        when: 'yearly',
        tasks: ['TestTask:yearly']
      },                                               
      checkout: {
        when: 'checkout',
        tasks: ['TestTask:checkout']
      },
      newer: {
        when: 'newer',
        files: [{
          expand: true,
          src: [ './temp/*.txt' ],
        }],
        tasks: ['TestTask:newer']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/periodic-test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // run period tasks twice to test results
  grunt.registerTask('test', [
    'jshint',
    'clean',
    
    'periodic',
    'periodic',
    
    'FakeDate:61',
    'periodic',

    'FakeDate:1441',
    'periodic',

    'FakeDate:10081',
    'periodic',

    'FakeDate:46080',
    'periodic',

    'FakeDate:552960',
    'periodic',

    'ModFile',
    'periodic',

    'ModFile',
    'periodic',

    'periodic',

    'FakeDate', // Restore clock
    'nodeunit'
  ]);

  grunt.registerTask('default', ['test']);



  // Test Support

  grunt.registerTask('TestTask', 'Test Task', function(target) {

    var count = 1;
    var path = './temp/' + target;

    if (grunt.file.exists(path))
    {
      count = grunt.file.read(path);
      count++;
    }

    grunt.log.writeln('Test Task count: ' + count);

    grunt.file.write(path, count);

  });


  grunt.registerTask('FakeDate', 'Fake Date', function(minutes) {

    if (clock)
    {
      clock.restore();
    }

    if (!minutes)
    {
      return;
    }

    clock = sinon.useFakeTimers(new Date().getTime() + minutes*60000 );

    grunt.log.writeln('Fake Date: ' + new Date().toISOString());

  });


  grunt.registerTask('ModFile', 'Modifiy a File', function() {

    var filename = 'afile.txt';

    grunt.file.write('./temp/' + filename, new Date().toISOString());

    grunt.log.writeln('Modified File: ' + filename);

  });

};
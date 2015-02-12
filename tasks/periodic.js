'use strict';

var moment = require('moment'),
    fs = require('fs'),
    taskDataFolder = './.grunt/grunt-periodic/',
    mesurements = {
    'build': 'milliseconds',
    'hourly': 'hours',
    'daily': 'days',
    'weekly': 'weeks',
    'monthly': 'months',
    'yearly': 'years'
};

module.exports = function register ( grunt ) {
  var readLastRun = function ( target ) {
        var path = taskDataFolder + target;

        if ( grunt.file.exists(path) ) {
          return grunt.file.read( path );
        } else {
          return null;
        }
      },
      checkOutsidePeriod = function ( lastRun, when ) {
        if ( when === 'checkout' ) {
          return false;
        }

        var diff = moment().diff( moment( lastRun ), getMeasurement( when ) );

        return ( diff !== 0 );
      },
      runTasks = function ( tasks ) {
        grunt.log.writeln( 'Running tasks: ' + tasks.toString() );
        grunt.task.run(tasks);
      },
      saveLastRun = function ( target, lastRun ) {
        if ( lastRun === undefined || lastRun === null ) {
          lastRun = new Date();
        }
        grunt.file.write( taskDataFolder + target, lastRun.toISOString() );
      },
      getMeasurement = function ( when ) {
        return mesurements[when];
      },
      checkFilesPeriod = function ( files ) {
        var ret = false;

        files
        .forEach( function (availableFiles){

          availableFiles
          .src
          .forEach( function (file){
            var fileStat = fs.statSync( file ),
                mTime = fileStat.mtime.toISOString(),
                lastRun = moment( readLastRun( file ) ),
                diff = ( lastRun ? moment().diff( lastRun, mTime ) : 1 );

            if ( diff !== 0 ) {
              ret = true;
              saveLastRun( file, lastRun );
            }
          });

        });

        return ret;
      };

  grunt.registerMultiTask('periodic', 'Task to run other tasks once a given time period', function periodic () {
      var when = this.data.when,
          tasks = ( !Array.isArray( this.data.tasks ) ? [ this.data.tasks ] : this.data.tasks ),
          files = this.files,
          options = this.options({
            runFirstTime: true
          }),
          lastRun = readLastRun( this.target );

      if ( !when ) {
        grunt.fail.fatal( 'periodic property "when" is required' );
      } else if ( when !== 'newer' && when !== 'checkout' && !mesurements.hasOwnProperty(when) ) {
        grunt.fail.fatal( when + ' is not a valid value for periodic property "when"' );
      }

      if ( tasks.length === 0 ) {
        grunt.fail.fatal( 'No tasks specified in periodic property "tasks"' );
      }

      if (lastRun) {
        grunt.log.writeln( 'Last ran ' + moment( lastRun ).fromNow() );
      } else {
        grunt.log.writeln( 'No last run time found' );
      }
      
      if ( when === 'newer' ) {
        if ( checkFilesPeriod( files ) ) {
          runTasks(tasks);
        }
      } else if ( !lastRun || checkOutsidePeriod( lastRun, when ) ) {
        if ( lastRun || options.runFirstTime ) {
          runTasks(tasks);
        }

        saveLastRun(this.target);
      } else {
        grunt.log.writeln( 'Period [' + when + '] not reached, skipping tasks: ' + tasks.toString() );  
      }
  });
};

'use strict';

var moment = require('moment');

var taskDataFolder = './.grunt/grunt-periodic/';

var mesurements = {
    'build': 'milliseconds',
    'hourly': 'hours',
    'daily': 'days',
    'weekly': 'weeks',
    'monthly': 'months',
    'yearly': 'years'
};


module.exports = function register(grunt)
{
    grunt.registerMultiTask('periodic', 'Task to run other tasks once a given time period', function periodic(){
        
        var when = this.data.when;
        var tasks = this.data.tasks;
        
        if (!Array.isArray(tasks))
        {
            tasks = [tasks];
        }
        

        if (!when)
        {
            grunt.fail.fatal('periodic property "when" is required');
        }
        else if (when !== 'checkout' && !mesurements.hasOwnProperty(when))
        {
            grunt.fail.fatal(when + ' is not a valid value for periodic property "when"');
        }


        if (tasks.length === 0)
        {
            grunt.fail.fatal('No tasks specified in periodic property "tasks"');
        }


        var lastRun = readLastRun(this.target);

        if (lastRun)
        {
            grunt.log.writeln('Last ran ' + moment(lastRun).fromNow());
        }
        else
        {    
            grunt.log.writeln('No last run time found');
        }
        
        if (!lastRun || checkOutsidePeriod(lastRun, when))
        {
            runTasks(tasks);

            saveLastRun(this.target);
        }
        else
        {
            grunt.log.writeln('Period [' + when + '] not reached, skipping tasks: ' + tasks.toString());
        }
        
    });
    
    
    
    function readLastRun(target)
    {
        var path = taskDataFolder + target;

        if (grunt.file.exists(path))
        {
            return grunt.file.read(path);
        }
        else
        {
            return null;
        }
    }
    
    
    function checkOutsidePeriod(lastRun, when)
    {
        if (when === 'checkout')
        {
            return false;
        }

        var diff = moment().diff(moment(lastRun), getMeasurement(when));

        return (diff !== 0);
    }
    
    
    function runTasks(tasks)
    {
        grunt.log.writeln('Running tasks: ' + tasks.toString());

        grunt.task.run(tasks);
    }
    
    
    function saveLastRun(target)
    {
        var now = new Date();
        grunt.file.write(taskDataFolder + target, now.toISOString());
    }


    function getMeasurement(when)
    {
        return mesurements[when];
    }

};

'use strict';


module.exports = function register(grunt)
{
    grunt.registerMultiTask('once', 'Task to run other tasks once a given time period', function once(){
        
        grunt.config.requires('period', 'tasks');
        
        var period = grunt.config.get('period');
        var tasks = grunt.config.get('tasks');
        
        if (!Object.isArray(tasks))
        {
            tasks = [tasks];
        }
        
        
        
        
    });
};
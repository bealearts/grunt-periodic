
'use strict';


module.exports = function register(grunt)
{
    grunt.registerMultiTask('once', 'Task to run other tasks once a given time period', function once(){
        
        var options = this.options({
            period: "build",
            tasks: []
        });
        
        
        
    });
};
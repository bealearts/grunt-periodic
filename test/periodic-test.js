
'use strict';

var grunt = require('grunt');



function readCount(target)
{
	var path = './temp/' + target;
	var count = 0;

    if (grunt.file.exists(path))
    {
      count = grunt.file.read(path);
    }

    return count;
}




exports.periodic = {
	
	build: function(test) {

		test.equal(readCount('build'), 2);

		test.done();
	},

	hourly: function(test) {

		test.equal(readCount('hourly'), 1);

		test.done();
	},

	daily: function(test) {

		test.equal(readCount('daily'), 1);

		test.done();
	},

	weekly: function(test) {

		test.equal(readCount('weekly'), 1);

		test.done();
	},

	monthly: function(test) {

		test.equal(readCount('monthly'), 1);

		test.done();
	},

	yearly: function(test) {

		test.equal(readCount('yearly'), 1);

		test.done();
	},

	checkout: function(test) {

		test.equal(readCount('checkout'), 1);

		test.done();
	},						

};

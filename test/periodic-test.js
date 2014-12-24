
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

		test.equal(readCount('build'), 7);

		test.done();
	},

	hourly: function(test) {

		test.equal(readCount('hourly'), 6);

		test.done();
	},

	daily: function(test) {

		test.equal(readCount('daily'), 5);

		test.done();
	},

	weekly: function(test) {

		test.equal(readCount('weekly'), 4);

		test.done();
	},

	monthly: function(test) {

		test.equal(readCount('monthly'), 3);

		test.done();
	},

	yearly: function(test) {

		test.equal(readCount('yearly'), 2);

		test.done();
	},

	checkout: function(test) {

		test.equal(readCount('checkout'), 1);

		test.done();
	},						

};

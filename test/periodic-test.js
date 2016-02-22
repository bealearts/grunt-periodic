
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

		test.equal(readCount('build'), 9);

		test.done();
	},

	hourly: function(test) {

		test.equal(readCount('hourly'), 7);

		test.done();
	},

	daily: function(test) {

		test.equal(readCount('daily'), 6);

		test.done();
	},

	weekly: function(test) {

		test.equal(readCount('weekly'), 5);

		test.done();
	},

	weeklyNotFirst: function(test) {

		test.equal(readCount('weeklyNotFirst'), 4);

		test.done();
	},

	monthly: function(test) {

		test.equal(readCount('monthly'), 4);

		test.done();
	},

	yearly: function(test) {

		test.equal(readCount('yearly'), 3);

		test.done();
	},

	checkout: function(test) {

		test.equal(readCount('checkout'), 1);

		test.done();
	},						

	newer: function(test) {

		test.equal(readCount('newer'), 2);

		test.done();
	},
};

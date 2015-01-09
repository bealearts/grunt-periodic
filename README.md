grunt-periodic [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Build Status](https://travis-ci.org/bealearts/grunt-periodic.svg)](https://travis-ci.org/bealearts/grunt-periodic) [![npm version](https://badge.fury.io/js/grunt-periodic.svg)](http://badge.fury.io/js/grunt-periodic)
==============

Grunt task to run other tasks once a given time period - e.g. once a day, once an hour etc

Useful for tasks which do not need to run every build, such as one time generation of test data or a weekly clean up of log files.

## Getting Started
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-periodic --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-periodic');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4).


## periodic task
_Run this task with the `grunt periodic` command._

Task targets and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Config

#### when
Type: `String`

Specifies when to run the tasks e.g. "hourly" The tasks will be executed a maximum of once every hour.

One of: "build", "hourly", "daily", "weekly", "monthly", "yearly", "checkout"

* "build" runs once a build. This is the equivalent of not using the grunt-once task.
* "checkout" runs only once for the project. It will not be run again, unless a clean checkout of the project is made.

Note that this is only the maximum time period. If the build is not run, the tasks will not be executed.

#### tasks
Type: `Array`

A list of tasks to execute. Tasks may be specified according to the grunt [Task Alias](http://gruntjs.com/creating-tasks#alias-tasks) guide.

### Options

#### runFirstTime
Type: `Boolean`
Default: true

Whether to run the tasks during the first build of the project.

Note if set to `false` with the option of `checkout` for `when` property, then no tasks will be run. 


### Usage Examples

```js
periodic: {
  // Run 'npm-install' once a day - to keep deps up to date
  update: {
    when: "daily",
    tasks: ["npm-install"]
  },
  // Clear out test DB logs once a week
  "clear-logs": {
    when: "weekly",
    tasks: ["clean:logs"]
  }
}
```

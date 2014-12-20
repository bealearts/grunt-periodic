grunt-once
==========

Grunt task to run other tasks once a given time period - e.g. once a day, once an hour etc

## Getting Started
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-once --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-once');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-less/tree/grunt-0.3-stable).*


## Once task
_Run this task with the `grunt once` command._

Task targets and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### period
Type: `String`
Default: "build"

Specifies the time period, in which the tasks should be executes once. e.g. "hour" The tasks will be executed a maximum of once every hour.

One of: "build", "minute", "hour", "day", "week", "month", "year", "checkout"

* "build" runs once a build. This is the equivalent of not using the grunt-once task.
* "checkout" runs only once for the project. It will not be run again, unless a clean checkout of the project is made.

Note that this is only the maximum time period. If the build is not run, the tasks will not be executed.

#### tasks
Type: `Array`
Default: []

A list of tasks to execute. Tasks may be specified according to the grunt [Task Alias](http://gruntjs.com/creating-tasks#alias-tasks) guide.


### Usage Examples

```js
once: {
  // Run 'npm-install' once a day - to keep deps up to date
  update: {
    options: {
      period: "day",
      tasks: ["npm-install"]
    }
  },
  // Clear out test DB logs once a week
  "clear-logs": {
    options: {
      period: "week",
      tasks: ["clean:logs"]
    }
  }
}
```

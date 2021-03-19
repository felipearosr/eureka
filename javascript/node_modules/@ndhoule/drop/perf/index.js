'use strict';

/**
 * Module dependencies.
 */

var Benchmark = require('benchmark');
var drop = require('../');
var ldDrop = require('lodash').drop;
var usDrop = require('underscore').drop;

/**
 * Perf tests.
 */

var array;
var empty;
var args;
var setup = function setup() {
  array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  empty = [];
  args = (function() {
    return arguments;
  })(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
};

new Benchmark.Suite()
  .on('start cycle', setup)
  .add('@ndhoule/drop - array', function() {
    drop(1, array);
  })
  .add('@ndhoule/drop - arguments', function() {
    drop(1, args);
  })
  .add('lodash.drop - array', function() {
    ldDrop(array, 1);
  })
  .add('lodash.drop - arguments', function() {
    ldDrop(args, 1);
  })
  .add('underscore.drop - array', function() {
    usDrop(array, 1);
  })
  .add('underscore.drop - arguments', function() {
    usDrop(args, 1);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })
  .run();

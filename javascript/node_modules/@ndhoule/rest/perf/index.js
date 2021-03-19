'use strict';

/**
 * Module dependencies.
 */

var Benchmark = require('benchmark');
var rest = require('../');
var ld = require('lodash');
var us = require('underscore');

/**
 * Perf tests.
 */

var array;
var args;
var setup = function setup() {
  array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  args = (function() {
    return arguments;
  })(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
};
var suite = new Benchmark.Suite();

suite
  .on('start cycle', setup)
  .add('@ndhoule/rest - array', function() {
    rest(array);
  })
  .add('@ndhoule/rest - arguments', function() {
    rest(args);
  })
  .add('lodash.rest - array', function() {
    ld.rest(array);
  })
  .add('lodash.rest - arguments', function() {
    ld.rest(args);
  })
  .add('underscore.rest - array', function() {
    us.rest(array);
  })
  .add('underscore.rest - arguments', function() {
    us.rest(args);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })
  .run();

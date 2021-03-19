'use strict';

/**
 * Module dependencies.
 */

var Benchmark = require('benchmark');
var defaults = require('../');
var ld = require('lodash');
var us = require('underscore');

/**
 * Perf tests.
 */

var sourceA;
var sourceB;
var target;
var setup = function setup() {
  target = {
    a: 'a',
    b: {
      c: 'c',
      d: {
        e: 'e',
        f: 'f'
      }
    }
  };
  sourceA = {
    a: 'no',
    b: {
      c: 'no',
      d: {
        f: 'no',
        g: 'g'
      },
      h: 'h'
    }
  };
  sourceB = {
    a: 1,
    b: [1, 2, 3, 4, 5],
    p: 'p',
    q: {
      r: {
        s: [9, 8, 7]
      }
    }
  };
};

var shallowSuite = new Benchmark.Suite()
  .on('start cycle', setup)
  .add('@ndhoule/defaults', function() {
    defaults(target, sourceA, sourceB);
  })
  .add('lodash.defaults', function() {
    ld.defaults(target, sourceA, sourceB);
  })
  .add('underscore.defaults', function() {
    us.defaults(target, sourceA, sourceB);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  });

var deepSuite = new Benchmark.Suite()
  .on('start cycle', setup)
  .add('@ndhoule/defaults.deep', function() {
    defaults.deep(target, sourceA, sourceB);
  })
  .add('lodash.defaultsDeep', function() {
    ld.defaultsDeep(target, sourceA, sourceB);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  });

Benchmark.invoke([shallowSuite, deepSuite], { name: 'run' });

'use strict';

/**
 * Module dependencies.
 */

var assert = require('assert');
var every = require('../');
var sinon = require('sinon');

/**
 * Disables some tests in pre-ES5 environments.
 */

var es5It = Object.create ? it : xit;

/**
 * Tests.
 */

describe('every', function() {
  var always = function(val) {
    return function() {
      return val;
    };
  };
  var equal = function(val) {
    return function(val2) {
      return val === val2;
    };
  };
  var isEven = function(num) { return num % 2 === 0; };

  it('should be a function', function() {
    assert.equal(typeof every, 'function');
  });

  it('should have an arity of 2', function() {
    assert.equal(every.length, 2);
  });

  it('should return `true` for an empty collection', function() {
    assert(every(always(true), []) === true);
    assert(every(always(true), {}) === true);
    assert(every(always(true), '') === true);
  });

  it('should return `false` when any elements fail the predicate function', function() {
    assert(every(isEven, [1, 2, 4]) === false);
    assert(every(isEven, { a: 2, b: 5, c: 6 }) === false);
    assert(every(equal('a'), 'aba') === false);
  });

  it('should return `true` when all elements pass the predicate function', function() {
    assert(every(isEven, [2, 4, 6]) === true);
    assert(every(isEven, { a: 2, b: 4, c: 6 }) === true);
    assert(every(equal('a'), 'aaa') === true);
  });

  it('should pass the value/key/collection to the predicate function', function() {
    var spy = sinon.spy(isEven);
    var collection = { a: 2, b: 4, c: 6 };

    every(spy, collection);

    assert(spy.callCount === 3);
    assert(spy.calledWithExactly(2, 'a', collection));
    assert(spy.calledWithExactly(4, 'b', collection));
    assert(spy.calledWithExactly(6, 'c', collection));
  });

  it('should terminate early when predicate returns `false`', function() {
    var spy = sinon.spy(isEven);
    var collection = [2, 4, 6, 7, 8, 10, 12];

    every(spy, collection);

    assert(spy.callCount === 4);
    assert(spy.calledWithExactly(2, 0, collection));
    assert(spy.calledWithExactly(4, 1, collection));
    assert(spy.calledWithExactly(6, 2, collection));
    assert(spy.calledWithExactly(7, 3, collection));
  });

  es5It('should ignore inherited properties', function() {
    var parent = { a: 'b' };
    var child = Object.create(parent, {
      b: { value: 'a', enumerable: true }
    });

    assert(every(equal('a'), child) === true);
  });

  es5It('should ignore non-enumerable properties', function() {
    var obj = Object.create({}, {
      a: { value: 'a', enumerable: true },
      b: { value: 'a', enumerable: false }
    });

    assert(every(equal('a'), obj) === true);
    assert(every(equal('b'), obj) === false);
  });

  it('should throw an error when passed a non-function `predicate`', function() {
    assert.throws(
      function() { every('omg', [1, 2, 3]); },
      /be a function/
    );
  });
});

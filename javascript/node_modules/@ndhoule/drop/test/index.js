'use strict';

/**
 * Module dependencies.
 */

var assert = require('assert');
var drop = require('../');

/**
 * Tests.
 */

describe('drop', function() {
  it('should be a function', function() {
    assert.deepEqual(typeof drop, 'function');
  });

  it('should have an arity of 2', function() {
    assert.equal(drop.length, 2);
  });

  it('should return a new array omitting the input collection\'s first `n` values', function() {
    assert.deepEqual(drop(0, [1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(drop(1, [1, 2, 3]), [2, 3]);
    assert.deepEqual(drop(2, [1, 2, 3]), [3]);
    assert.deepEqual(drop(3, [1, 2, 3]), []);
  });

  it('should gracefully handle a count greater than input.length', function() {
    assert.deepEqual(drop(4, [1, 2, 3]), []);
  });

  it('should handle a negative count', function() {
    assert.deepEqual(drop(-1, [1, 2, 3]), [1, 2, 3]);
  });

  it('should handle empty arrays', function() {
    assert.deepEqual(drop(1, []), []);
  });

  it('should handle strings', function() {
    assert.deepEqual(drop(1, 'abc'), ['b', 'c']);
  });

  it('should handle arguments objects', function() {
    (function() {
      assert.deepEqual(drop(1, arguments), [2, 3, 4, 5]);
    }(1, 2, 3, 4, 5));
  });

  it('should handle objects with a .length property', function() {
    assert.deepEqual(drop(1, { 1: 10, 2: 20, 3: 30, length: 4 }), [10, 20, 30]);
  });

  it('should handle other values gracefully', function() {
    assert.deepEqual(drop(3, { a: 1, b: 2 }), []);
    assert.deepEqual(drop(3, { '1': 1, '2': 2 }), []);
    assert.deepEqual(drop(3, true), []);
    assert.deepEqual(drop(3, false), []);
    assert.deepEqual(drop(3, null), []);
    assert.deepEqual(drop(3, undefined), []);
    assert.deepEqual(drop(3), []);
  });
});

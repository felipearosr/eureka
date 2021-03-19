/* global describe, it, beforeEach */

'use strict';

/**
 * Module dependencies.
 */

var assert = require('assert');
// var sinon = require('sinon');
var rest = require('../');

describe('rest', function() {
  it('should be a function', function() {
    assert.deepEqual(typeof rest, 'function');
  });

  it('should have an arity of 1', function() {
    assert.equal(rest.length, 1);
  });

  it('should return a new array omitting the input collection\'s first value', function() {
    assert.deepEqual(rest([1, 2, 3]), [2, 3]);
  });

  it('should handle empty arrays', function() {
    assert.deepEqual(rest([]), []);
  });

  it('should handle strings', function() {
    assert.deepEqual(rest('abc'), ['b', 'c']);
  });

  it('should handle arguments objects', function() {
    (function() {
      assert.deepEqual(rest(arguments), [2, 3, 4, 5]);
    }(1, 2, 3, 4, 5));
  });

  it('should handle objects with a .length property gracefully', function() {
    assert.deepEqual(rest({ 1: 10, 2: 20, 3: 30, length: 4 }), [10, 20, 30]);
  });

  it('should handle other values gracefully', function() {
    assert.deepEqual(rest({ a: 1, b: 2 }), []);
    assert.deepEqual(rest({ '1': 1, '2': 2 }), []);
    assert.deepEqual(rest(true), []);
    assert.deepEqual(rest(false), []);
    assert.deepEqual(rest(null), []);
    assert.deepEqual(rest(undefined), []);
    assert.deepEqual(rest(), []);
  });
});

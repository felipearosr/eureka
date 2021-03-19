/* globals describe, it, beforeEach  */

'use strict';

var assert = require('assert');
var arity = require('../');

describe('arity', function() {
  var add;

  beforeEach(function() {
    add = function(a, b) { return a + b; };
  });

  it('should be a function', function() {
    assert.equal(typeof arity, 'function');
  });

  it('should have an arity of 2', function() {
    assert.equal(arity.length, 2);
  });

  it('should return a new function', function() {
    assert.equal(typeof arity(2, add), 'function');
  });

  it('should set the returned function\'s arity', function() {
    assert.equal(arity(3, add).length, 3);
  });

  it('should handle large (uncached) arities', function() {
    assert.equal(arity(100, add).length, 100);
  });

  it('should gracefully handle negative arities', function() {
    assert.equal(arity(-1, add).length, 0);
  });

  it('should gracefully handle non-numeric arities', function() {
    assert.equal(arity('omg', add).length, 0);
  });

  it('should throw an error when passed a non-function', function() {
    assert.throws(function() { arity(2, 'omg'); });
  });

  it('should pass all arguments to the wrapped function, regardless of specified arity', function() {
    var aritiedAdd = arity(1, add);

    assert.equal(aritiedAdd.length, 1);
    assert.equal(aritiedAdd(1, 2), 3);
  });
});

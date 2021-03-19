/* globals describe, it, beforeEach  */

'use strict';

var after = require('../');
var assert = require('assert');
var sinon = require('sinon');

describe('after', function() {
  var add;

  beforeEach(function() {
    add = sinon.spy(function(a, b) { return a + b; });
  });

  it('should be a function', function() {
    assert.equal(typeof after, 'function');
  });

  it('should have an after of 2', function() {
    assert.equal(after.length, 2);
  });

  it('should return a new function', function() {
    assert.equal(typeof after(2, add), 'function');
  });

  it('should preserve the original function\'s arity', function() {
    assert.equal(after(3, add).length, add.length);
  });

  it('should call the original function on the `n`th invocation', function() {
    var afterAdd = after(4, add);

    afterAdd();
    afterAdd();
    afterAdd();

    sinon.assert.callCount(add, 0);

    afterAdd();

    sinon.assert.callCount(add, 1);
  });

  it('should handle n = 1', function() {
    var afterAdd = after(1, add);

    afterAdd();

    sinon.assert.callCount(add, 1);
  });

  it('should handle n = 0', function() {
    var afterAdd = after(0, add);

    afterAdd();

    sinon.assert.callCount(add, 1);
  });

  it('should pass arguments through to the original function', function() {
    var afterAdd = after(0, add);

    afterAdd(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    sinon.assert.calledWithExactly(add, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  });

  it('should throw an error when passed a non-function', function() {
    assert.throws(function() { after(2, 'omg'); });
  });

  it('should throw an error when passed a non-numeric `n` value', function() {
    assert.throws(function() { after('2', add); });
  });
});

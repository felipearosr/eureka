/* global describe, it, xit, beforeEach */
/* eslint no-new-wrappers: 0 */

'use strict';

/**
 * Module dependencies.
 */

var assert = require('assert');
var keys = require('@ndhoule/keys');
var sinon = require('sinon');
var foldl = require('../');

/**
 * Locals.
 */

var es5It = typeof Object.create === 'function' ? it : xit;

/**
 * Tests.
 */

describe('foldl', function() {
  var add;

  beforeEach(function() {
    add = sinon.spy(function(a, b) {
      return a + b;
    });
  });

  it('should be a function', function() {
    assert.equal(typeof foldl, 'function');
  });

  it('should have an arity of 3', function() {
    assert.equal(foldl.length, 3);
  });

  it('should accumulate a single return value', function() {
    assert.equal(foldl(add, 5, [100, 200, 300]), 605);
  });

  it('should pass the accumulator to the first function call', function() {
    var numbers = [100, 200, 300];
    foldl(add, 5, numbers);

    assert(add.calledWithExactly(5, 100, 0, numbers));
  });

  it('should pass the input function three arguments: value, index, and array', function() {
    var numbers = [100, 200, 300];
    foldl(add, 5, numbers);

    assert(add.calledWithExactly(105, 200, 1, numbers));
    assert(add.calledWithExactly(305, 300, 2, numbers));
  });

  it('should call the function with each array element, from left to right', function() {
    assert.equal(foldl(add, 'z', ['a', 'b', 'c']), 'zabc');
  });

  it('should ignore non-indexed array values', function() {
    var arr = ['a', 'b', 'c'];
    arr.enchanter = 'Tim';
    foldl(add, 'z', arr);

    assert(add.calledThrice);
    assert(add.calledWith('z', 'a', 0, arr));
  });

  it('should work on objects (with no guarantee of iteration order)', function() {
    var obj = {
      meal: 'spam',
      '0': 'hello',
      enchanter: 'Tim'
    };
    var ks = keys(obj);
    var acc = true;
    var spy = sinon.spy(function(acc) {
      return acc;
    });
    foldl(spy, acc, obj);

    assert(spy.calledThrice);
    assert(spy.firstCall.calledWith(acc, obj[ks[0]], ks[0], obj));
    assert(spy.secondCall.calledWith(acc, obj[ks[1]], ks[1], obj));
    assert(spy.thirdCall.calledWith(acc, obj[ks[2]], ks[2], obj));
  });

  it('should throw an error when passed a non-function as its `fn` argument', function() {
    assert.throws(function() {
      foldl('fdsa', 1, []);
    });
    assert.throws(function() {
      foldl('fdsa', 1, [1]);
    });
  });

  es5It('should work on strings', function() {
    assert.equal(foldl(add, 'z', 'abc'), 'zabc');
  });

  es5It('should work on string objects', function() {
    assert.equal(foldl(add, 'z', new String('abc')), 'zabc');
  });

  es5It('should ignore inherited properties', function() {
    var parent = {
      enchanter: 'Tim'
    };
    var child = Object.create(parent);
    child.food = 'spam';
    var result = foldl(function(acc, val) {
      return acc.concat(val);
    }, [], child);

    assert.deepEqual(result, ['spam']);
  });

  es5It('should ignore non-enumerable properties', function() {
    var obj = Object.create(null, {
      enchanter: {
        value: 'Tim',
        enumerable: true
      },
      fear: {
        value: 'rabbit',
        enumerable: false
      },
      meal: {
        value: 'spam',
        enumerable: true
      }
    });
    var result = foldl(function(acc, val) {
      return acc.concat(val);
    }, [], obj).sort();

    assert.deepEqual(result, ['Tim', 'spam']);
  });

});

/* globals describe, it */

'use strict';

var assert = require('assert');
var eql = require('deep-eql');
var extend = require('../');

describe('extend', function() {
  it('should be a function', function() {
    assert(typeof extend === 'function');
  });

  it('should have an arity of 1', function() {
    assert(extend.length === 1);
  });

  it('should return the first argument', function() {
    var obj = { a: 'a' };
    var obj2 = { b: 'b' };

    assert(extend(obj, obj2) === obj);
  });

  it('should accept multiple source arguments', function() {
    var a = { a: 'a', aa: 'aa' };
    var b = { b: 'b' };
    var c = { c: 'c', cc: 'cc', ccc: 'ccc' };
    var expected = { a: 'a', aa: 'aa', b: 'b', c: 'c', cc: 'cc', ccc: 'ccc' };

    assert(eql(
      extend({}, a, b, c),
      expected
    ));
  });

  it('should not copy inherited properties from source objects', function() {
    var parent = { parent: true };
    var child = Object.create(parent);
    child.child = true;

    assert(eql(
      extend({}, child),
      { child: true }
    ));
  });

  it('should not copy non-enumerable properties from source objects', function() {
    var obj = { a: 'a' };
    Object.defineProperty(obj, 'ignore', { value: true, enumerable: false });
    var expected = { a: 'a', b: 'b' };

    assert(eql(
      extend({}, obj, { b: 'b' }),
      expected
    ));
  });

  it('should copy falsy values from source objects', function() {
    var obj = { a: 'a', b: null };
    var obj2 = { c: undefined };
    var obj3 = { d: false, e: 0 };
    var expected = { a: 'a', b: null, c: undefined, d: false, e: 0 };

    assert(eql(
      extend({}, obj, obj2, obj3),
      expected
    ));
  });

  it('should skip `null` and `undefined` values', function() {
    assert(eql(
      extend({ a: 'a' }, null, { b: 'b' }, undefined, { c: 'c' }),
      { a: 'a', b: 'b', c: 'c' }
    ));
  });
});

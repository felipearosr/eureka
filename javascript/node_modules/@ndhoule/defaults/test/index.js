/* global describe */

'use strict';

var assert = require('assert');
var defaults = require('../');
var es5It = typeof Object.create === 'function' ? it : xit;

describe('defaults', function() {
  it('should be a function', function() {
    assert.equal(typeof defaults, 'function');
  });

  it('should have an arity of 0', function() {
    assert.equal(defaults.length, 1);
  });

  it('should copy a source object\'s properties to a target object when the property does not already exist on the target', function() {
    var target = { target: true, x: 2 };
    var source = { target: 1, source: true, x: 1 };

    assert.deepEqual(
      defaults(target, source),
      { target: true,  source: true, x: 2 }
    );
  });

  it('should work with a variable number of source objects', function() {
    var target = { a: 'a', aa: 'aa' };
    var sourceA = { b: 'b' };
    var sourceB = { c: 'c', cc: 'cc', ccc: 'ccc' };

    assert.deepEqual(
      defaults(target, sourceA, sourceB),
      { a: 'a', aa: 'aa', b: 'b', c: 'c', cc: 'cc', ccc: 'ccc' }
    );
  });

  it('should overwrite owned `undefined` properties', function() {
    var target = { a: 'a', b: undefined };
    var source = { a: 1, b: 5 };

    assert.deepEqual(
      defaults(target, source),
      { a: 'a', b: 5 }
    );
  });

  it('should copy falsy values from source objects', function() {
    var target = { a: 'a', b: null };
    var sourceA = { c: undefined };
    var sourceB = { c: 5, d: false, e: 0 };

    assert.deepEqual(
      defaults(target, sourceA, sourceB),
      { a: 'a', b: null, c: 5, d: false, e: 0 }
    );
  });

  it('should return non-object targets', function() {
    var source = { a: 1 };

    assert.equal(defaults(undefined, source), undefined);
    assert.equal(defaults(null, source), null);
    assert.equal(defaults(true, source), true);
    assert.equal(defaults(1, source), 1);
    assert.equal(defaults('abc', source), 'abc');
  });

  it('should skip non-enumerable non-object sources', function() {
    var target = { a: 1 };
    var source = { b: 2 };
    var expected = { a: 1, b: 2 };

    assert.deepEqual(defaults(target, undefined, source), expected);
    assert.deepEqual(defaults(target, null, source), expected);
    assert.deepEqual(defaults(target, true, source), expected);
    assert.deepEqual(defaults(target, source, 1), expected);
  });

  es5It('should skip inherited properties on source objects (ES5+)', function() {
    var parent = { parent: true };
    var child = Object.create(parent);
    child.child = true;
    var target = { target: true };

    assert.deepEqual(
      defaults(target, child),
      { child: true, target: true }
    );
  });

  es5It('should skip non-enumerable properties on source objects (ES5+)', function() {
    var obj = { a: 'a' };
    Object.defineProperty(obj, 'ignore', { value: true, enumerable: false });

    assert.deepEqual(
      defaults(obj, { b: 'b' }),
      { a: 'a', b: 'b' }
    );
  });
});

describe('defaults.deep', function() {
  it('should merge objects recursively', function() {
    var a = { a: 'a', b: { d: 'd', e: { f: 'f' } } };
    var b = { a: 'no', b: { d: 'no', e: { f: {}, g: 'g' } }, c: 'c' };
    var c = { n: 'n', b: { z: 'z', d: [1, 2, 3] }, c: 'no', l: 'lol' };
    var expected = {
      a: 'a',
      b: {
        d: 'd',
        e: {
          f: 'f',
          g: 'g'
        },
        z: 'z'
      },
      c: 'c',
      n: 'n',
      l: 'lol'
    };

    assert.deepEqual(defaults.deep({}, a, b, c), expected);
  });

  it('should mutate the first argument', function() {
    var a = {};
    var b = { a: 'a' };
    defaults.deep(a, b);

    assert(a.hasOwnProperty('a'));
  });

  it('should not merge arrays', function() {
    var a = { a: [1, 2, 3] };
    var b = { a: [2, 3, 4] };

    assert.deepEqual(defaults.deep({}, a, b), { a: [1, 2, 3] });
  });
});

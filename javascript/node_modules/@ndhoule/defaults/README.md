# defaults [![CI][ci-badge]][ci-link]

Copies owned, enumerable properties from a source object(s) to a target object when the value of that property on the source object is `undefined`.

## Installation

```sh
$ component install ndhoule/defaults
$ npm install @ndhoule/defaults
```

## API

### `defaults(target : Object, sources : ...Object)` => Object

Copies owned, enumerable properties from a source object(s) to a target object when the value of that property on the source object is `undefined`.

```javascript
var a = { a: 1 };
var b = { a: 2, b: 2 };

defaults(a, b);
console.log(a); //=> { a: 1, b: 2 }
```

### `defaults.deep(target : Object, sources : ...Object)` => Object

Deeply copies owned, enumerable properties from a source object(s), recursing on object properties, to a target object when the value of that property on the source object is `undefined`.

```javascript
var a = { a: 1, b: { c: 3 } };
var b = { a: 2, b: { d: 4 } };

defaults(a, b);
console.log(a); //=> { a: 1, b: { c: 3, d: 4} }
```

## License

Released under the [MIT license](LICENSE.md).

[ci-link]: https://travis-ci.org/ndhoule/defaults
[ci-badge]: https://travis-ci.org/ndhoule/defaults.svg?branch=master

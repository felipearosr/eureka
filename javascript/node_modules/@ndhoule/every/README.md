# every [![CI][ci-badge]][ci-link]

Check if a `predicate` function returns true for all values in a `collection`.

## Installation

```sh
$ component install ndhoule/every
$ npm install @ndhoule/every
```

## API

### `every(predicate : Function, collection : Array|Object|String)`

```js
var isEven = function(num) { return num % 2 === 0; };

every(isEven, []); // => false
every(isEven, [1, 2]); // => false
every(isEven, [2, 4, 6]); // => true
```

## License

Released under the [MIT license](LICENSE.md).

[ci-link]: https://travis-ci.org/ndhoule/every
[ci-badge]: https://travis-ci.org/ndhoule/every.svg?branch=master

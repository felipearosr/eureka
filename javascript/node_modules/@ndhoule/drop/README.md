# drop [![CI][ci-badge]][ci-link]

Produce a new array composed of all but the first `n` elements of an input `collection`.

## Installation

```sh
$ component install ndhoule/drop
$ npm install @ndhoule/drop
```

## API

### `drop(count : number, collection : Array) => Array`

Produce a new array composed of all but the first `n` elements of an input `collection`.

```javascript
drop([1, 2, 3]); // => [2, 3]
```

## License

Released under the [MIT license](LICENSE.md).

[ci-link]: https://travis-ci.org/ndhoule/drop
[ci-badge]: https://travis-ci.org/ndhoule/drop.svg?branch=master

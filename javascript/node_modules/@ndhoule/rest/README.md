# rest [![CI][ci-badge]][ci-link]

Produce a new array composed of all but the first element of the input `collection`.

## Installation

```sh
$ component install ndhoule/rest
$ npm install @ndhoule/rest
```

## API

### rest(collection : Array) => Array

Produce a new array composed of all but the first element of the input `collection`.

```javascript
rest([1, 2, 3]); // => [2, 3]
```

## License

Released under the [MIT license](LICENSE.md).

[ci-link]: https://travis-ci.org/ndhoule/rest
[ci-badge]: https://travis-ci.org/ndhoule/rest.svg?branch=master

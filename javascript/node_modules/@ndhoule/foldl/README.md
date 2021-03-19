# foldl [![CI][ci-badge]][ci-link]

Apply a function to each value in a collection, accumulating the results into a single return value.

## Installation

```sh
$ component install ndhoule/foldl
$ npm install @ndhoule/foldl
```

## API

### `reduce(iterator : Function, accumulator : *, collection : Array|Object)`

Reduces all the values in a collection down into a single value. Does so by iterating through the collection from left to right, repeatedly calling an `iterator` function and passing to it four arguments: `(accumulator, value, index, collection)`.

```javascript
foldl(function(total, n) {
  return total + n;
}, 0, [1, 2, 3]);
//=> 6

var phonebook = { bob: '555-111-2345', tim: '655-222-6789', sheila: '655-333-1298' };

foldl(function(results, phoneNumber) {
 if (phoneNumber[0] === '6') {
   return results.concat(phoneNumber);
 }
 return results;
}, [], phonebook);
// => ['655-222-6789', '655-333-1298']
```

## License

Released under the [MIT license](LICENSE.md).

[ci-link]: https://travis-ci.org/ndhoule/foldl
[ci-badge]: https://travis-ci.org/ndhoule/foldl.svg?branch=master

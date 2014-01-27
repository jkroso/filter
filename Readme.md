
# filter

  select a subset of items from a collection

## Installation

With your favorite package manager:

- [packin](//github.com/jkroso/packin): `packin add jkroso/filter`
- [component](//github.com/component/component#installing-packages): `component install jkroso/filter`
- [npm](//npmjs.org/doc/cli/npm-install.html): `npm install jkroso/filter`

then in your app:

```js
var filter = require('filter')
```

## API

### filter(array, fn, [ctx])

  select the items from `array` which are truthy values of `fn`

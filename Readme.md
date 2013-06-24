
# filter

  select a subset of items from a collection

## Installation

_With [component](//github.com/component/component), [packin](//github.com/jkroso/packin) or [npm](//github.com/isaacs/npm)_  

	$ {package mananger} install jkroso/filter

then in your app:

```js
var filter = require('filter')
var async = require('filter/async')
```

## API

- [filter()](#filterobjobjectarraypredfunctionctxany)
- [async()](#asyncobjobjectarraypredfunctionctxany)

### filter(obj:Object|Array, pred:Function, ctx:Any)

  select items from `obj` which return true when run through the `pred` function

### async(obj:Object|Array, pred:Function, ctx:Any)

  As above except a full understanding of [Results](//github.com/jkroso/result) enables it to run asynchronously. Any parameter can itself be a Result and will be handled correctly. The return value will always be a Result even if it ends up running fully synchronously.

```js
var files = ['a', 'b', 'c']
var fs = require('resultify/fs')
async(files, fs.exists).read(function(files){
	console.log(files)
})
```

## Running the tests

Just run `make`. It will install and start a development server leaving the tests waiting for you [at](http://localhost:3000/test)

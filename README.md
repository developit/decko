# decko [![NPM Version](http://img.shields.io/npm/v/decko.svg?style=flat)](https://npmjs.com/package/decko) [![Build Status](https://travis-ci.org/developit/decko.svg?branch=master)](https://travis-ci.org/developit/decko)

> A collection of the most useful [decorators](https://github.com/wycats/javascript-decorators).
>
> Works by default with Babel 5.x. To use with Babel 6+, install [transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy).


## Installation

Available on [npm](https://npmjs.com/package/decko):

```sh
npm i -S decko
```


## Usage

Each decorator method is available as a named import.

```js
import { bind, memoize, debounce } from 'decko';
```


### `@bind`

```js
class Example {
	@bind
	foo() {
		// the value of `this` is always the object from which foo() was referenced.
		return this;
	}
}

let e = new Example();
assert.equal(e.foo(), e);
```



### `@memoize`

> Cache values returned from the decorated function.
> Uses the first argument as a cache key.
> _Cache keys are always converted to strings._
>
> ##### Options:
>
> `caseSensitive: false` - _Makes cache keys case-insensitive_
>
> `cache: {}` - _Presupply cache storage, for seeding or sharing entries_

```js
class Example {
	@memoize
	expensive(key) {
		let start = Date.now();
		while (Date.now()-start < 500) key++;
		return key;
	}
}

let e = new Example();

// this takes 500ms
let one = e.expensive(1);

// this takes 0ms
let two = e.expensive(1);

// this takes 500ms
let three = e.expensive(2);
```



### `@debounce`

> Throttle calls to the decorated function. To debounce means "call this at most once per N ms".
> All outward function calls get collated into a single inward call, and only the latest (most recent) arguments as passed on to the debounced function.
>
> ##### Options:
>
> `delay: 0` - _The number of milliseconds to buffer calls for._

```js
class Example {
	@debounce
	foo() {
		return this;
	}
}

let e = new Example();

// this will only call foo() once:
for (let i=1000; i--) e.foo();
```


---

License
-------

MIT

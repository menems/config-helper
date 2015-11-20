# config-helper

[![Node.js Version][node-image]][node-url]
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Dependency Status][dep-image]][dep-url]
[![Coverage Status][cov-img]][cov-url]

Provide a simple config loader based on NODE_ENV

## installation

```
npm install config-helper
```

## Default usage

```
config/
	developement.js
	test.js
	production.js
```

```javascript
const config = require('config-helper')({
    path: 'config/'
});
```

## Multi usage

```
path/config/
	developement/
		core.js
		database.json
		...
	test/
	production/
```

```javascript
const config = require('config-helper')({
    path :'path/config',
    multi :true
});
```

[node-image]: https://img.shields.io/node/v/config-helper.svg?style=flat-square
[node-url]: https://nodejs.org
[npm-image]: https://img.shields.io/npm/v/config-helper.svg?style=flat-square
[npm-url]: https://npmjs.org/package/config-helper
[travis-image]: https://img.shields.io/travis/menems/config-helper/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/menems/config-helper
[cov-img]: https://coveralls.io/repos/menems/config-helper/badge.svg?branch=master&service=github
[cov-url]: https://coveralls.io/github/menems/config-helper?branch=master
[dep-image]: http://david-dm.org/menems/config-helper.svg?style=flat-square
[dep-url]:http://david-dm.org/menems/config-helper

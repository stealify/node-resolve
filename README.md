# node-resolve
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

Locate modules using the [Node resolution algorithm](https://nodejs.org/api/modules.html#modules_all_together), for using third party modules in node_modules.

```js
var nodeResolve = require('node-resolve');

nodeResolve.resolve('src/index.js', './foo/foo');// src/foo/foo.js
nodeResolve.resolve('src/index.js', 'babel-core');// node_modules/babel-core/index.js
```

`undefined` is returned if not found, and `null` is returned if it's a builtin module(_fs_,_path_...).

[npm-url]: https://npmjs.org/package/node-resolve
[downloads-image]: http://img.shields.io/npm/dm/node-resolve.svg
[npm-image]: http://img.shields.io/npm/v/node-resolve.svg
[travis-url]: https://travis-ci.org/yanni4night/node-resolve
[travis-image]: http://img.shields.io/travis/yanni4night/node-resolve.svg
[david-dm-url]:https://david-dm.org/yanni4night/node-resolve
[david-dm-image]:https://david-dm.org/yanni4night/node-resolve.svg
[david-dm-dev-url]:https://david-dm.org/yanni4night/node-resolve#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/yanni4night/node-resolve/dev-status.svg

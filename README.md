# antiaris-node-resolve
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

解析文件依赖，找到真正的 CommonJS 指向。这在复用被发布到 NPM 上的资源时非常有用。

```js
import {resolve} from 'antiaris-node-resolve';

resolve('src/index.js', './foo/foo');// src/foo/foo.js
resolve('src/index.js', 'babel-core');// node_modules/babel-core/index.js
```

默认地，NodeJS 内建的模块会被忽略，比如 `fs`、`path`。

[npm-url]: https://npmjs.org/package/antiaris-node-resolve
[downloads-image]: http://img.shields.io/npm/dm/antiaris-node-resolve.svg
[npm-image]: http://img.shields.io/npm/v/antiaris-node-resolve.svg
[travis-url]: https://travis-ci.org/antiaris/antiaris-node-resolve
[travis-image]: http://img.shields.io/travis/antiaris/antiaris-node-resolve.svg
[david-dm-url]:https://david-dm.org/antiaris/antiaris-node-resolve
[david-dm-image]:https://david-dm.org/antiaris/antiaris-node-resolve.svg
[david-dm-dev-url]:https://david-dm.org/antiaris/antiaris-node-resolve#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/antiaris/antiaris-node-resolve/dev-status.svg

/**
 * Copyright (C) 2016 yanni4night.com
 * test.js
 *
 * changelog
 * 2016-06-14[18:11:14]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
const nodeResolve = require('../');
const assert = require('assert');
const path = require('path');

describe('node-resolve', function () {
    describe('isCore', function () {
        it('should return true if "fs"', function () {
            assert.ok(nodeResolve.isCore('fs'));
        });
    });
    describe('nodeModulesPaths', function () {
        it('should return all paths"', function () {
            const paths = nodeResolve.nodeModulesPaths(__dirname);
            assert.deepEqual(paths.length, __dirname.split(path.sep).length);
        });
    });
});
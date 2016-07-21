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
'use strict';
var nodeResolve = require('../');
var assert = require('assert');
var path = require('path');
var fs = require('fs');

describe('node-resolve', function () {
    describe('#isCore', function () {
        it('should return true if "fs"', function () {
            assert.ok(nodeResolve.isCore('fs'));
        });
    });
    describe('#nodeModulesPaths', function () {
        it('should return all paths"', function () {
            var paths = nodeResolve.nodeModulesPaths(__dirname);
            assert.deepEqual(paths.length, __dirname.split(path.sep).length);
        });
    });
    describe('#loadNpmModules', function () {
        it('should get is-builtin-module', function () {
            var target = nodeResolve.loadNpmModules('is-builtin-module', __dirname);
            assert.ok(fs.existsSync(target));
        });

        it('should get lodash/fp/extend', function () {
            var extend = nodeResolve.loadNpmModules('lodash/fp/extend', __dirname);
            assert.ok(fs.existsSync(extend));
        });
    });
    describe('#loadAsFile', function () {
        it('should load test.js', function () {
            var test = nodeResolve.loadAsFile(__dirname + '/test.js');
            assert.ok(fs.existsSync(test));
        });
    });
    describe('#loadAsDirectory', function () {
        it('should get index.js', function () {
            var test = nodeResolve.loadAsDirectory(path.join(__dirname, '..'));
            assert.ok(fs.existsSync(test));
        });
    });
    describe('#resolve', function () {
        const cwd = __dirname + '/..';

        it('should resolve is-builtin-module', function () {
            var target = nodeResolve.resolve('index.js', 'is-builtin-module', cwd);
            assert.ok(fs.existsSync(target));
        });
        it('should resolve test', function () {
            var test = nodeResolve.resolve('index.js', './test/test.js', cwd);
            assert.ok(fs.existsSync(test));
        });
        it('should get null if builtin', function () {
            var fs = nodeResolve.resolve('index.js', 'fs', cwd);
            assert.equal(fs, null);
        });
        it('should get null if undefined', function () {
            var foo = nodeResolve.resolve('index.js', './foo', cwd);
            assert.equal(foo, undefined);
        });
        it('should get sub dir', function () {
            var foo = nodeResolve.resolve('index.js', 'lodash/fp/extend', cwd);
            assert.ok(fs.existsSync(foo));
        });
    });
});
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
const nodeResolve = require('../');
const assert = require('assert');
const path = require('path');
const fs = require('fs');

describe('node-resolve', function() {
    describe('#isCore', function() {
        it('should return true if "fs"', function() {
            assert.ok(nodeResolve.isCore('fs'));
        });
    });
    describe('#nodeModulesPaths', function() {
        it('should return all paths"', function() {
            const paths = nodeResolve.nodeModulesPaths(__dirname);
            assert.deepEqual(paths.length, __dirname.split(path.sep).length);
        });
    });
    describe('#loadNpmModules', function() {
        it('should get glob', function() {
            const glob = nodeResolve.loadNpmModules('glob', __dirname);
            assert.ok(fs.existsSync(glob));
        });

        it('should get lodash/fp/extend', function() {
            const extend = nodeResolve.loadNpmModules('lodash/fp/extend', __dirname);
            assert.ok(fs.existsSync(extend));
        });
    });
    describe('#loadAsFile', function() {
        it('should load test.js', function() {
            const test = nodeResolve.loadAsFile(__dirname + '/test.js');
            assert.ok(fs.existsSync(test));
        });
    });
    describe('#loadAsDirectory', function() {
        it('should get index.js', function() {
            const test = nodeResolve.loadAsDirectory(path.join(__dirname, '..'));
            assert.ok(fs.existsSync(test));
        });
    });
    describe('#resolve', function() {
        it('should resolve glob', function() {
            const glob = nodeResolve.resolve(path.join(__dirname, '../index.js'), 'glob');
            assert.ok(fs.existsSync(glob));
        });
        it('should resolve test', function() {
            const test = nodeResolve.resolve(path.join(__dirname, '../index.js'), './test/test.js');
            assert.ok(fs.existsSync(test));
        });
        it('should get null if builtin', function() {
            const fs = nodeResolve.resolve(path.join(__dirname, '../index.js'), 'fs');
            assert.equal(fs, undefined);
        });
        it('should get null if undefined', function() {
            const foo = nodeResolve.resolve(path.join(__dirname, '../index.js'), './foo');
            assert.equal(foo, undefined);
        });
    });
});
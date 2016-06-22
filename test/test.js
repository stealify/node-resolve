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

describe('node-resolve', function() {
    describe('#isCore', function() {
        it('should return true if "fs"', function() {
            assert.ok(nodeResolve.isCore('fs'));
        });
    });
    describe('#nodeModulesPaths', function() {
        it('should return all paths"', function() {
            var paths = nodeResolve.nodeModulesPaths(__dirname);
            assert.deepEqual(paths.length, __dirname.split(path.sep).length);
        });
    });
    describe('#loadNpmModules', function() {
        it('should get glob', function() {
            var glob = nodeResolve.loadNpmModules('glob', __dirname);
            assert.ok(fs.existsSync(glob));
        });

        it('should get lodash/fp/extend', function() {
            var extend = nodeResolve.loadNpmModules('lodash/fp/extend', __dirname);
            assert.ok(fs.existsSync(extend));
        });
    });
    describe('#loadAsFile', function() {
        it('should load test.js', function() {
            var test = nodeResolve.loadAsFile(__dirname + '/test.js');
            assert.ok(fs.existsSync(test));
        });
    });
    describe('#loadAsDirectory', function() {
        it('should get index.js', function() {
            var test = nodeResolve.loadAsDirectory(path.join(__dirname, '..'));
            assert.ok(fs.existsSync(test));
        });
    });
    describe('#resolve', function() {
        it('should resolve glob', function() {
            var glob = nodeResolve.resolve(path.join(__dirname, '../index.js'), 'glob');
            assert.ok(fs.existsSync(glob));
        });
        it('should resolve test', function() {
            var test = nodeResolve.resolve(path.join(__dirname, '../index.js'), './test/test.js');
            assert.ok(fs.existsSync(test));
        });
        it('should get null if builtin', function() {
            var fs = nodeResolve.resolve(path.join(__dirname, '../index.js'), 'fs');
            assert.equal(fs, null);
        });
        it('should get null if undefined', function() {
            var foo = nodeResolve.resolve(path.join(__dirname, '../index.js'), './foo');
            assert.equal(foo, undefined);
        });
    });
});
/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-06-14[16:03:54]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

'use strict';
var path = require('path');
var fs = require('fs');

var startsWith = require('lodash/startsWith');
var isBuiltinModule = require('is-builtin-module');

var isCore = exports.isCore = isBuiltinModule;

var loadAsFile = exports.loadAsFile = function (module) {

    if (fs.existsSync(module) && fs.statSync(module).isFile()) {
        return module;
    }

    if (fs.existsSync(module + '.js') && fs.statSync(module + '.js').isFile()) {
        return module + '.js';
    }

    if (fs.existsSync(module + '.json') && fs.statSync(module + '.json').isFile()) {
        return module + '.json';
    }

};

var loadAsDirectory = exports.loadAsDirectory = function (module) {

    if (!fs.existsSync(module)) {
        return;
    }

    var stat = fs.statSync(module);

    if (stat.isDirectory()) {
        var packagePath = module + '/package.json';
        if (fs.existsSync(packagePath) && fs.statSync(packagePath).isFile()) {
            var pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
            var main = path.join(module, pkg.main || 'index.js');
            return loadAsFile(main) || loadAsDirectory(main);
        } else if (fs.existsSync(module + '/index.js') && fs.statSync(module + '/index.js').isFile()) {
            return module + '/index.js';
        } else if (fs.existsSync(module + '/index.json') && fs.statSync(module + '/index.json').isFile()) {
            return module + '/index.json';
        }
    } else if (stat.isFile()) {
        return loadAsFile(module);
    }
};

var nodeModulesPaths = exports.nodeModulesPaths = function (start) {
    var parts = start.split(path.sep);

    if (!parts[parts.length - 1]) {
        parts.pop();
    }

    var i = parts.length - 1;
    var dirs = [];
    while (i >= 0) {
        if ('node_modules' === parts[i]) {
            i -= 1;
            continue;
        }
        var dir = path.join(parts.slice(0, i + 1).join(path.sep) || path.sep, 'node_modules');
        dirs.push(dir);
        i -= 1;
    }
    return dirs;
};

var loadNpmModules = exports.loadNpmModules = function (module, start) {
    var target;
    var paths = nodeModulesPaths(start);

    for (var i = 0; i < paths.length; ++i) {
        var dependencyPath = path.join(paths[i], module);
        target = loadAsFile(dependencyPath) || loadAsDirectory(dependencyPath);

        if (target) {
            break;
        }
    }
    return target;
};

exports.resolve = function (script, dependency, cwd) {
    var target;

    if (isCore(dependency)) {
        return null;
    }

    cwd = cwd || '.';

    if (startsWith(dependency, './') || startsWith(dependency, '/') || startsWith(dependency, '../')) {
        var dependencyPath = path.join(cwd, path.dirname(script), dependency);
        target = loadAsFile(dependencyPath) || loadAsDirectory(dependencyPath);
    } else {
        target = loadNpmModules(dependency, path.dirname(script));
    }

    return target;
};
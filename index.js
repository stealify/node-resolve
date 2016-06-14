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
const path = require('path');
const fs = require('fs');

const isBuiltinModule = require('is-builtin-module');



const isCore = exports.isCore = isBuiltinModule;

const loadAsFile = exports.loadAsFile = module => {};
const loadAsDirectory = exports.loadAsDirectory = module => {};

const nodeModulesPaths = exports.nodeModulesPaths = start => {
    let parts = start.split(path.sep);

    if (!parts[parts.length - 1]) {
        parts.pop();
    }

    let i = parts.length - 1;
    const dirs = [];
    while (i >= 0) {
        if ('node_modules' === parts[i]) {
            continue;
        }
        let dir = path.join(parts.slice(0, i + 1).join(path.sep) || path.sep, 'node_modules');
        dirs.push(dir);
        i -= 1;
    }
    return dirs;
};

const loadNpmModules = exports.loadNpmModules = (module, start) => {};

const resolve = exports.resolve = (script, dependency) => {
    if (isCore(dependency)) {
        throw new Error(`"${dependency}" is a Nodejs builtin module`);
    }
};
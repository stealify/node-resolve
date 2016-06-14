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

const startsWith = require('lodash/startsWith');
const isBuiltinModule = require('is-builtin-module');


const isCore = exports.isCore = isBuiltinModule;

const loadAsFile = exports.loadAsFile = module => {
    let stat = fs.statSync(module);

    if (stat.isFile()) {
        return module;
    }

    stat = fs.statSync(`${module}.js`);

    if (stat.isFile()) {
        return `${module}.js`;
    }

    stat = fs.statSync(`${module}.json`);

    if (stat.isFile()) {
        return `${module}.json`;
    }
};

const loadAsDirectory = exports.loadAsDirectory = module => {

    if (!fs.existsSync(module)) {
        return;
    }

    let stat = fs.statSync(module);

    if (stat.isDirectory()) {
        let packagePath = `${module}/package.json`;
        if (fs.existsSync(packagePath) && fs.statSync(packagePath).isFile()) {
            let package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            let main = path.join(module, package.main);
            let mainStat = fs.statSync(main);
            if (mainStat.isFile()) {
                return main;
            } else if (mainStat.isDirectory()) {
                return loadAsDirectory(main);
            }
        } else if(fs.existsSync(`${module}/index.js`)&&fs.statSync(`${module}/index.js`).isFile()){
            return `${module}/index.js`;
        } else if(fs.existsSync(`${module}/index.json`)&&fs.statSync(`${module}/index.json`).isFile()){
            return `${module}/index.json`;
        }
    } else if (stat.isFile()) {
        return loadAsFile(module);
    }
};

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

const loadNpmModules = exports.loadNpmModules = (module, start) => {
    let target;
    const paths = nodeModulesPaths(start);

    for (let i = 0; i < paths.length; ++i) {
        let dependencyPath = path.join(paths[i], module);
        target = loadAsFile(dependencyPath) || loadAsDirectory(dependencyPath);

        if (target) {
            break;
        }
    }
    return target;
};

const resolve = exports.resolve = (script, dependency) => {
    let target;

    if (isCore(dependency)) {
        throw new Error(`"${dependency}" is a Nodejs builtin module`);
    }

    if (startsWith(dependency, './') || startsWith(dependency, '/') || startsWith(dependency, '../')) {
        let dependencyPath = path.join(path.dirname(script), dependency);
        target = loadAsFile(dependencyPath) || loadAsDirectory(dependencyPath);
    } else {
        target = loadNpmModules(dependency, path.dirname(script));
    }

    return target;
};
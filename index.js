'use strict';

const debug = require('debug')('config-helper:config');
const fs = require('fs');
const path = require('path');
const extend = require('extend');

module.exports = (dir, multi) => {

    if (!dir) throw new Error('dir is required');

    let stat = fs.statSync(dir);
    if (!stat.isDirectory()) throw new Error('dir must be a directory')

    const env = process.env.NODE_ENV || 'development';
    const config_path = path.join(dir, env);

    let config;
    if (multi) {
        stat = fs.statSync(config_path);
        fs.readdirSync(config_path)
            .filter( f => path.extname(f) === '.js')
            .forEach( f => config = extend(config, require(path.join(config_path, f))));

    }else {
        config = require(config_path);
    }

    config.env = env;
    config.port = config.port || process.env.PORT || 1664;
    return config;
}

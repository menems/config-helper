'use strict';

const debug = require('debug')('config-helper');
const fs = require('fs');
const path = require('path');
const extend = require('extend');

module.exports = (dir, multi) => {

    dir = dir || './config';

    dir = path.resolve(dir);
    let stat = fs.statSync(dir);
    if (!stat.isDirectory()) throw new Error('dir must be a directory')

    const env = process.env.NODE_ENV || 'development';
    const config_path = path.join(dir, env);

    let config;
    if (multi) {
        stat = fs.statSync(config_path);
        fs.readdirSync(config_path)
            .filter( f => path.extname(f) === '.js')
            .forEach( f => {
                const file = path.join(config_path, f);
                debug('add %s', file);
                config = extend(config, require(file));
            });

    }else {
        debug('add %s', config_path);
        config = require(config_path);
    }

    config.env = env;
    return config;
}

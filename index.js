'use strict';

const debug = require('debug')('config-helper');
const fs = require('fs');
const path = require('path');
const extend = require('extend');

module.exports = (options) => {

    if (!options)
        throw new Error('options object is required');

    if (typeof options != 'object')
        throw new TypeError('options must be an object')

    if (!options.path)
        throw new Error('options.path is required');

    options.multi = options.multi || false;

    const dir = path.resolve(options.path);

    let stat = fs.statSync(dir);

    if (!stat.isDirectory())
        throw new Error('options.path must be a directory')

    const env = process.env.NODE_ENV || 'development';

    const config_path = path.join(dir, env);

    let config;
    if (options.multi) {
        stat = fs.statSync(config_path);
        fs.readdirSync(config_path)
            .filter( f => /\.js|\.coffee|\.json/.test(path.extname(f)))
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
    config.root = path.resolve('./');
    return config;
}

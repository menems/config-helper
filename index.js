'use strict';

const debug = require('debug')('config-helper:config');
const fs = require('fs');
const path = require('path');

module.exports = dir => {

    if (!dir) throw new Error('dir is required');

    const stat = fs.statSync(dir);
    if (!stats.isDirectory()) throw new Error('dir must be a directory')

    const env = process.env.NODE_ENV || 'development';
    const config_path = path.join(dir, env);

    const config = require(config_path);
    config.env = env;
    config.port = config.port || process.env.PORT || 6666;
    return config;
}

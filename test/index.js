'use strict';

process.env.NODE_ENV='test';

const configHelper = require('..');

const simple = __dirname + '/fixtures/simple';
const multiple = __dirname + '/fixtures/multi';

describe('config-helper', () => {

    it('should throw if dir not exist', done => {
        (() => configHelper(simple +'/test.js')).should.throw('config root must be a directory');
        done();
    });

    it('should set root config path to ./config', done => {
        (() => configHelper()).should.throw(/ENOENT.*config-helper\/config/);
        done();
    });

    it('should set env to development', done => {
        delete process.env.NODE_ENV;
        (() => configHelper(simple)).should.throw(/Cannot find module .*development/);
        done();
    });

    it('should be ok with default conf', done => {
        process.env.NODE_ENV='test';
        const c = configHelper(simple);
        c.should.have.property('name');
        done();
    });
    it('should be ok with multi conf, json and js file', done => {
        process.env.NODE_ENV='test';
        const c = configHelper(multiple, true);
        c.should.have.property('name');
        c.should.have.property('deux');
        c.should.have.property('env');
        done();
    });
});

'use strict';

process.env.NODE_ENV='test';

const configHelper = require('..');

const simple = __dirname + '/fixtures/simple';
const multiple = __dirname + '/fixtures/multi';

describe('config-helper', () => {

    it('should throw if options is undefined', done => {
        (() => configHelper()).should.throw('options object is required');
        done();
    });

    it('should throw if options is not an object', done => {
        (() => configHelper(true)).should.throw('options must be an object');
        done();
    });

    it('should throw if options.path is undefined', done => {
        (() => configHelper({})).should.throw('options.path is required');
        done();
    });

    it('should set env to development', done => {
        delete process.env.NODE_ENV;
        (() => configHelper({path:simple})).should.throw(/Cannot find module .*development/);
        done();
    });

    it('should be ok with default conf', done => {
        process.env.NODE_ENV='test';
        const c = configHelper({path:simple});
        c.should.have.property('name');
        done();
    });

    it('should be ok with multi conf, json and js file', done => {
        process.env.NODE_ENV='test';
        const c = configHelper({path: multiple, multi: true});
        c.should.have.property('name');
        c.should.have.property('deux');
        c.should.have.property('env');
        done();
    });
});

'use strict';
process.env.NODE_ENV='test';

const configHelper = require('..');

const simple = __dirname + '/fixtures/simple';
const multiple = __dirname + '/fixtures/multi';

describe('config-helper', () => {
    it('should be ok with default conf', done => {
        const c = configHelper(simple);
        c.should.have.property('name');
        done();
    });
    it('should be ok with multi conf', done => {
        const c = configHelper(multiple, true);
        c.should.have.property('name');
        c.should.have.property('pouet');
        done();
    });
});

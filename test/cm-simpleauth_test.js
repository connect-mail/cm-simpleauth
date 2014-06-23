/*
 * cm-simpleauth
 * https://github.com/parroit/cm-simpleauth
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var simpleauth = require('../lib/cm-simpleauth.js');
var EventEmitter = require('events').EventEmitter;

var testHost = new EventEmitter();

describe('cm-simpleauth module', function() {
    it('is defined', function() {
        simpleauth.should.be.a('function');
    });

    before(function(done) {
        this.mw = simpleauth('test/users.json', done);
    });

    it('return a middleware', function() {
        this.mw.should.be.a('function');
    });

    describe('when mw is used on a connect-mail app instance', function() {
        before(function(done) {
            
            this.mw(testHost);
            testHost.emit('authorizeUser', null, 'ola', 'parroit', function(err, success) {
                if (err) {
                    return done(err);
                }
                this.success = success;
                done();

            }.bind(this));
            
        });

        it('authenticate test user', function() {
            this.success.should.be.equal(true);

        });

        it('save user in request', function() {
            testHost.user.should.be.deep.equal({
                username: 'ola',
                password: 'parroit',
                fullname: 'parroit',
                email: 'parroit@ebansoftware.net',
                status: 'parroit'
            });

        });
    });


});

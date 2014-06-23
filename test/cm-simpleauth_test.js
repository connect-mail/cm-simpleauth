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

describe('cm-simpleauth module', function(){
  describe('#awesome()', function(){
    it('should return a hello', function(){
      simpleauth.awesome('livia').should.equal("hello livia");
    });
  });
});

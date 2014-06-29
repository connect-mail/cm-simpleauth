/*
 * cm-simpleauth
 * https://github.com/parroit/cm-simpleauth
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var Storage = require('jsonusersstorage');
var Q = require('q');
/*var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
*/
function authorize(storage, username, password) {
    if (!storage.ready) {
        return Q.reject('storage is not ready');
    }

    var getUser = storage.getUser(username);

    return getUser.then(function(user) {
        if (user && user.password === password) {
            return {
                user: user
            };
        }
    });

}

function simpleAuth(configFile) {
    var storage,authInstance;
    var storageReady = Q.defer();

    function onReady() {
        storage.ready = true;
        storageReady.resolve(true);
    }

    storage = new Storage({
        file: configFile,
        onReady: onReady
    });

    authInstance = {
        storage: storage,
        install: function(app) {
            app.authorize(authorize.bind(null, storage));
            return storageReady;
        }
    };
    
    return authInstance;

}

//assign(simpleAuth, new EventEmitter());



module.exports = simpleAuth;

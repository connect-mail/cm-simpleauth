/*
 * cm-simpleauth
 * https://github.com/parroit/cm-simpleauth
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var Storage = require('jsonusersstorage');

function authorize(storage, req) {
    req.on('authorizeUser', function(connection, username, password, callback) {
        if (!storage.ready) {
            return callback(new Error('storage is not ready'));
        }

        var getUser = storage.getUser(username);

        getUser.then(function(user) {
            if (user && user.password === password) {
                req.user = user;
                //user authenticate successfully
                callback(null, true);
            } else {
                //authentication failed
                callback(null, false);
            }
        }).catch(callback);


    });

}

function simpleAuth(configFile, onReady) {

    var storage = new Storage({
        file: configFile,
        onReady: function() {

            storage.ready = true;
            if (onReady) {
                onReady();
            }
        }
    });

    return authorize.bind(null, storage);

}

module.exports = simpleAuth;

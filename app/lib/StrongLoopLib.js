
/**
 * creates a STRONGLOOP ALLOY COLLECTION
 * 
 * @param {Object} _type - name of the associated collection in sl
 * @param {Object} _opts
 * @param {Object} _opts.baseURL
 */
function createStrongLoopCollection(_type, _opts) {
    var Q = require('q');
    var collection = Alloy.createCollection("StrongLoop");

    collection.__type = _type || null;
    collection.__opts = _opts || {};


    _.extend(collection, {
        baseURL : function() {
            return collection.__opts.baseURL || "http://33.33.33.10:3000/api/" + collection.__type;
        },

        _promiseFetch : function(_model, _deferred, _options) {

            var deferred = _deferred;
            var thisModel = _model;

            function error(_error, _errorText) {
                return deferred.reject(_error);
            }

            function success(_model, _text) {
                if (_options.JSONOnly) {
                    return deferred.resolve(_model);
                } else {
                    thisModel.reset(_model, {
                        silent : true
                    });
                    return deferred.resolve(thisModel);
                }
            }

            _options = _options || {
                data : null
            };
            _options.url = _options.url || this.baseURL();
            _options.success = success;
            _options.error = error;

            thisModel.sync("read", thisModel, _options);

            return deferred.promise;
        },
        // extended functions and properties go here
        get : function(_id) {

            var _options = {
                data : null
            };
            _options.url = this.baseURL() + "/" + _id;
            return this._promiseFetch(this, Q.defer(), _options);
        },
        findOne : function(_id) {

            var _options = {
                data : null
            };
            _options.url = this.baseURL() + "/findOne";
            return this._promiseFetch(this, Q.defer(), _options);
        },
        exists : function(_id) {

            var _options = {
                data : null
            };
            _options.url = this.baseURL() + "/" + _id + "/exists";
            return this._promiseFetch(this, Q.defer(), _options);
        },
        count : function() {

            var _options = {
                data : null
            };
            _options.url = this.baseURL() + "/count";
            _options.JSONOnly = true;
            return this._promiseFetch(this, Q.defer(), _options);
        },
        fetch : function(_options) {

            _options = _options || {
                data : null
            };
            _options.url = _options.url || this.baseURL();
            return this._promiseFetch(this, Q.defer(), _options);
        }
    });
    return collection;

}

/**
 * creates a STRONGLOOP ALLOY MODEL
 * 
 * @param {Object} _type - name of the associated collection in sl
 * @param {Object} _opts
 * @param {Object} _opts.baseURL
 */

function createStrongLoopModel(_type, _opts) {
    var Q = require('q');
    var model = Alloy.createModel("StrongLoop");
    model.__type = _type || null;
    model.__opts = _opts || {};

    if (_type === "users") {

        _.extend(model, {

            // extended functions and properties go here
            login : function(_params) {

                var _options = {
                    data : _params
                };
                _options.url = this.baseURL() + "/login";

                return this._promiseSync("create", this, Q.defer(), _options);

            }
        });

    }

    _.extend(model, {
        baseURL : function() {
            return model.__opts.baseURL || "http://33.33.33.10:3000/api/" + model.__type;
        },
        _promiseSync : function(_method, _model, _deferred, _options) {

            var deferred = _deferred;
            var thisModel = _model;

            function error(_error, _errorText) {
                return deferred.reject(_error);
            }

            function success(_model, _text) {
                thisModel.set(_model, {
                    silent : true
                });
                return deferred.resolve(thisModel);
            }

            _options = _options || {
                data : null
            };
            _options.url = _options.url || this.baseURL();
            _options.success = success;
            _options.error = error;

            thisModel.sync(_method, thisModel, _options);

            return deferred.promise;
        },
        get : function(_id) {

            var _options = {
                data : null
            };
            _options.url = this.baseURL() + "/" + _id;

            return this._promiseSync("read", this, Q.defer(), _options);
        },
        findOne : function(_id) {

            var _options = {
                data : null
            };
            _options.url = this.baseURL() + "/" + _id + "/exists";
            return this._promiseSync("read", this, Q.defer(), _options);
        },
        fetch : function(_options) {

            _options = _options || {
                data : null
            };
            _options.url = _options.url || this.baseURL();
            return this._promiseSync("read", this, Q.defer(), _options);
        },
        save : function(_options) {

            _options = _options || {};
            _options.url = _options.url || this.baseURL();

            return this._promiseSync("create", this, Q.defer(), _options);
        },
    });

    return model;

}

exports.createStrongLoopCollection = createStrongLoopCollection;
exports.createStrongLoopModel = createStrongLoopModel;


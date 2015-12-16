var qs = require('querystring');

var debug   = require('debug')('oauth-request');
var request = require('request-promise');
var OAuth   = require('oauth-1.0a');

module.exports = OAuthRequest;

function OAuthRequest(opt) {
    if(!(this instanceof OAuthRequest)) {
        return new OAuthRequest(opt);
    }

    this.token = opt.token || {};

    this.oauth = OAuth(opt);

    this._log('#init', this);
}

/**
 * debug
 * 
 * @api private
 */
OAuthRequest.prototype._log = debug;

/**
 * set oauth token
 * @param {String/Object} token
 */
OAuthRequest.prototype.setToken = function(token) {
    this._log('#setToken', token);

    if(typeof token === 'string') {
        return this.token.public = token;
    }

    //object
    return this.token = token;
};

OAuthRequest.prototype._validate = function(opt) {
    if(typeof opt == 'string') {
        return {url: opt};
    }

    if(!(opt.url)) {
        throw new Error('url is required');
    }

    return opt;
};

OAuthRequest.prototype.get = function(opt, callback) {
    opt = this._validate(opt);

    var request_data = {
        url: opt.url,
        method: 'GET',
        data: opt.qs
    };

    //override
    opt.qs = this.oauth.authorize(request_data, this.token);
    opt.method = request_data.method;

    if(!callback) {
        return request(opt);
    }

    this._log('#get', opt);

    return request(opt, callback);
};

OAuthRequest.prototype.post = function(opt, callback) {
    opt = this._validate(opt);

    var request_data = {
        url: opt.url,
        method: 'POST',
        data: opt.form
    };

    //override
    opt.body = qs.stringify(this.oauth.authorize(request_data, this.token))
        .replace(/\!/g, "%21")
        .replace(/\*/g, "%2A")
        .replace(/\'/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29");

    opt.method = request_data.method;

    if(opt.headers) {
        opt.headers['content-type'] = 'application/x-www-form-urlencoded';
    } else {
        opt.headers = {
            'content-type': 'application/x-www-form-urlencoded'
        };
    }

    //delete
    delete opt.form;
    delete opt.oauth;

    this._log('#post', opt);

    if(!callback) {
        return request(opt);
    }

    return request(opt, callback);
};

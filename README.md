oauth-request [![Build Status](https://travis-ci.org/ddo/oauth-request.svg)](https://travis-ci.org/ddo/oauth-request)
=============

> OAuth 1.0a via [request](https://github.com/mikeal/request)

[![NPM version](https://badge.fury.io/js/oauth-request.png)](http://badge.fury.io/js/oauth-request)
[![Dependency Status](https://david-dm.org/ddo/oauth-request.png?theme=shields.io)](https://david-dm.org/ddo/oauth-request)

[![Coverage Status](https://coveralls.io/repos/ddo/oauth-request/badge.png?branch=master)](https://coveralls.io/r/ddo/oauth-request?branch=master)
[![Code Climate](https://codeclimate.com/github/ddo/oauth-request.png)](https://codeclimate.com/github/ddo/oauth-request)

## Installation

```
npm i oauth-request --save
```

## Usage

```js
var crypto = require('crypto');
var OAuth = require('oauth-request');

var twitter = OAuth({
    consumer: {
        key: 'xxxxx',
        secret: 'xxxxx'
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

twitter.setToken({
    key: 'xxxxx',
    secret: 'xxxxx'
});

//list user timeline
twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json', function(err, res, tweets) {
    console.log(tweets);
});

//list user timeline limit 5
twitter.get({
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
    qs: {
        count: 5
    },
    json: true
}, function(err, res, tweets) {
    console.log(tweets);
});
```

## [Example](/example.js)

## Options

check [oauth-1.0a](https://github.com/ddo/oauth-1.0a#options) options

## API

### ``.get()``

* .get(url, callback)
* .get([request options](https://github.com/mikeal/request#requestoptions-callback), callback)
* .get(url or request options) (no callback) return request object

### ``.post()``

* .post(url, callback)
* .post([request options](https://github.com/mikeal/request#requestoptions-callback), callback)
* .get(url or request options) (no callback) return request object

### ``.setToken(oauth_token)``

* ``oauth_token``: ``String`` token key

```js
twitter.setToken('xxxxx');
```

* ``oauth_token``: ``Object``

```js
twitter.setToken({
    key: 'xxxxx',
    secret: 'xxxxx'
});
```

## TODO

* [ ] ``.stream``
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
var OAuth = require('oauth-request');

var twitter = OAuth({
    consumer: {
        public: 'xxxxx',
        secret: 'xxxxx'
    }
});

twitter.setToken({
    public: 'xxxxx',
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

## API

### ``.get()``

* .get(url, callback)
* .get([request options](https://github.com/mikeal/request#requestoptions-callback), callback)

### ``.post()``

* .post(url, callback)
* .post([request options](https://github.com/mikeal/request#requestoptions-callback), callback)

## TODO

* [ ] ``.stream``
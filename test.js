var expect = require('chai').expect;

var OAuthRequest = require('./');

describe("oauth-request", function() {
    var twitter = OAuthRequest({
        consumer: {
            public: process.env.TWITTER_CONSUMER_PUBLIC,
            secret: process.env.TWITTER_CONSUMER_SECRET
        },
        token: {
            public: process.env.TWITTER_TOKEN_PUBLIC,
            secret: process.env.TWITTER_TOKEN_SECRET
        }
    });

    describe("#get tweets", function() {
        it("should be return 20 tweets", function(done) {
            
            twitter.get({
                url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
                json: true
            }, function(err, res, tweets) {
                
                expect(tweets).to.be.an('array').that.have.length(20);
                expect(tweets[0]).to.have.property('id');
                expect(tweets[0]).to.have.property('created_at');
                done();
            });
        });
    });

    describe("#setToken token public", function() {
        twitter = OAuthRequest({
            consumer: {
                public: process.env.TWITTER_CONSUMER_PUBLIC,
                secret: process.env.TWITTER_CONSUMER_SECRET
            }
        });

        twitter.setToken(process.env.TWITTER_TOKEN_PUBLIC);

        it("token public should be set", function() {
            expect(twitter.token).to.have.property('public', process.env.TWITTER_TOKEN_PUBLIC);
        });
    });

    describe("#setToken", function() {
        twitter = OAuthRequest({
            consumer: {
                public: process.env.TWITTER_CONSUMER_PUBLIC,
                secret: process.env.TWITTER_CONSUMER_SECRET
            }
        });

        twitter.setToken({
            public: process.env.TWITTER_TOKEN_PUBLIC,
            secret: process.env.TWITTER_TOKEN_SECRET
        });

        it("token should be set", function() {
            expect(twitter.token).to.have.property('public', process.env.TWITTER_TOKEN_PUBLIC);
            expect(twitter.token).to.have.property('secret', process.env.TWITTER_TOKEN_SECRET);
        });
    });

    describe("#get 5 tweets", function() {
        it("should be return 5 tweets", function(done) {
            
            twitter.get({
                url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
                qs: {
                    count: 5
                },
                json: true
            }, function(err, res, tweets) {
                
                expect(tweets).to.be.an('array').that.have.length(5);
                expect(tweets[0]).to.have.property('id');
                expect(tweets[0]).to.have.property('created_at');
                done();
            });
        });
    });

    var tweet_id;
    var message = 'Yay_-....!!!';

    describe("#post new tweet", function() {
        it("should create a new tweet", function(done) {
            
            twitter.post({
                url: 'https://api.twitter.com/1.1/statuses/update.json',
                form: {
                   status: message 
                },
                json: true
            }, function(err, res, tweet) {
                tweet_id = tweet.id_str;

                expect(tweet).to.have.property('id');
                expect(tweet).to.have.property('created_at');
                expect(tweet).to.have.property('text', message);
                done();
            });
        });
    });

    describe("#delete tweet", function() {
        it("should delete that new tweet", function(done) {
            
            twitter.post({
                url: 'https://api.twitter.com/1.1/statuses/destroy/' + tweet_id + '.json',
                json: true
            }, function(err, res, tweet) {
                expect(tweet).to.have.property('id');
                expect(tweet).to.have.property('created_at');
                expect(tweet).to.have.property('text', message);
                done();
            });
        });
    });
});
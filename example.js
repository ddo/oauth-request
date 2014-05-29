var OAuthRequest = require('./');

var twitter = OAuthRequest({
    consumer: {
        public: process.env.TWITTER_CONSUMER_PUBLIC,
        secret: process.env.TWITTER_CONSUMER_SECRET
    }
});

twitter.setToken({
    public: process.env.TWITTER_TOKEN_PUBLIC,
    secret: process.env.TWITTER_TOKEN_SECRET
});

//list user timeline
twitter.get({
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
    json: true
}, function(err, res, tweets) {
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

//tweet
// var tweet_id;
// var message = 'Yay_-....!!!';

// twitter.post({
//     url: 'https://api.twitter.com/1.1/statuses/update.json',
//     form: {
//        status: message 
//     },
//     json: true
// }, function(err, res, tweet) {
//     tweet_id = tweet.id_str;
    
//     console.log(tweet);
// });

//delete above tweet
// twitter.post({
//     url: 'https://api.twitter.com/1.1/statuses/destroy/' + tweet_id + '.json',
//     json: true
// }, function(err, res, tweet) {
//     expect(tweet).to.have.property('id');
//     expect(tweet).to.have.property('created_at');
//     expect(tweet).to.have.property('text', message);
//     done();
// });

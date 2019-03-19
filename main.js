const twitter = require('twitter');
const cvsToJsonConverter = require('csvtojson');
const config = require('./config');

var client = new twitter(config);

cvsToJsonConverter()
    .fromFile('./tweets.csv')
    .on('error',(err)=>{
        console.log("Converting is failed. Error:");
        console.log(err);
    })
    .on('data',(data)=>{
        let tmpRowJson = JSON.parse(data.toString('utf8'));
        let tmpTweetID = tmpRowJson.tweet_id;

        deleteTweet(tmpTweetID);
    })
    .on('done',(error)=>{
        postFinishedMessage();
    })

function deleteTweet(tweetID){
    client.post('statuses/destroy', {id: tweetID},  function(error, tweet, response) {
        if(error){
            console.log("Deleting is failed. Error:");
            console.log(error);
        }else{
            console.log("Deleted tweet: " + tweetID);
        }
    });
}

function postFinishedMessage(){
    client.post('statuses/update', {status: 'Hello Twitter! #myfirstTweet github.com/cankatabaci/clean-twitter'}, function(error, tweet, response) {
        if (!error) {
        console.log("Cleaning is finished");
        console.log(tweet.text);
        }
    });
}
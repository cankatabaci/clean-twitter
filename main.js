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
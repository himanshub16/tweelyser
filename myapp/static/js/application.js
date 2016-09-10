// verbose list of tweet objects most recent tweets by the user (includes retweets) : max 200
var TWEET_LIST = null;

var TWEET_RETWEET_COUNT_LIST = null;
var TWEET_FAVORITE_COUNT_LIST = null;
var TWEET_DATE_LIST = null;

// verbose list of tweet objects of retweets by the user
var RETWEET_LIST = null;

// list of followers (id)
var FOLLOWER_LIST = null;

// list of followings (id)
var FOLLOWING_LIST = null;

// categorisation of tweet with time of day (0-11) 2 hour interval
var TWEET_WITH_TIME_OF_DAY = {
	"0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0
};

// tweet with max retweets (1)
var TWEET_WITH_MAX_RETWEETS = null;

// top three tweets based on no of likes
var TOP_THREE_TWEETS_FAV = null;

// average mentions made by me (includes tweets which have some mention)
var MENTION_FREQUENCY = null;

// average hashtags used by me (all tweets)
var HASHTAGS_FREQUENCY_ALL = null;

// average hashtags used by me (only ones containing hashtags)
var HASHTAGS_FREQUENCY = null;

// top 3 people mentioned the most by me (their user id)
var PEOPLE_MENTIONED_THE_MOST_BY_ME = null;

// categorisation of tweets on the basis of their length
var TWEET_LENGTH_LIST = {
	"0-30":null, "30-50": null, "50-100": null, "100-120": null, "120-150": null
};


// create dummy elements to hold data
function createHiddenElement(id) {
	var el = document.createElement('div');
	el.style.display = "none";
	el.setAttribute('id', id);
	return el;
}


function run_analysis() {

}

function getTweets() {
	xhr = $.ajax({
		url: "/show",
		success: function(data, status, xhr) {
			TWEET_LIST = xhr.responseJSON;
			TWEET_RETWEET_COUNT_LIST = [];
			TWEET_FAVORITE_COUNT_LIST = [];


			for (var i = 0; i < TWEET_LIST.length; i++) {
				var d = new Date( TWEET_LIST[i].created_at )
				var hour = d.getHours();

				TWEET_WITH_TIME_OF_DAY[~~(hour/2)] ++;

				if (TWEET_LIST[i].favorite_count !== 0) {
					TWEET_RETWEET_COUNT_LIST.push( TWEET_LIST[i].retweet_count );
					TWEET_FAVORITE_COUNT_LIST.push( TWEET_LIST[i].favorite_count );
				}
			}
		}
	});
}


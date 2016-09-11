// verbose list of tweet objects most recent tweets by the user (includes retweets) : max 200
var TWEET_LIST = null;

var TWEET_RETWEET_COUNT_LIST = null;
var TWEET_FAVORITE_COUNT_LIST = null;
var TWEET_DATE_LIST = null;

var USER_INFO = null;
var FOLLOWER_COUNT = 0; 
var FOLLOWING_COUNT = 0;


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

var TWEET_WITH_TIME_OF_DAY_ARRAY = [
	{ "interval": "0", "tweet_count": 0 },
	{ "interval": "1", "tweet_count": 0 },
	{ "interval": "2", "tweet_count": 0 },
	{ "interval": "3", "tweet_count": 0 },
	{ "interval": "4", "tweet_count": 0 },
	{ "interval": "5", "tweet_count": 0 },
	{ "interval": "6", "tweet_count": 0 },
	{ "interval": "7", "tweet_count": 0 },
	{ "interval": "8", "tweet_count": 0 },
	{ "interval": "9", "tweet_count": 0 },
	{ "interval": "10", "tweet_count": 0 },
	{ "interval": "11", "tweet_count": 0 }
];

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
	"0-30":0, "30-50": 0, "50-100": 0, "100-120": 0, "120-140": 0
};

// tweets with-without media
var TWEETS_WITH_MEDIA = 0;
var TWEETS_WITHOUT_MEDIA = 0;

var TIME_GAP_BETWEEN_TWEETS = [];


// create dummy elements to hold data
function createHiddenElement(id) {
	var el = document.createElement('div');
	el.style.display = "none";
	el.setAttribute('id', id);
	return el;
}


function run_analysis() {

}

function getTweeetWithMaxRetweets() {
	console.log(TWEET_WITH_MAX_RETWEETS);
	$('#maxRetweet').html(TWEET_WITH_MAX_RETWEETS.text);
}


function getTweetsWithMedia() {
	$('#tweetsWithMedia').text(((TWEETS_WITH_MEDIA/(TWEETS_WITHOUT_MEDIA + TWEETS_WITH_MEDIA))*100).toFixed(2).toString() + " %")
}

//Bar Graph
function retweetVsFavorites() {
	var retweets = TWEET_RETWEET_COUNT_LIST.slice(0, 50);
	var favorites = TWEET_FAVORITE_COUNT_LIST.slice(0, 50);
	retweets.unshift('Retweets');
	favorites.unshift('Favorites');
	var chart = c3.generate({
		bindto: "#retweetsvsfav",
	    data: {
	        columns: [
	            retweets,
	            favorites
	        ],	
	        type: 'bar'
	    },
	    bar: {
	        width: {
	            ratio: 0.5 // this makes bar width 50% of length between ticks
	        }
	        // or
	        //width: 100 // this makes bar width 100px
	    }
	});
}

function timeBetweenTweets() {
	var dataSet = TIME_GAP_BETWEEN_TWEETS.slice(0,100);
	dataSet.unshift("Count");
	var chart = c3.generate({
	bindto: "#timeBetweenTweets",
    data: {
        // xs: {
        //     setosa: 'setosa_x',
        //     versicolor: 'versicolor_x',
        // },
        // iris data from R
        columns: [
        	dataSet
        ],
        type: 'scatter'
    },
    axis: {
        x: {
            label: 'Tweet index',
            tick: {
                fit: false
            }
        },
        y: {
            label: 'Hours Between Tweets'
        }
    }
});
}

//Pie 
function tweetLength() {
	var chart = c3.generate({
		bindto: "#tweetLength",
	    data: {
	        // iris data from R
	        columns: [
	            ['0-30',    TWEET_LENGTH_LIST["0-30"]    ],
	            ['30-50',   TWEET_LENGTH_LIST["30-50"]   ], 
	            ['50-100',  TWEET_LENGTH_LIST["50-100"]  ],
	            ['100-120', TWEET_LENGTH_LIST["100-120"] ],
	            ['120-150', TWEET_LENGTH_LIST["120-140"] ]	
	        ],
	        type : 'pie',
	        onclick: function (d, i) { console.log("onclick", d, i); },
	        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
	        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
	    }
	});
}

//Line 
function tweetWithTimeOfDayChart() {
	var chart = c3.generate({
	    bindto: '#getTimeOfDay',

	    data: {
		    columns: [
		    		['Tweet count', TWEET_WITH_TIME_OF_DAY[0],TWEET_WITH_TIME_OF_DAY[1],TWEET_WITH_TIME_OF_DAY[2],
			        				TWEET_WITH_TIME_OF_DAY[3],TWEET_WITH_TIME_OF_DAY[4],TWEET_WITH_TIME_OF_DAY[5],
			        				TWEET_WITH_TIME_OF_DAY[6],TWEET_WITH_TIME_OF_DAY[7],TWEET_WITH_TIME_OF_DAY[8],
			        				TWEET_WITH_TIME_OF_DAY[9],TWEET_WITH_TIME_OF_DAY[10],TWEET_WITH_TIME_OF_DAY[11] ]
	      		],
	      		type : 'spline',
	    	},
		axis: {
			x: {
		    	type: "category",
		    	categories: ["12 AM", "2 AM", '4 AM', '6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM']
			}
		}
	});
}

function setHashtagFreq() {
	$('#hashtagFrequency').text(HASHTAGS_FREQUENCY.toFixed(2));
}

//

//AJAX Query
function getTweets() {
	xhr = $.ajax({
		url: "/show",
		success: function(data, status, xhr) {
			TWEET_LIST = xhr.responseJSON;
			TWEET_RETWEET_COUNT_LIST = [];
			TWEET_FAVORITE_COUNT_LIST = [];

			var max_retweet = { "count": 0, "index": -1 };
			var total_hashtags = 0, tweets_with_hashtags = 0;

			for (var i = 0; i < TWEET_LIST.length; i++) {

				// get date
				var d = new Date( TWEET_LIST[i].created_at )
				var hour = d.getHours();

				// get hashtags
				var hashtags = TWEET_LIST[i].entities.hashtags;
				if (hashtags.length !== 0) {
					tweets_with_hashtags++;
					total_hashtags += hashtags.length;
				}

				// get tweets with time of day
				TWEET_WITH_TIME_OF_DAY[~~(hour/2)] ++;
				TWEET_WITH_TIME_OF_DAY_ARRAY[~~(hour/2)].tweet_count ++;

				if (TWEET_LIST[i].retweet_count >= max_retweet.count) {
					max_retweet.count++;
					max_retweet.index = i;
				}

				// get favorites and retweet count list 
				if (TWEET_LIST[i].favorite_count !== 0) {
					TWEET_RETWEET_COUNT_LIST.push( TWEET_LIST[i].retweet_count );
					TWEET_FAVORITE_COUNT_LIST.push( TWEET_LIST[i].favorite_count );
				}

				// tweet filter based on tweet length
				var tweet_length = TWEET_LIST[i].text.length;
				if (tweet_length < 30) {
					TWEET_LENGTH_LIST["0-30"]++;
				} else if (tweet_length < 50) {
					TWEET_LENGTH_LIST["30-50"]++;
				} else if (tweet_length < 100) {
					TWEET_LENGTH_LIST["50-100"]++;
				} else if (tweet_length < 120) {
					TWEET_LENGTH_LIST["100-120"]++;
				} else if (tweet_length < 140) {
					TWEET_LENGTH_LIST["120-140"]++;
				}

				// check if the tweet contains media
				if (TWEET_LIST[i].entities.media === undefined) {
					TWEETS_WITHOUT_MEDIA ++;
				}
				else {
					TWEETS_WITH_MEDIA ++;
				}
			}

			if (max_retweet.index >= 0) {
				TWEET_WITH_MAX_RETWEETS = TWEET_LIST[max_retweet.index];
			}

			// prepare json of tweet count with time of day
			// for (var i = 0; i < TWEET_WITH_TIME_OF_DAY.length; i++) {
			// 	TWEET_WITH_TIME_OF_DAY_ARRAY[i].tweet_count = TWEET_WITH_TIME_OF_DAY[i];
			// 	console.log(TWEET_WITH_TIME_OF_DAY[i] + 'it works');
			// }

			HASHTAGS_FREQUENCY = total_hashtags / tweets_with_hashtags;

			// get gap between tweets
			TIME_GAP_BETWEEN_TWEETS = [];
			for (var i = 1; i < TWEET_LIST.length; i++) {
				var time1 = new Date(TWEET_LIST[i].created_at);
				var time2 = new Date(TWEET_LIST[i-1].created_at);

				TIME_GAP_BETWEEN_TWEETS.push(((time2.getTime() - time1.getTime())/(60000*60)).toFixed(2));
			}
		},

		complete: function() {
			console.log('ajax completed');
			setHashtagFreq();
			tweetWithTimeOfDayChart();
			retweetVsFavorites();
			getTweetsWithMedia();
			getTweeetWithMaxRetweets();
			tweetLength();
			timeBetweenTweets();
		}
	});
}


function getUserData() {
	xhr = $.ajax({
		url: "/lookup",
		success: function(data, status, xhr) {
			USER_INFO = xhr.responseJSON[0];
			$('#userName').text(USER_INFO.name);
			$('#screenName').text("@"+USER_INFO.screen_name);
			$('#userProfilePic').attr('src', USER_INFO.profile_image_url.replace("_normal", ''));

			var followers = USER_INFO.followers_count; 
			var following = USER_INFO.friends_count;
			var ratio = (followers/following).toFixed(2);
			console.log(ratio);
			$('#followersToFollowing').text(ratio.toString());
		},

		complete: function() {
			console.log('ajax completed');
		}
	});
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


getTweets();
getUserData();


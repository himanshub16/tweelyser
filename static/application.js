var totalItems = 12; // total analysis dones
var rendered = 0; // count of items/charts whose rendering is complete

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// verbose list of tweet objects most recent tweets by the user (includes retweets) : max 200
var TWEET_LIST = null;

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

var TWEET_WITH_INTERVAL_OF_DAY = {
	"morning":0, "day":0, "evening":0, "night":0
}

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
var TWEET_RETWEET_FAV_COUNT_LIST = [];




// reset all variables
function resetVariables() {
	totalItems = 12; // total analysis dones
	rendered = 0; // count of items/charts whose rendering is complete

	// verbose list of tweet objects most recent tweets by the user (includes retweets) : max 200
	TWEET_LIST = null;

	TWEET_DATE_LIST = null;

	USER_INFO = null;
	FOLLOWER_COUNT = 0; 
	FOLLOWING_COUNT = 0;


	// verbose list of tweet objects of retweets by the user
	RETWEET_LIST = null;

	// list of followers (id)
	FOLLOWER_LIST = null;

	// list of followings (id)
	FOLLOWING_LIST = null;

	// categorisation of tweet with time of day (0-11) 2 hour interval
	TWEET_WITH_TIME_OF_DAY = {
		"0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0
	};

	var TWEET_WITH_INTERVAL_OF_DAY = {
		"morning":0, "day":0, "evening":0, "night":0
	}

	TWEET_WITH_TIME_OF_DAY_ARRAY = [
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
	TWEET_WITH_MAX_RETWEETS = null;

	// top three tweets based on no of likes
	TOP_THREE_TWEETS_FAV = null;

	// average mentions made by me (includes tweets which have some mention)
	MENTION_FREQUENCY = null;

	// average hashtags used by me (all tweets)
	HASHTAGS_FREQUENCY_ALL = null;

	// average hashtags used by me (only ones containing hashtags)
	HASHTAGS_FREQUENCY = null;

	// top 3 people mentioned the most by me (their user id)
	PEOPLE_MENTIONED_THE_MOST_BY_ME = null;


	// categorisation of tweets on the basis of their length
	TWEET_LENGTH_LIST = {
		"0-30":0, "30-50": 0, "50-100": 0, "100-120": 0, "120-140": 0
	};

	// tweets with-without media
	TWEETS_WITH_MEDIA = 0;
	TWEETS_WITHOUT_MEDIA = 0;

	TIME_GAP_BETWEEN_TWEETS = [];
	TWEET_RETWEET_FAV_COUNT_LIST = [];

	$("#hashtagFreqDataCount").text("");
	$("#tweetsWithMediaCount").text("");
	$("tweetWithTimeOfDayCount").text("");
	$("timeGapBetweenTweetsCount").text("");
}


// create dummy elements to hold data
function createHiddenElement(id) {
	var el = document.createElement('div');
	el.style.display = "none";
	el.setAttribute('id', id);
	return el;
}

function getTweeetWithMaxRetweets() {
	$('#maxRetweet').html(TWEET_WITH_MAX_RETWEETS.text);
}

function getTweetsWithMedia() {
	$('#tweetsWithMedia').text(((TWEETS_WITH_MEDIA/(TWEETS_WITHOUT_MEDIA + TWEETS_WITH_MEDIA))*100).toFixed(2).toString() + " %")
	$("#tweetsWithMediaCount").text(TWEET_LIST.length);
}

//Bar Graph
function retweetVsFavorites() {
	$("#retweetsvsfavCount").text(TWEET_RETWEET_FAV_COUNT_LIST.length);
	var chart = c3.generate({
		bindto: "#retweetsvsfav",
	    data: {
	        json: TWEET_RETWEET_FAV_COUNT_LIST,
			keys: {
				"value": [ "retweets", "favorites" ]
			},
			onclick: function(d) {
				tweet = TWEET_RETWEET_FAV_COUNT_LIST[d.index];
				showBottomPopup("Retweets vs Favorites", ["Retweets : " + tweet.retweets + "  Favorites : " + 
					 tweet.favorites.toString()], [tweet.link], tweet.content);
			},
	        type: 'bar'
	    },
	    bar: {
	        width: {
	            ratio: 0.8 // this makes bar width 50% of length between ticks
	        }
	    },
		tooltip: {
			format: {
				title: function (d) { return '# ' + d; }
			}
		},
		zoom: {
			enabled: true
		}
	});
}

function timeBetweenTweets() {
	$("#timeGapBetweeenTweetsCount").text(TIME_GAP_BETWEEN_TWEETS.length + 1); // that's intentional 
	// finding out which attribute should be shown initially 
	var zeroHours = TIME_GAP_BETWEEN_TWEETS.filter(function(o) { return (o.gapHours < 0.5); }).length;
	var zeroMinutes = TIME_GAP_BETWEEN_TWEETS.filter(function(o) { return (o.gapMinutes < 0.5); }).length;
	var zeroDays = TIME_GAP_BETWEEN_TWEETS.filter(function(o) { return (o.gapDays < 0.5); }).length;
	console.log(zeroHours, zeroMinutes, zeroDays);
	var hidden = null;
	switch(Math.max(...[zeroHours, zeroDays, zeroMinutes])) {
		case zeroHours: hidden = ["gapDays", "gapMinutes"]; break;
		case zeroMinutes: hidden = ["gapDays", "gapHours"]; break;
		case zeroDays: hidden = ["gapHours", "gapMinutes"]; break;
		default: console.log("fucked up");
	}
	console.log(hidden);
	var chart = c3.generate({
		bindto: "#timeBetweenTweets",
		data: {
			json: TIME_GAP_BETWEEN_TWEETS,
			keys: {
				"value": [ "gapHours", "gapMinutes", "gapDays" ]
			},
			type: 'scatter',
			names: {
				gapHours: "In hours",
				gapMinutes: "In minutes",
				gapDays: "In days"
			},
			hide: hidden,
			onclick: function(d) {
				var obj = TIME_GAP_BETWEEN_TWEETS[d.index];
				var content = "<p>"+obj.tweet1+"</p>" + "<div class='clearfix'></div><div class='divider'></div><div class='clearfix'></div>" + "<p>"+obj.tweet2+"</p>";
				var subheading = obj.time1 + "<div class='clearfix'></div><div class='divider'></div><div class='clearfix'></div>" + obj.time2;
				showBottomPopup("Time between successive tweets", [obj.time1, obj.time2], [obj.link1, obj.link2], content);
				console.log(d);
			}
		},
		axis: {
			x: {
				label: 'Tweet index',
				tick: {
					fit: true
				}
			},
			y: {
				label: 'Time Between Tweets'
			}
		},
		tooltip: {
			format: {
				value: function(value, ratio, id) {
					if (id === "gapHours")
						return value + " hours";
					else if (id === "gapMinutes")
						return value + " minutes";
					else if (id === "gapDays")
						return value + " days";
				},
				title: function(x) {
					return (x+1) + ' and ' + (x+2);
				}
			}
		},
		zoom: {
			enabled: true
		}
	});
}

//Pie 
function tweetLength() {
	$("#characterCountCount").text(TWEET_LIST.length.toString());
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
	        type : 'pie'
	    }
	});
}

//Pie 
function tweetActivity() {
	$("#activityHoursCount").text(TWEET_LIST.length);
	var chart = c3.generate({
		bindto: "#tweetActivity",
	    data: {
	        // iris data from R
	        columns: [
	            ['Early riser (6 AM to 10 AM)',  TWEET_WITH_INTERVAL_OF_DAY.morning ],
	            ['Office hours (10 AM to 4 PM)', TWEET_WITH_INTERVAL_OF_DAY.day 	], 
	            ['After office (4 PM to 9 PM)',  TWEET_WITH_INTERVAL_OF_DAY.evening	],
	            ['Night owl (9 PM to 6 AM)', 	 TWEET_WITH_INTERVAL_OF_DAY.night 	]	
	        ],
	        type : 'pie'
	    }
	});
}

//Line 
function tweetWithTimeOfDayChart() {
	$("#tweetWithTimeOfDayCount").text(TWEET_LIST.length);
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
	$('#hashtagFrequency').text(HASHTAGS_FREQUENCY.toFixed(2) + " (" + HASHTAGS_FREQUENCY_ALL.toFixed(2) + ") ");
	$("#hashtagFreqDataCount").text(TWEET_LIST.length);
}

//

//AJAX Query
function getTweets(screen_name) {
	xhr = $.ajax({
		url: "/show/"+screen_name,
		success: function(data, status, xhr) {
			try {
				TWEET_LIST = xhr.responseJSON;
			} catch (TypeError) {
				failedToFind();
				rendered -= 1;
				return ;
			}

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

				// predict nature of person with tweet activiy
				if (hour > 6 && hour < 10) TWEET_WITH_INTERVAL_OF_DAY.morning++;
				else if (hour >= 10 && hour < 14) TWEET_WITH_INTERVAL_OF_DAY.day++;
				else if (hour >= 14 && hour < 21) TWEET_WITH_INTERVAL_OF_DAY.evening++;
				else TWEET_WITH_INTERVAL_OF_DAY.night++;

				if (TWEET_LIST[i].retweet_count >= max_retweet.count) {
					max_retweet.count++;
					max_retweet.index = i;
				}

				// get favorites and retweet count list 
				if (TWEET_LIST[i].favorite_count !== 0) {
					TWEET_RETWEET_FAV_COUNT_LIST.push({ 
						"content": TWEET_LIST[i].text, 
						"retweets": TWEET_LIST[i].retweet_count,
						"favorites": TWEET_LIST[i].favorite_count,
						"link": "https://twitter.com/statuses/" + TWEET_LIST[i].id_str
					});
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
			HASHTAGS_FREQUENCY_ALL = total_hashtags / TWEET_LIST.length;

			// get gap between tweets
			TIME_GAP_BETWEEN_TWEETS = [];
			for (var i = 1; i < TWEET_LIST.length; i++) {
				var time1 = (new Date(TWEET_LIST[i].created_at));
				var time2 = (new Date(TWEET_LIST[i-1].created_at));

				TIME_GAP_BETWEEN_TWEETS.push({
					"time1": time1.toLocaleString(),
					"time2": time2.toLocaleString(),
					"gapMinutes": Number( ( (time2.getTime() - time1.getTime()) / (1000 * 60 ) ).toFixed(2) ),
					"gapHours": Number( ( (time2.getTime() - time1.getTime()) / (1000 * 60 * 60) ).toFixed(2) ),
					"gapDays": Number( ( (time2.getTime() - time1.getTime()) / (1000 * 60 * 60 * 24 ) ).toFixed(2) ),
					"tweet1": TWEET_LIST[i].text,
					"tweet2": TWEET_LIST[i-1].text,
					"link1": "https://twitter.com/statuses/" + TWEET_LIST[i].id_str,
					"link2": "https://twitter.com/statuses/" + TWEET_LIST[i-1].id_str
				});
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
			tweetActivity();
			timeBetweenTweets();
			rendered += 8;

			if (rendered == totalItems) hideLoaders();
		}
	});
}


function getUserData(screen_name) {
	xhr = $.ajax({
		url: "/lookup/"+screen_name,
		success: function(data, status, xhr) {
			try {
				USER_INFO = xhr.responseJSON[0];
			} catch (TypeError) {
				failedToFind();
				rendered -= 1;
				return;
			}
			var followers = USER_INFO.followers_count; 
			var following = USER_INFO.friends_count;
			var ratio = (followers/following).toFixed(2);

			$('#userName').text(USER_INFO.name);
			$('#screenName').text("@"+USER_INFO.screen_name);
			$('#userProfilePic').attr('src', USER_INFO.profile_image_url_https.replace("_normal", ''));
			$('#followersToFollowing').text(ratio.toString());
			$("#tweetCount").text(USER_INFO.statuses_count.toString());
			// var d = new Date(Date.parse(USER_INFO.created_at));
			$("#usingTwitterSince").text( (new Date(Date.parse(USER_INFO.created_at))).toLocaleDateString() );
			$("#followerCount").text(followers.toString());
			$("#followingCount").text(following.toString());
		},

		complete: function() {
			console.log('ajax completed');
			rendered += 4;
			if (rendered == totalItems) hideLoaders();
		}
	});
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	if (exdays != 0)
		document.cookie = cname + "=" + cvalue + "; " + expires;
	else 
		document.cookie = cname + "=" + cvalue + ";";		
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

function refreshData(username) {
	if (username === undefined) {
		username = document.getElementById("currentUserScreenName").value;
	}
	rendered = 0;
	resetVariables();
	showLoaders();
	console.log("fetching data for " + username);
	window.scrollTo(0, 0);
	try {
		getUserData(username);
		getTweets(username);
	} catch (TypeError) {
		console.log("Error occured");
	}
	$(".modal").modal();
}

document.getElementById("screenNameInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
	if (this.value.length == 0) return;
    if (event.keyCode == 13) {
		if (this.value.startsWith('@')) 
			refreshData(this.value.slice(1));
		else 
			refreshData(this.value);
    }
});

document.getElementById("profileCard")
	.addEventListener("click", function() {
		window.open("https://twitter.com/" + USER_INFO.screen_name);
});


function showBottomPopup(heading, subheading, link, content) {
	if (link.length == 0) return;
	if (subheading.length == 0) return;
	if (link.length == 1 && subheading.length == 1) {
		$("#popup-link").attr("href", link[0]);
		$("#popup-subheading").html(subheading[0]);
		$("#another")[0].style.display = "none";
	}
	else if (link.length == 2 && subheading.length == 2) {
		$("#popup-link").attr("href", link[0]);		
		$("#popup-subheading").html(subheading[0]);
		$("#popup-subheading-1").html(subheading[1]);
		$("#popup-link-1").attr("href", link[1]);		
		$("#another")[0].style.display = "block";
	}
	$("#popup-heading").text(heading);
	$("#popup-content").html(content);
	$("#popup-trigger").click();
}

function hideLoaders() {
	$('.preloader-background').delay(1700).fadeOut('slow');	
	$('.preloader-wrapper').delay(1700).fadeOut();
	$('#preloader-not-found-data').fadeOut();
}

function showLoaders() {
	$('#preloader-not-found-data').fadeOut();	
	$('.preloader-background').delay(1000).fadeIn('slow');
	$('.preloader-wrapper').delay(1000).fadeIn('slow');
}

function failedToFind() {
	$('.preloader-wrapper').delay(1000).fadeOut();	
	$('.preloader-background').fadeIn();
	$('#preloader-not-found-data').fadeIn('slow');
}

refreshData();
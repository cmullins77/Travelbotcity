
var Twit = require('twit');


var T = new Twit({consumer_key:'j82XgsiCTa3qmymcLGdYAhxjh',
    consumer_secret:'qfJOxXzSZXYdPFPQB6KaMRau1kecaBCLI2sNE3HoeFrqE75yoN',
    access_token:'793683078392737792-LhRbg7WIsykGlUEXBRrUdoHe2zggx9L',
    access_token_secret:'iNXhACqnoEGsi0WEdBtelemA3rk9zewsXvZ1iM8telMcM',});
var foundCity = false;
var foundCountry = false;
var lat = (Math.random() * 180) - 90;
var lng = (Math.random() * 180) - 90;
var apiKey = "AIzaSyCevg6THIrAX0rpXyNmbZEWAmPOSdS25EA";
var call = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
var url = call + lat + "," + lng + "&key=" + apiKey;
var message = "";
var country = "";
var city = "";
var request = require("request")
var firstPart = {url: url, json: true};
var placeURL;
var placeFirstPart;
var user = "";
var prevUser = "CassieLynn777";
var count = 0;
var tags = [" #Vacation", " #PerfectPlace", " #Exploration", " #WondersOftheWorld", " #SmellTheRoses", " #TakeABreak", " #MustSee", " #Travel"];

function checkSearch() {
	var tweetFound = false;
	var tagsSearch = {q: "@Travelbotcity" , count: 10, result_type: "recent"};  // Looks for the laters tweets with the hashtag
	T.get('search/tweets', tagsSearch, function (error, data) {
		console.log("Checking Tweets");
	  // If our search request to the server had no errors...
	  if (!error && data.statuses.length > 0) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var userName = data.statuses[0].user.screen_name;
		if (userName != "travelbotcity" && userName != prevUser) {
			console.log(userName);
			user = "@"  + userName + " ";
			prevUser = userName;
			tweetFound = true;
		} else {
			user = "";
		}
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
	if (tweetFound) {
		console.log("Replying");
	} else {
		console.log("No Tweets");
	}
}

//Check for tweets
var tagsSearch = {q: "@Travelbotcity" , count: 10, result_type: "recent"};  // Looks for the laters tweets with the hashtag
function search() {	
	T.get('search/tweets', tagsSearch, function (error, data) {
		console.log("Checking Tweets");
	  // If our search request to the server had no errors...
	  if (!error && data.statuses.length > 0) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var userName = data.statuses[0].user.screen_name;
		if (userName != "travelbotcity" && userName != prevUser) {
			console.log(userName)
			user = "@"  + userName + " ";
			prevUser = userName;
			tweetFound = false;
		} else {
			user = "";
		}
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}


//Decide whether to post random location or location from the array:
var choice = false;
function tweetTime() {
	user = "";
	if (choice) {
		pictureTweet();
		tweeting();
		choice = false;
	} else {
		pictureTweet();
		tweetSpecific();
		choice = true;
	}
}

//Tweet Specific:
function tweetSpecific() {
	var cityList = ["Atlanta", "Paris", "London", "Berlin", "Venice", "Florence", "Rome", 
	"Krakow", "Prague", "Beijing", "Saint Petersberg", "Istanbul", "Chicago", "Houston", "Boston", "Madrid",
	"Bucharest", "Vienna", "Hamburg", "Salzburg", "Budapest", "Warsaw", "Barcelona", "Munich", "Milan", "Stockholm", "Malmo", "Copenhagen",
	"Brussels", "Sofia", "Helsinki", "Athens", "Dublin", "Galsgow", "Amsterdam", "Lisbon", "Oxford", "Cardiff", "Seoul", "Tokyo", "Kyoto", "Delhi",
	"Cairo", "Washington DC", "New York City"];
	var countryList = ["United+States", "France", "England", "Germany", "Italy", "Italy", "Italy", 
	"Poland", "Czech+Republic", "China", "Russia", "Turkey", "United+States", "United+States", "United+States", "Spain",
	"Romania", "Austria", "Germany", "Austria", "Hungary", "Poland", "Spain", "Germany", "Italy", "Sweden", "Sweden", "Denmark",
	"Belgium", "Bulgaria", "Finland", "Greece", "Ireland", "Scotland", "Netherlands", "Portugal", "England", "Wales", "South+Korea", "Japan", "Japan", "India",
	"Egypt", "United+States", "United+States"];
	var number = Math.floor(Math.random() * (cityList.length));
	city = cityList[number];
	country = countryList[number];
	countryList = countryList[number];
	var cityParts = city.split(" ");
    var cityTag = city;
    if (cityParts.length > 1) {
    	cityTag = "";
    	for (var k = 0; k < cityParts.length; k++) {
    		cityTag = cityTag + cityParts[k];
    	}
    }
    number = Math.floor(Math.random() * (tags.length));
	message = city + ", " + country + "! #" + cityTag + tags[number];
	placeURL = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=points+of+interst+in+" + city + "+" + country + "&key=" + apiKey;
    placeFirstPart = {url: placeURL, json: true};
    console.log(url);
    request(placeFirstPart, placeDetails);
}

//Tweet Random:
function tweeting() {
	foundCountry = false;
	foundCity = false;
	var lat = (Math.random() * 180) - 90;
	var lng = (Math.random() * 180) - 90;
var apiKey = "AIzaSyB3UcjY1uvLl9RVJ_h70nZ-Mm5fWeOfoNQ";
var call = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
var url = call + lat + "," + lng + "&key=" + apiKey;
var message = "None";
var country = "";
var city = "";
var firstPart = {url: url, json: true};
    console.log(url);
	request(firstPart, getLocation);
}

//Find address of gps coords
function getLocation(error, response, body) {
	console.log("called get location");
	message = "";
	 if (!error && response.statusCode === 200) {
    	var results = body.results;
    	if (results.length > 0) {
	    	var data = results[0];
	    	var address = data.address_components;
	    	for(var i = 0; i < address.length; i++) {
	    		var currentAddressPart = address[i];
	    		var types = currentAddressPart.types;
	    		for (var j = 0; j < types.length; j++) {
	    			var type = types[j];
	    			if (type == "country") {
	    				country = currentAddressPart.long_name;
	    				foundCountry = true;
	    			} else if (type == "administrative_area_level_2") {
	    				city = currentAddressPart.long_name;
	    				foundCity = true;
	    			}
	    		}
	    	}
	    	if (foundCity && foundCountry) {
    			var place = data.place_id;
    			console.log(city);
    			console.log(country);
    			var countryParts = country.split(" ");
    			var countryTag = country;
    			if (countryParts.length > 1) {
    				countryTag = "";
    				for (var k = 0; k < countryParts.length; k++) {
    					countryTag = countryTag + countryParts[k];
    				}
    			}
    			var number = Math.floor(Math.random() * tags.length);
    			message = city + ", " + country + "! #" + countryTag + tags[number];
    			placeURL = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=points+of+interst+in+" + city + "+" + country + "&key=" + apiKey;
    			placeFirstPart = {url: placeURL, json: true};
    			request(placeFirstPart, placeDetails);
                console.log(url);
    		} else {
    			console.log("Not Found");
				lat = (Math.random() * 180) - 90;
				lng = (Math.random() * 180) - 90;
				url = call + lat + "," + lng + "&key=" + apiKey;
    			firstPart = {url: url, json: true};
    			request(firstPart, getLocation);
                console.log(url);
    		}
    	} else {
    		console.log("Not Found");
			lat = (Math.random() * 180) - 90;
			lng = (Math.random() * 180) - 90;
			url = call + lat + "," + lng + "&key=" + apiKey;
    		firstPart = {url: url, json: true};
    		request(firstPart, getLocation);
            console.log(url);
    	}
    }
}

//Find point of Interst at City
function placeDetails(error, response, body) {
	console.log("Called Place Details");
	if (!error && response.statusCode === 200) {
		var results = body.split("<result>");
		console.log(results.length);
		var len = results.length;
		var randomNum = Math.floor(Math.random() * len) + 1;
		console.log("Num Locations: " + len + " Picked: " + randomNum);
		var point = results[randomNum];
		if (point != undefined) {
			var nameList = point.split("name");
			var nameList2 = nameList[1].split("<");
			name = nameList2[0].substr(1, nameList2[0].length - 1);
			console.log(name);
			var messageChoices = ["Try Visiting ", "Check out ", "A great destination is ", "Take a vacation to ", "An interesting landmark is ", "Explore ", "A vacation highlight is ", "Imagine yourself in a place like ", "Get out of town for a while to visit ", "I think you'd really like ", "I'm sure you would love "];
			var num = Math.floor((Math.random() * messageChoices.length));
			T.get('search/tweets', tagsSearch, function (error, data) {
				console.log("Checking Tweets");
	  			// If our search request to the server had no errors...
	  			if (!error && data.statuses.length > 0) {
	  				// ...then we grab the ID of the tweet we want to retweet...
					var userName = data.statuses[0].user.screen_name;
					console.log("Checked: " + userName);
					if (userName != "travelbotcity" && userName != prevUser) {
						console.log(userName)
						user = "@"  + userName + " ";
						prevUser = userName;
						tweetFound = false;
					} else {
						user = "";
					}
	  			}	
	  			// However, if our original search request had an error, we want to print it out here.
	 			 else {
	  				console.log('There was an error with your hashtag search:', error);
	  				user = "";
	  			}
	  			message = user + messageChoices[num] + name + " in " + message;
			console.log(message);
			//tweetMessage(message);
			var picList = point.split("photo_reference");
			if (picList.length > 1) {
				var picList2 = picList[1].split("<");
				var pic = picList2[0].substr(1, picList2[0].length - 1);
				var imgURL = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + pic + "&sensor=false&maxheight=2000&maxwidth=2000&key=" + apiKey;
				if (imgURL == undefined) {
					tweeting();
				} else {
					downloadPics(imgURL, message);
				}

			}
			});
		} else {
			var placeURL2 = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=points+of+interst+in+" + country + "&key=" + apiKey;
    	var placeFirstPart2 = {url: placeURL2, json: true};
    	request(placeFirstPart2, placeDetails2);
		}
	} else {
		console.log(error);
		var placeURL2 = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=points+of+interst+in+" + country + "&key=" + apiKey;
    	var placeFirstPart2 = {url: placeURL2, json: true};
    	request(placeFirstPart2, placeDetails2);

	}
}

//Find point of Interst at Country
function placeDetails2(error, response, body) {
	console.log("Called Place Details");
	if (!error && response.statusCode === 200) {
		var results = body.split("<result>");
		console.log(results.length);
		var len = results.length;
		var randomNum = Math.floor(Math.random() * len) + 1;
		console.log("Num Locations: " + len + " Picked: " + randomNum);
		var point = results[randomNum];
		if (point != undefined) {
			var nameList = point.split("name");
			var nameList2 = nameList[1].split("<");
			name = nameList2[0].substr(1, nameList2[0].length - 1);
			console.log(name);
			var messageChoices = ["Try Visiting ", "Check out ", "A great destination is ", "Take a vacation to ", "An interesting landmark is ", "Explore ", "A vacation highlight is ", "Imagine yourself in a place like ", "Get out of town for a while to visit ", "I think you'd really like ", "I'm sure you would love "];
			var num = Math.floor((Math.random() * messageChoices.length))
			T.get('search/tweets', tagsSearch, function (error, data) {
				console.log("Checking Tweets");
	  			// If our search request to the server had no errors...
	  			if (!error && data.statuses.length > 0) {
	  				// ...then we grab the ID of the tweet we want to retweet...
					var userName = data.statuses[0].user.screen_name;
					if (userName != "travelbotcity" && userName != prevUser) {
						console.log(userName)
						user = "@"  + userName + " ";
						prevUser = userName;
						tweetFound = false;
					} else {
						user = "";
					}
	  			}	
	  			// However, if our original search request had an error, we want to print it out here.
	 			 else {
	  				console.log('There was an error with your hashtag search:', error);
	  				user = "";
	  			}
	  			message = user + messageChoices[num] + name + " in " + message;
			console.log(message);
			//tweetMessage(message);
			var picList = point.split("photo_reference");
			if (picList.length > 1) {
				var picList2 = picList[1].split("<");
				var pic = picList2[0].substr(1, picList2[0].length - 1);
				var imgURL = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + pic + "&sensor=false&maxheight=2000&maxwidth=2000&key=" + apiKey;
				downloadPics(imgURL, message);
			}
			});
			
		} else {
			tweeting();
		}
	} else {
		console.log(error);
		tweeting();

	}
}

//Download the Picture and save it and the message:
function downloadPics(imgurl, message) {
	var fs = require('fs'),
    request = require('request');

	var download = function(uri, filename, callback){
  		request.head(uri, function(err, res, body){
    		console.log('content-type:', res.headers['content-type']);
    		console.log('content-length:', res.headers['content-length']);

    		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  		});
	};

	download(imgurl, 'google.png', function(){
  		console.log('done');
	});
	var fs = require('fs');
		fs.writeFile("temp.txt", message, function(err) {
    	if(err) {
        	return console.log(err);
    	}

    	console.log("The file was saved!");
	}); 

}

//Tweet out the picture and Message
function pictureTweet() {
	var message = "hi";
	//
	// post a tweet with media
	//
	var fs = require('fs');
	fs = require('fs')
	fs.readFile('temp.txt', 'utf8', function (err,data) {
  		if (err) {
    		return console.log(err);
  		}
  		console.log(data);
  		message = data;
	});
	var fs = require('fs');
	var b64content = fs.readFileSync("google.png", { encoding: 'base64' })	

	// first we must post the media to Twitter
	T.post('media/upload', { media_data: b64content }, function (err, data, response) {
  		// now we can assign alt text to the media, for use by screen readers and
  		// other text-based presentations and interpreters
  		var mediaIdStr = data.media_id_string
  		var altText = "Small flowers in a planter on a sunny balcony, blossoming."
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

  		T.post('media/metadata/create', meta_params, function (err, data, response) {
    		if (!err) {
      			// now we can reference the media and post a tweet (media will attach to the tweet)
      			var params = { status: message, media_ids: [mediaIdStr] }

      			T.post('statuses/update', params, function (err, data, response) {
        			console.log("TWEEEEEETED!!!!!!!!!!");
      			})
    		}
  		})
	})
}
tweetTime();
setInterval(tweetTime, 1000 * 60 * 30 ); 

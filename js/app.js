$(document).ready(function(){
  	/*--- Hide google maps modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
  	$(".search-criteria").submit( function(event){
  		/*--- Display google maps modal box ---*/
  		event.preventDefault();
    	$(".overlay").fadeIn(1000);
		
		// get the value of user inputs
		var place = $(this).find("input[name='city-or-zipcode']").val();
		var meetups = $(this).find("select[name='meetups']").val();
		var distance = $(this).find("select[name='distance']").val();

		// call meetups api
		getMeetups(place, meetups, distance);
		//setTimeout(function(){alert("Hello")},5000);
	});

	/*
	 * Meetups api call
	 * return findInMap
	 */
	function getMeetups (place, meetups, distance) {
		// request parameters to pass to Meetup's API
		var contentType ="application/x-www-form-urlencoded; charset=utf-8";

		var request = {//zip: place, //string
			           location: place, //string
					   //radius: distance, //integer
					   //category: meetups, //integer
					   //sign: true,
					   //photo-host: public,
					   fallback_suggestions: true,
					   sign: true,
					   page:0,
					   key: meetupsKey
					   };
		$.ajax({
			contentType: contentType,
			url: "http://api.meetup.com/find/groups",
			data: request,
			//contentType: "application/json",
			dataType: "json",
			type: "GET"
			})
		.done(function(result){
			console.log(result);
			$.each(result, function(i, result) {
				//get Latitude and longitude to in map
				var lat = result[i].lat;
				var lng = result[i].lon;
				// call google maps api
				//getGoogleMaps(lat, lng);
			});
		})
		.fail(function(jqXHR, error, errorThrown){
			//var errorElem = showError(error);
			//$('#modal').append(errorElem);
			console.log($.get("http://api.meetup.com/find/groups?location=Austin&page=20&key=87a2148299157a5f12667c280696b"));
		});

	//$.get('http://api.meetup.com/find/groups?location=Austin&page=20&key=87a2148299157a5f12667c280696b', function(data){
	//	console.log(data);
	//});

	};
});
/*
 * Google Maps api call
 * @param findInMap
 
function getGoogleMaps (lat, lng) {
	// request parameters to pass to Google Map's API
	var request = {key: googleMapskey,
				   latlng:lat,lon
				   };
	var promise = $.ajax({
		url: "https://maps.googleapis.com/maps/api/geocode",
		data: request,
		dataType: "json",
		type: "GET"
		});

	promise.done(function(result){
		console.log(result);
		$('#modal').html(result);
	})
	promise.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('#modal').append(errorElem);
	});
};*/
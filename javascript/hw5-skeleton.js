// Event hander for calling the SoundCloud API using the user's search query
var offset = 0;

function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '1',
		'offset' : '' + offset + ''},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			handleData(data);
		},'json'
	);
	offset += 1;
}

function search() {
	var query = $('input','#search').val();
	console.log(query);
	callAPI(query);
}

function handleData(data) {
	for (var i = 0; i < data.length; i++) {
		var sc_obj = data[i];
		console.log(sc_obj);
	}
}

function createQueryTag(sc_obj) {

}

// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();

	// Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}
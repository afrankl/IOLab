// Event hander for calling the SoundCloud API using the user's search query
var offset = 0;
var limit = 20;
var current_query;
var current_title

// NOTES: Tried to combine the createPlaylistItem method and the createQueryItem methods 
// but couldn't because the createQueryItem method can't take parameters because it is thrown off 
// the ASYN HTTP request.  Also, the jquery.click(function (permalink) {..}) wasn't working as expect. 
// Had to use a meta tag

// Search for the song/artist.  Empty the results on the webpage if the search changes
function search() {
	var query = $('input','#search').val();
	if (current_query != query) { // If the search changes...
		console.log('check')
		offset = 0; // Set the offset back to 0
		current_query = query;
		$('#results').empty() // Empty what's shown as the results to prepare for the new search
	}
	callAPI(query);
}

function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '' + limit + '',
		'offset' : '' + offset + ''},
		function(data) {
			// PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
			// HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
			if (data.length > 0) {
				handleData(data);
			}
		},'json'
	);
	offset += limit;
}

// Handles the data.  Puts the results of the query onto the web page
function handleData(data) {
	var results = $('#results') // Fetch the results id div tag so that I can append the results of the query to the web page
	for (var i = 0; i < data.length; i++) {
		var sc_obj = data[i];
		results.append(createQueryItem(sc_obj)) // appends the query results to the results tag
	}
}

// Creates the html tag that will be added to the playlist
function createPlaylistItem(sc_obj, type, buttons) {
	var item = $('<div/>', {class: 'playlist-item'}); // initialize playlist-item
	var content = $('<div/>', {class: 'content'}) // make content part.  Consists of the image and the title
	var img_src = sc_obj.artwork_url
	var title = sc_obj.title
	var artwork = $('<img/>', {'src': '' + img_src + ''}) // makes the image tag
	var button_container = $('<div/>', {'class': 'buttons'}) // makes the button container.  Consists of the play, remove from playlist, move up, and move down buttons
	content.append(artwork) ; content.append(title) // adds the necessary content
	buttons.forEach(function (item) { 
		button_container.append(item) // adds the buttons that were passed as parameters.  I CAN DO THIS BECAUSE THERE IS NO ASYNC
	})
	item.append(content); item.append(button_container)
	return item;
}

// Creates the html tag that will be added to the query
function createQueryItem(sc_obj, type, buttons) {
	var item = $('<div/>', {class: 'query-item'}); // initialize query-item
	var content = $('<div/>', {class: 'content'})  // makes the content container.  Contains the image and the song title (again)
	var img_src = sc_obj.artwork_url
	var title = sc_obj.title
	var artwork = $('<img/>', {'src': '' + img_src + ''}) // create the image tag
	content.append(artwork) ; content.append(title)
	var button_container = $('<div/>', {'class': 'buttons'}) // makes the button container.  Includes just the add to playlist button and the play button
	var add_to_playlist = $('<button/>', {'text': 'Add to Playlist'}).click(function (){ playlist_add(sc_obj)})
	var play_song = $('<button/>', {'text': 'Play Song'}).click(function() { changeTrack(sc_obj.permalink_url)})
	button_container.append(add_to_playlist); button_container.append(play_song)
	item.append(content); item.append(button_container)
	return item;
}

// Adds the item to the playlist
function playlist_add(sc_obj) {
	var meta = $('<meta/>', {'text': sc_obj.permalink_url, class: '.meta'}) // create a meta tag with the permalink_url
	var remove_from_playlist = $('<button/>', {'text': 'Remove', 'onclick': 'remove_from_playlist(this)'}) // Make the button to remove the playlist
	var play_song = $('<button/>', {'text': 'Play Song', 'onclick' : 'playSong(this)'})// Make the button to change the track to the current song
	var move_up = $('<button/>', {'text': 'Move up', 'onclick' : 'move_up(this)'}) // Make the button to move the item up
	var move_down = $('<button/>', {'text': 'Move down', 'onclick' : 'move_down(this)'}) // Make the button to move the item down
	var buttons = [remove_from_playlist, play_song, meta, move_up, move_down] // put everything in the buttons container
	var item = createPlaylistItem(sc_obj, 'playlist-item', buttons) // make the playlist item
	$('#songs').append(item) // append it to the songs
}



// Removes the item from the playlist
function remove_from_playlist(button) {
	$(button).parent().parent().remove()
}

function playSong(button) {
	var permalink_url = $(button).next().text()
	changeTrack(permalink_url)
}

// Moves the item up
function move_up(button) {
	var tag = $(button).parent().parent()
	var before = tag.prev()
	if(!tag.is(":first-child")) {
		tag.remove()
		tag.insertBefore(before)
	}
}

// Moves the item down
function move_down(button) {
	var tag = $(button).parent().parent()
	var after = tag.next()
	if(!tag.is(":last-child")) {
		tag.remove()
		tag.insertAfter(after)
	}
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
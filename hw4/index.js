
// Generate a new <div> element that represents a to-do item.  Used in both addToList() and unmark()
function generate(text) {
	var item = $('<div/>', {class:'item'}) // Create the empty div
	var text = $('<div/>', {text:text, class:'text'}) // Create a <div> containing the To-do text, with class 'text' so that it can be easily found later on   
	var doneButton = $('<button/>', {text: 'Complete', onclick: 'complete(this)'}) // Create a done button which, on click, performs the complete function
	item.append(text) ; item.append(doneButton) // Append the newly created elements to the item
	return item
}

//  Function called when an item in the to-do section's "complete" button is clicked
//  Moves the item to the complete section while changing the style and adding an unmark button
function complete(completeButton) {
	var item = $(completeButton).parent() // get the item that contains the complete button
	completeButton.remove() // remove the complete button
	item.attr('id', 'done-item') # // Make the new item a "done-item"
	item.prepend($('<img/>', {src: './check.png'})) // Add a green check mark to the beginning
	item.append($('<button/>', {text: 'Unmark', onclick: 'unmark(this)'})) // Add the unmark button to the end
	$('.content', '#done').prepend(item) // Add the item to them done content
}

//  Function called when an item in the completed section's "unmark" button is called
//  Moves the item back to the to-do section by generating a to-do item with the same text as the item that's button was pressed in the completed section
function unmark(unmarkButton) {
	var item = $(unmarkButton).parent() // get the item that contains the unmark button
	var text = $('.text', item).text() // get the text of the item that represents the task
	var content = $('.content', '#todo') // get the content <div/> in the todo section
	content.prepend(generate(text)); // create a new to-do item and prepends it to that content
	item.remove() // remove the item from the completed section
}

// Generates a to-do list item and adds it to the to-do section
function addToList() {
	var text = $('input', '#new-item-form').val() // get the text inside the 'Add to List' text-field
	var item = generate(text) // create a new to-do item
	var content = $('.content', '#todo') // grab the content of the to-do section
	content.prepend(item) // Put the item at the top of the list
}
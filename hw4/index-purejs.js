// Generates a to-do list item and adds it to the to-do section
function addToList() {
	var text = document.getElementById('input-new-item').value // get the text inside the 'Add to List' text-field
	var item = generate(text) // create a new to-do item
	var content = document.getElementsByClassName('content')[0] // grab the content of the to-do section
	content.insertBefore(item, content.childNodes[0]) // Put the item at the top of the list
	
}

//  Function called when an item in the to-do section's "complete" button is clicked
//  Moves the item to the complete section while changing the style and adding an unmark button
function complete(completeButton) {
	var item = completeButton.parentElement // get the item that contains the complete button
	item.removeChild(completeButton)  // remove the complete button
	item.setAttribute('id', 'done-item') // Make the new item a "done-item"
	var img = document.createElement('img')
	img.setAttribute('src', './check.png') 
	item.insertBefore(img, item.childNodes[0]) // Add a green check mark to the beginning
	var unmarkButton = document.createElement('button')
	unmarkButton.innerHTML = 'Unmark'
	unmarkButton.setAttribute('onclick', 'unmark(this)')
	item.appendChild(unmarkButton) // Add the unmark button to the end
	var content = document.getElementsByClassName('content')[1]
	content.insertBefore(item, content.childNodes[0]) // Add the item to them done content
}

//  Function called when an item in the completed section's "unmark" button is called
//  Moves the item back to the to-do section by generating a to-do item with the same text as the item that's button was pressed in the completed section
function unmark(unmarkButton) {
	var item = unmarkButton.parentElement // get the item that contains the unmark button
	var text = item.childNodes[1].innerHTML // get the text of the item that represents the task
	var content = document.getElementsByClassName('content')[0] // get the content <div/> in the todo section
	content.insertBefore(generate(text), content.childNodes[0]); // create a new to-do item and prepends it to that content
	var completed = document.getElementsByClassName('content')[1]
	completed.removeChild(item) // remove the item from the completed section
}

// Generate a new <div> element that represents a to-do item.  Used in both addToList() and unmark()
function generate(todo) {
	var item = document.createElement('div') // Create the empty div
	item.className = 'item'
	var text = document.createElement('div') // Create a <div> containing the To-do text,
	text.className = 'text' //  with class 'text' so that it can be easily found later on 
	text.innerHTML = todo
	var doneButton = document.createElement('button') // Create a done button  performs the complete function
	doneButton.innerHTML = 'Complete'
	doneButton.setAttribute('onclick', 'complete(this)')
	item.appendChild(text) ; item.appendChild(doneButton) // Append the newly created elements to the item
	return item
}
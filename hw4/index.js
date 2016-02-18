
var input = $('#new-item-form').find('input');

function generate(text) {
	var item = $('<div/>', {class:'item'})
	var text = $('<div/>', {text:text})
	var button = $('<button/>', {text: 'Done', onclick: 'makeDone(this)'})
	item.append(text)
	item.append(button)
	return item
}

function newItem() {
	var text = input.val()
	var item = generate(text)
	var content = $('.content', '#todo')
	content.prepend(item)
}

function makeDone(elem) {
	var item = $(elem).parent()
	elem.remove()
	var content = $('.content', '#done')
	content.prepend(item)
}
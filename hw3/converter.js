var toTitle = document.getElementById("to-text");
var currency_types = ["Dollars", "Euros"];
var language_types = ["English", "Spanish"];
var bit_types = ["Kilo", "Mega", "Giga"];

var input = document.getElementById('input-type');
var input_dropdown = document.getElementById('dropdown-input');
var output = document.getElementById('output-type');
var output_dropdown = document.getElementById('dropdown-output');
var input_selected = "Dollars";
var output_selected = "Euros";

function create_dropdown(types, dropdown) {
	for (var i = 0; i < types.length; i++) {
		var t = types[i];
		var item = document.createElement("div");
		item.class = "dropdown-item";
		item.innerHTML = t;
		dropdown.appendChild(item);
	}
}

function destroy_dropdown(dropdown) {
	while (dropdown.childNodes.length > 0) {
		dropdown.removeChild(dropdown.childNodes[0]);
	}
}

function reset_dropdowns(types) {
	destroy_dropdown(input_dropdown);
	destroy_dropdown(output_dropdown);
	create_dropdown(types, input_dropdown);
	create_dropdown(types, output_dropdown);
}

function converter(newTitle, types) {
	toTitle.innerHTML = "Convert " + newTitle;
	reset_dropdowns(types);
}

function currency() {
	converter("Currency", currency_types);
}

function languages() {
	converter("Language", language_types);
}

function bits() {
	converter("Bit", bit_types);
}

function bytes() {
	converter("Byte", bit_types);
}



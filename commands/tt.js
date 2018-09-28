const Discord = require("discord.js");
const tt = require("txt_translate");

module.exports.run = async (bot, message, args) => {
	var data = message.content.split(" ");
	var options = data[1].split("_");
	var text = "";
	for (var i = 2; i < data.length; i++) {
		text += data[i] + " ";
	}
	var from = options[0];
	var to = options[1];
	console.log(`options are - ${options} and text is - ${text}`);
	tt.translate(from, text, to, "api key for x-api", api = "azure", (data) => {
		console.log(data);
		message.reply(data.translatedText);
	});
}

module.exports.help = {
	name: "tt"
}

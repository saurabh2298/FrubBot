const { Client, Attachment } = require('discord.js');
const tt = require("txt_translate");
var request = require("request");

var options = {
	method: 'GET',
	url: 'http://api.giphy.com/v1/gifs/translate',
	qs: { api_key: 'your api key', s: 'welcome' },
};


module.exports.run = async (bot, message, args) => {
	try {
		options.qs.s = args.join(" ");
		console.log(options.qs.s);
		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			var j = JSON.parse(body);
			console.log(j.data.images.fixed_width.url);
			const attachment = new Attachment(j.data.images.fixed_width_small.url);
			console.log(attachment);
			message.channel.send(attachment);
		});
	}
	catch (err) {
		console.log(err);
	}
}

module.exports.help = {
	name: "gtt"
}

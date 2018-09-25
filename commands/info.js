const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  message.channel.send("A discord bot created by the user frubbly, with love. The bot is pretty much in the beta right now and can only perform a few basic moderation related operations. \nUse $help to know more!);
}

module.exports.help = {
  name: "info"
}

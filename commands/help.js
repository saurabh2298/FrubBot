const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  message.channel.send("The following administrator commands are currently provided by this bot :"+"\n\n$kick @username reason -> For kicking a user. Not providing the reason will result in a failed kick."+
  "\n$ban @username reason -> For banning a user. Not providing the reason will result in a failed ban."+
  "\n$tempmute @username duration -> For muting a user for a specified period of time. Not providing the time duration will result in a failed temporary mute."+
  "\n$mute @username -> For muting a user indefinitely."+
  "\n$unmute @username -> For unmuting a previously muted user."+
  "\n\nNote :- This bot requires the permission 'MANAGE MESSAGES' for these commands to work!");

}

module.exports.help = {
  name: "help"
}

const Discord = require("discord.js");
const Core = require("../core.js");

module.exports.run = async(bot, message, args) => {
  // $kick @user reason

  let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kickedUser) return message.reply ("Could not find the specified user!");
  let reason = args.join(" ").slice(22);

  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You are not permitted to use this command!");
  if(kickedUser.hasPermission("MANAGE_MESSAGES"))
    return message.reply("This user cannot be kicked!");

  let kickedChannel = message.guild.channels.find('name', "log");
  if(kickedChannel){
    Core.sendEmbed(kickedChannel, "Oh no! Someone has been kicked! :(", "#ff0000", "Username of the kicked user :", kickedUser, "Kicked by :", message.author, "Reason for kicking :", reason);
  }

  message.guild.member(kickedUser).kick(reason);
  }

module.exports.help = {
  name: "kick"
}

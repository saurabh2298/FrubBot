const Discord = require("discord.js");
const Core = require("../core.js");

module.exports.run = async(bot, message, args) => {
  // $ban @user reason

  let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bannedUser) return message.reply ("Could not find the specified user!");
  let reason = args.join(" ").slice(22);

  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You are not permitted to use this command!");
  if(bannedUser.hasPermission("MANAGE_MESSAGES"))
    return message.reply("This user cannot be banned!");

  let bannedChannel = message.guild.channels.find('name', "log");
  if(bannedChannel){
    /*let bannedEmbed = new Discord.RichEmbed().setTitle("Oh no! Someone has been banned! :(").setColor("#ff0000").addField("Username of the banned user :", bannedUser).addField("Banned by :", message.author).addField("Reason for banning :", reason);
    bannedChannel.send(bannedEmbed);*/
    Core.sendEmbed(bannedChannel, "Oh no! Someone has been banned! :(", "#ff0000", "Username of the banned user :", bannedUser, "Banned by :", message.author, "Reason for banning :", reason);

  }

  message.guild.member(bannedUser).ban(reason);
  }

module.exports.help = {
  name: "ban"
}

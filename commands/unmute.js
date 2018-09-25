const Discord = require("discord.js");
const Core = require("../core.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {
  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!toMute) return message.reply("Could not find the specified user");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You are not permitted to use this command.");
  if(toMute.hasPermission("MANAGE_MESSAGES")) return message.reply("This person cannot be muted.");
  let muteRole = message.guild.roles.find(`name`, "muted");
  if(!muteRole){
    console.lot("Mute role does not exist!");
    return;
  }

  //let muteTime = args[1];
  //if(!muteTime) message.reply("You must specify the time interval!");
  await(toMute.removeRole(muteRole.id));
  let logsChannel = message.guild.channels.find(`name`, "log");
  if(!logsChannel) {
    console.log("Could not find logs channel");
    return;
  }
  Core.sendEmbed(logsChannel, "Unmuted User", "#000000", "Unmuted User :", toMute, "Unmuted By :", message.author);
  message.delete().catch(O_o=>{});
}

module.exports.help = {
  name: "unmute"
}

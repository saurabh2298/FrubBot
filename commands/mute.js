const Discord = require("discord.js");
const Core = require("../core.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {
  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!toMute) return message.reply("Could not find the specified user!");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You are not permitted to use this command!");
  if(toMute.hasPermission("MANAGE_MESSAGES")) return message.reply("This user cannot be muted!");
  let muteRole = message.guild.roles.find(`name`, "muted");
  if(!muteRole){
    try{
      muteRole = await message.guild.createRole({
        name : "muted", color : "#000000", permissions : []
      });
    }catch(e){
      console.log("Failed to create the role");
      console.log(e.stack);
    }
  }

  try{
    message.guild.channels.forEach(async (channel, id) => {
      await channel.overwritePermissions(muteRole, {
        SEND_MESSAGES : false, ADD_REACTIONS : false, SPEAK : false
      });
    });
  }catch(e){
    console.log("Failed to update muted channels.");
    console.log(e.stack);
  }

  //let muteTime = args[1];
  //if(!muteTime) message.reply("You must specify the time interval!");
  await(toMute.addRole(muteRole.id));
  let logsChannel = message.guild.channels.find(`name`, "log");
  if(!logsChannel) {
    console.log("Could not find logs channel");
    return;
  }
  Core.sendEmbed(logsChannel, "A user was muted!", "#000000", "Muted User :", toMute, "Muted By :", message.author);
  message.delete().catch(O_o=>{});
}

module.exports.help = {
  name: "mute"
}

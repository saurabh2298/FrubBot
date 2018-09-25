const Discord = require("discord.js");
const fs = require("fs");


var methods = {
  sendDM : function(channel, member, msg, failMsg){
    member.send(msg).catch(O_o => {
      console.log(`Failed to DM ${member}`);
      if(failMsg === "") return;
      channel.send(`${member}, ${failMsg}`);
    })
  },

  sendEmbed : function(channel, title, color, ...args){
    if(!channel){
      console.log("Channel not found.");
      return;
    }

    let embed = new Discord.RichEmbed().setTitle(title).setColor(color);
    for(i = 0; i < args.length; i+=2){
      embed.addField(args[i], args[i+1]);
    }

    channel.send(embed);
    return embed;
  }
};

module.exports = methods;

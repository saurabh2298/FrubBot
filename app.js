const Discord = require ("discord.js");
const Config = require("./config.json");
const Token = require("./token.json");
const fs = require("fs");
const Core = require("./core.js");

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Could not find command.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () =>{
  console.log(`${bot.user.username} is online! It's running on ${bot.guilds.size} servers!`);
  bot.user.setActivity("glitch.com", {type: "PLAYING"});
});

bot.on("guildMemberAdd", async member => {
  let welcomeChannel = member.guild.channels.find(`name`, "welcome");
  if(!welcomeChannel) return;
  welcomeChannel.send(`Welcome ${member} to the server! :D`);
  Core.sendDM(welcomeChannel, member, "Hi there! You are requested to go through the rules of the server before using the server's channels. Thank you!", "Hi there! You do not have DMs enabled. Please go through the rules of the server before using the server's channels. Thank you!");
});

bot.on("guildMemberRemove", async member => {
  let welcomeChannel = member.guild.channels.find(`name`, "welcome");
  if(!welcomeChannel) return;
  welcomeChannel.send(`Oh no! ${member} has left the server. :'(`);
});

bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefix = Config.prefix;
  let msgArray = message.content.split(" ");
  let cmd = msgArray[0];
  if(cmd.slice(0, prefix.length) !== prefix) return;
  let args = msgArray.slice(1);
  let cmdFile = bot.commands.get(cmd.slice(prefix.length));
  if(cmdFile) cmdFile.run(bot, message, args);
});

bot.login(Token.token);

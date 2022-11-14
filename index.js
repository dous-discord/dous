const Discord = require("discord.js");
const fs = require('node:fs')
const path = require('node:path')
const { REST } = require('@discordjs/rest')
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds
  ]
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
const cmds = []
client.generalCommands = new Discord.Collection();
const generalCommandsPath = path.join(__dirname, 'commands/general');
const generalCommandFiles = fs.readdirSync(generalCommandsPath).filter(file => file.endsWith('.js'));

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
for (const file of generalCommandFiles) {
  const filePath = path.join(generalCommandsPath, file);
  const command = require(filePath);
  client.generalCommands.set(command.data.name, command);
  cmds.push(command.data)
}

rest.put(Discord.Routes.applicationGuildCommands(process.env.CLIENT_ID, '1041352636324134993'), { body: cmds })
  .then((data) => console.log(`Successfully registered ${data.length} commands.`))
  .catch(console.error);

client.login(process.env.TOKEN)
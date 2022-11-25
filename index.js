const Discord = require("discord.js");
const {DisTube} = require('distube');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const fs = require('node:fs')
const keepAlive = require('./uptime_settings')
const path = require('node:path')
const { REST } = require('@discordjs/rest')
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildVoiceStates
  ]            
});

client.distube = new DisTube(client, {
  leaveOnStop: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: true,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ],
  youtubeCookie: process.env.YOUTUBE_COOKIE
})

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

const distubeEventsPath = path.join(__dirname, 'events/distube');
const distubeEventFiles = fs.readdirSync(distubeEventsPath).filter(file => file.endsWith('.js'));

for (const file of distubeEventFiles) {
  const distubeFilePath = path.join(distubeEventsPath, file);
  const devent = require(distubeFilePath);
  if (devent.once) {
    client.distube.once(devent.name, (...args) => devent.execute(...args));
  } else {
    client.distube.on(devent.name, (...args) => devent.execute(...args));
  }
}

const cmds = []
client.generalCommands = new Discord.Collection();
const generalCommandsPath = path.join(__dirname, 'commands/general');
const generalCommandFiles = fs.readdirSync(generalCommandsPath).filter(file => file.endsWith('.js'));


const funCommandsPath = path.join(__dirname, 'commands/fun');
const funCommandFiles = fs.readdirSync(funCommandsPath).filter(file => file.endsWith('.js'));

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
for (const file of generalCommandFiles) {
  const filePath = path.join(generalCommandsPath, file);
  const command = require(filePath);
  client.generalCommands.set(command.data.name, command);
  cmds.push(command.data)
}

for (const funfile of funCommandFiles) {
  const funfilePath = path.join(funCommandsPath, funfile);
  const funcommand = require(funfilePath);
  client.generalCommands.set(funcommand.data.name, funcommand);
  cmds.push(funcommand.data)
}

const musicCommandsPath = path.join(__dirname, 'commands/music');
const musicCommandFiles = fs.readdirSync(musicCommandsPath).filter(file => file.endsWith('.js'));

for (const musicfile of musicCommandFiles) {
  const musicfilePath = path.join(musicCommandsPath, musicfile);
  const musiccommand = require(musicfilePath);
  client.generalCommands.set(musiccommand.data.name, musiccommand);
  cmds.push(musiccommand.data)
}


const modCommandsPath = path.join(__dirname, 'commands/mod');
const modCommandFiles = fs.readdirSync(modCommandsPath).filter(file => file.endsWith('.js'));

for (const modfile of modCommandFiles) {
  const modfilePath = path.join(modCommandsPath, modfile);
  const modcommand = require(modfilePath);
  client.generalCommands.set(modcommand.data.name, modcommand);
  cmds.push(modcommand.data)
}

rest.put(Discord.Routes.applicationCommands(process.env.CLIENT_ID), { body: cmds })
  .then((data) => console.log(`Successfully registered ${data.length} commands.`))
  .catch(console.error);

keepAlive();
client.login(process.env.TOKEN);
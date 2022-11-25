const Discord = require('discord.js');
const path = require('node:path')
const fs = require('fs')
module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction) {
    const generalCommandsPath = path.join(path.resolve("../dous/commands/general"));
    const generalCommandFiles = fs.readdirSync(generalCommandsPath).filter(file => file.endsWith('.js'));
    const gcmds = []
    for (const file of generalCommandFiles) {
      const filePath = path.join(generalCommandsPath, file);
      const command = require(filePath);
      gcmds.push(`\`/${command.data.name}\` - ${command.data.description}`)
    }
    const funCommandsPath = path.join(path.resolve("../dous/commands/fun"));
    const funCommandFiles = fs.readdirSync(funCommandsPath).filter(file => file.endsWith('.js'));
    const fcmds = []
    for (const funfile of funCommandFiles) {
      const funfilePath = path.join(funCommandsPath, funfile);
      const funcommand = require(funfilePath);
      fcmds.push(`\`/${funcommand.data.name}\` - ${funcommand.data.description}`)
    }
    const musicCommandsPath = path.join(path.resolve("../dous/commands/music"));
    const musicCommandFiles = fs.readdirSync(musicCommandsPath).filter(file => file.endsWith('.js'));
    const mucmds = []
    for (const musicfile of musicCommandFiles) {
      const musicfilePath = path.join(musicCommandsPath, musicfile);
      const musiccommand = require(musicfilePath);
      mucmds.push(`\`/${musiccommand.data.name}\` - ${musiccommand.data.description}`)
    }
    const modCommandsPath = path.join(path.resolve("../dous/commands/mod"));
    const modCommandFiles = fs.readdirSync(modCommandsPath).filter(file => file.endsWith('.js'));
    const mcmds = []
    for (const modfile of modCommandFiles) {
      const modfilePath = path.join(modCommandsPath, modfile);
      const modcommand = require(modfilePath);
      mcmds.push(`\`/${modcommand.data.name}\` - ${modcommand.data.description}`)
    }
    if (interaction.customId === "page1Btn") {
      let help_mainEmbed = new Discord.EmbedBuilder()
        .setColor(0xe67e22)
        .setTitle("━━ 🤖 ・ General commands ━━")
        .setURL('https://youtu.be/d-ggzGbsEWE')
        .setDescription(gcmds.join("\n"))
        .setTimestamp()
      const mesgRow = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("page1Btn")
            .setLabel("◀️")
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
            .setCustomId("pagenoBtn")
            .setLabel("1/4")
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
            .setCustomId("page2Btn")
            .setLabel("▶️")
            .setStyle(Discord.ButtonStyle.Secondary)
        );
      await interaction.update({ embeds: [help_mainEmbed], components: [mesgRow] })
    }
    if (interaction.customId === "page2Btn") {
      let page2Embed = new Discord.EmbedBuilder()
        .setColor(0xe67e22)
        .setTitle("━━ 🎈 ・ Fun commands ━━")
        .setURL('https://youtu.be/d-ggzGbsEWE')
        .setDescription(fcmds.join("\n"))
        .setTimestamp()
      const mesgRow = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("page1Btn")
            .setLabel("◀️")
            .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
            .setCustomId("pagenoBtn")
            .setLabel("2/4")
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
            .setCustomId("page3Btn")
            .setLabel("▶️")
            .setStyle(Discord.ButtonStyle.Secondary)
        );

      await interaction.update({ embeds: [page2Embed], components: [mesgRow] })
    }
    if (interaction.customId === "page3Btn") {
      let help_mainEmbed = new Discord.EmbedBuilder()
        .setColor(0xe67e22)
        .setTitle("━━ 🛠️ ・ Moderation commands ━━")
        .setURL('https://youtu.be/d-ggzGbsEWE')
        .setDescription(mcmds.join("\n"))
        .setTimestamp()
      const mesgRow = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("page2Btn")
            .setLabel("◀️")
            .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
            .setCustomId("pagenoBtn")
            .setLabel("3/4")
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
            .setCustomId("page4Btn")
            .setLabel("▶️")
            .setStyle(Discord.ButtonStyle.Secondary)
        );

      await interaction.update({ embeds: [help_mainEmbed], components: [mesgRow] })
    }
    if (interaction.customId === "page4Btn") {
      let help_mainEmbed = new Discord.EmbedBuilder()
        .setColor(0xe67e22)
        .setTitle("━━ 🎧 ・ Music commands ━━")
        .setURL('https://youtu.be/d-ggzGbsEWE')
        .setDescription(mucmds.join("\n"))
        .setTimestamp()
      const mesgRow = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("page3Btn")
            .setLabel("◀️")
            .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
            .setCustomId("pagenoBtn")
            .setLabel("4/4")
            .setDisabled(true)
            .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
            .setCustomId("page5Btn")
            .setDisabled(true)
            .setLabel("▶️")
            .setStyle(Discord.ButtonStyle.Secondary)
        );

      await interaction.update({ embeds: [help_mainEmbed], components: [mesgRow] })
    }
  },
};

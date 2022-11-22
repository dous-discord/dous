const Discord = require('discord.js');
const path = require('node:path')
const fs = require('node:fs')

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('help')
    .setDescription('Get help'),
  async execute(interaction) {

    const generalCommandsPath = path.join(__dirname);
    const generalCommandFiles = fs.readdirSync(generalCommandsPath).filter(file => file.endsWith('.js'));
    const gcmds = []
    for (const file of generalCommandFiles) {
      const filePath = path.join(generalCommandsPath, file);
      const command = require(filePath);
      gcmds.push(`\`/${command.data.name}\` - ${command.data.description}`)
    }
    let h = gcmds.join("\n")
    let helpEmbed = new Discord.EmbedBuilder()
      .setColor(0xe67e22)
      .setTitle("━━ 🤖 ・ General commands ━━")
      .setURL('https://youtu.be/d-ggzGbsEWE')
      .setDescription(h)
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

    await interaction.reply({ embeds: [helpEmbed], components: [mesgRow] })
  },
};




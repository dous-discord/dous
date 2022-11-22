const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('dare')
    .setDescription('Get a random dare'),
  async execute(interaction) {
    await axios.get("https://api.truthordarebot.xyz/api/dare").then(res => {
      let d = res.data.question
      let dareEmbed = new Discord.EmbedBuilder()
        .setColor(0xe67e22)
        .setTitle(d)
        .setFooter({ text: 'Type: Dare' })
        .setTimestamp()
        .setAuthor({ name: 'Requested by ' + interaction.user.username.toString(), iconURL: interaction.user.displayAvatarURL() })
      const mesgRow = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("truthBtn")
            .setLabel("Truth")
            .setStyle(Discord.ButtonStyle.Success),
          new Discord.ButtonBuilder()
            .setCustomId("dareBtn")
            .setLabel("Dare")
            .setStyle(Discord.ButtonStyle.Danger),
          new Discord.ButtonBuilder()
            .setCustomId("randomBtn")
            .setLabel("Random")
            .setStyle(Discord.ButtonStyle.Primary)
        );
      interaction.reply({ embeds: [dareEmbed], components: [mesgRow] });
    })

  },
};
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('truth')
    .setDescription('Get a random question'),
  async execute(interaction) {
    await axios.get("https://api.truthordarebot.xyz/v1/truth").then(res => {
     let tru = res.data.question
     let truthEmbed = new Discord.EmbedBuilder()
      .setColor(0xe67e22)
      .setTitle(tru)
      .setFooter({ text: 'Type: Truth'})
      .setTimestamp()
      .setAuthor({name: 'Requested by ' + interaction.user.username.toString(), iconURL:interaction.user.displayAvatarURL()})
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
    interaction.reply({ embeds: [truthEmbed], components: [mesgRow] });
})
    
  },
};
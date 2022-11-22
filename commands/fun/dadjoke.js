const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('dadjoke')
    .setDescription('Get a random dadjoke'),

  async execute(interaction) {
    await axios.get("https://v2.jokeapi.dev/joke/Programming,Dark,Pun?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart").then(res => {

      let main = res.data.setup
      let punch = res.data.delivery

      let dadjokeEmbed = new Discord.EmbedBuilder()
        .setColor(0xe67e22)
        .setTitle(main + "\n" + punch)
        .setTimestamp()
        .setFooter({ text: 'Type: Dadjoke' })
        .setAuthor({ name: 'Requested by ' + interaction.user.username.toString(), iconURL: interaction.user.displayAvatarURL() })

      const mesgRow = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("dadjokeBtn")
            .setLabel('Again')
            .setStyle(Discord.ButtonStyle.Primary)
        );

      interaction.reply({ embeds: [dadjokeEmbed], components: [mesgRow] })
    }
    );
  },
};
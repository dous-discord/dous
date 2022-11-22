const Discord = require('discord.js');
const ud = require('urban-dictionary')

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('define')
    .setDescription('Get slang (mostly) definitions from urban dictionary')
    .addStringOption(option =>
      option.setName('word')
        .setDescription('Enter a Word')
        .setRequired(true)),

  async execute(interaction) {
    var res;
    ud.define(interaction.options.getString('word')).then((results) => {
      res = results
      const defineEmbed = new Discord.EmbedBuilder()
        .setColor(0xe67e22)
        .setAuthor({ name: 'Requested by ' + interaction.user.username.toString(), iconURL: interaction.user.displayAvatarURL() })
        .setTimestamp()
        .setFooter({ text: 'Type: Define' })
        .setTitle(interaction.options.getString('word'))
        .setDescription(`${res[0].definition.replace(/\[|\]/g, "")}\n\nExample: ${res[0].example.replace(/\[|\]/g, "")}`)
      interaction.reply({ embeds: [defineEmbed] })
    })
  },
};
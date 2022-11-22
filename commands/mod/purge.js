const Discord = require('discord.js');
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('purge')
    .setDescription('Purge required number of messages')
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addStringOption(option =>
      option.setName('message_count')
        .setDescription('Enter message count')
        .setRequired(true)),
  async execute(interaction) {
    var amount = parseInt(interaction.options.getString('message_count'))
    if (!amount) { return interaction.reply({ content: "Please specify the amount of messages you want to delete", ephemeral: true }) } else if (amount > 100 || amount < 1) { return interaction.reply({ content: "Please select a number between **1** and **100**", ephemeral: true }) } else if (2 >= 2) {
      interaction.channel.bulkDelete(amount).catch(err => {
        interaction.reply({ content: 'Due to Discord Limitations, cannot delete messages older than 14 days', ephemeral: true })
      })

      await interaction.reply('Deleted \`' + amount + '\` messages')
      await wait(2000)
      await interaction.deleteReply()
    };
  },
};
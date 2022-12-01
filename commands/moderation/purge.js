const Discord = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

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
    let errorEmbed14 = new Discord.EmbedBuilder()
    .setColor(15548997)
    .setTitle('❌ Due to Discord Limitations, cannot delete messages older than 14 days!')
    let successEmbed = new Discord.EmbedBuilder()
    .setColor(5763719)
    .setDescription('✅ Deleted \`' + amount + '\` messages')
    let errorEmbed = new Discord.EmbedBuilder()
    .setColor(15548997)
    .setDescription('❌ I need administrator to delete messages')
    let errorEmbed69 = new Discord.EmbedBuilder()
    .setColor(15548997)
    .setDescription('❌ Enter a valid amount between 0 - 100')
    
    var amount = parseInt(interaction.options.getString('message_count'))

let botUser = interaction.guild.members.cache.get(process.env.CLIENT_ID)
    if (!botUser.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
     return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
if (!amount || amount > 100 || amount < 1) { 
        return interaction.reply({ embeds: [errorEmbed69], ephemeral: true }) }
      interaction.channel.bulkDelete(amount).catch(err => {
         interaction.reply({ embeds: [errorEmbed14], ephemeral: true })
      })

    await interaction.reply({ embeds: [successEmbed], ephemeral: true })
  },
};

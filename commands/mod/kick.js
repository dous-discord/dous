const Discord = require('discord.js');
module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user')
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.KickMembers || Discord.PermissionFlagsBits.BanMembers)
    .setDMPermission(false)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Select the User')
        .setRequired(true)),
  async execute(interaction) {
    try {
      if (interaction.member == user) {
        await interaction.reply("You can't kick yourselves");
      } else {
        user.kick();
        await interaction.reply(`Kicked user ${user}`);
      }
    } catch (error) {
      interaction.reply({ content: 'I do not have permissions to kick', ephemeral: true });
    };
  },
};

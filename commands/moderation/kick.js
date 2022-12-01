const Discord = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a User')
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.KickMembers || Discord.PermissionFlagsBits.BanMembers)
    .setDMPermission(false)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Select the user')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
      .setDescription('Enter reason'))
    
  ,
  async execute(interaction){

  let errorEmbed = new Discord.EmbedBuilder()
    .setColor(15548997)
    .setDescription('❌ I don\'t have appropriate permissions to kick members.')
    let botUser = interaction.guild.members.cache.get(`${process.env.CLIENT_ID}`)
    if (!botUser.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
     return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }

    
  let user = interaction.options.getUser('user')
  let member = interaction.guild.members.cache.get(user.id)
    
 if(interaction.options.getString('reason') === null)
  await member.send(`You were kicked from ${interaction.guild.name}`) 

  
  if(interaction.options.getString('reason') != null)
  await member.send(`You were kicked from ${interaction.guild.name} for \`${interaction.options.getString('reason')}\``) 
    
member.kick({reason: `${interaction.options.getString('reason')}`})


  
let kickEmbed = new Discord.EmbedBuilder()
    .setDescription(`✅ Kicked ${interaction.options.getUser('user').tag}`)
    interaction.reply({embeds: [kickEmbed], ephemeral: true})

  }
}
  

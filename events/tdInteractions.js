const Discord = require('discord.js');
const axios = require('axios');

function randomArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction) {
    if (interaction.customId === "truthBtn") {
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
    }

    if (interaction.customId === "dareBtn") {
      await axios.get("https://api.truthordarebot.xyz/api/dare").then(res => {
     let d = res.data.question
     let dareEmbed = new Discord.EmbedBuilder()
      .setColor(0xe67e22)
      .setTitle(d)
      .setFooter({ text: 'Type: Dare'})
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
    interaction.reply({ embeds: [dareEmbed], components: [mesgRow] });
})
    }

    if (interaction.customId === "dadjokeBtn") {
      await axios.get("https://v2.jokeapi.dev/joke/Programming,Dark,Pun?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart").then(res => {
     let main = res.data.setup
      let punch = res.data.delivery
      let dadjokeEmbed = new Discord.EmbedBuilder()
        .setColor(0xe67e22)
        .setTitle(main + "\n" + punch)
        .setFooter({ text: 'Type: Dadjoke'})
        .setTimestamp()
        .setAuthor({name: 'Requested by ' + interaction.user.username.toString(), iconURL:interaction.user.displayAvatarURL()})
      const mesgRow = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("dadjokeBtn")
            .setLabel("Again")
            .setStyle(Discord.ButtonStyle.Primary),


        );


      interaction.reply({ embeds: [dadjokeEmbed], components: [mesgRow] })
      })
    }
    if (interaction.customId === "randomBtn") {
      const a = await axios.get("https://api.truthordarebot.xyz/api/dare").then(res => {
     let c = res.data.question
       return c;
    })
      const b = await axios.get("https://api.truthordarebot.xyz/v1/truth").then(res => {
     let d = res.data.question
       return d;
    });
  
let dareEmbed = new Discord.EmbedBuilder()
      .setColor(0xe67e22)
      .setTitle(a)
      .setFooter({ text: 'Type: Dare'})
      .setTimestamp()
      .setAuthor({name: 'Requested by ' + interaction.user.username.toString(), iconURL:interaction.user.displayAvatarURL()});
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
      let truthEmbed = new Discord.EmbedBuilder()
      .setColor(0xe67e22)
      .setTitle(b)
      .setFooter({ text: 'Type: Truth'})
      .setTimestamp()
      .setAuthor({name: 'Requested by ' + interaction.user.username.toString(), iconURL:interaction.user.displayAvatarURL()});


const rendom = [
  {embeds: [truthEmbed], components: [mesgRow]},
  {embeds: [dareEmbed], components: [mesgRow]}
]

      await interaction.reply(randomArray(rendom));
    
  }
},
};
const Discord = require('discord.js');
function randomArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('flip')
    .setDescription('Can\'t decide on something? Flip a coin!'),
  async execute(interaction) {
    const coin = [
      "Heads",
      "Tails"
    ]
    await interaction.reply("<a:cflip:1044544309434798101>")
    await wait(1500)
    await interaction.editReply(randomArray(coin))
  },
};
const Discord = require('discord.js');
const os = require('node:os')
const wait = require('node:timers/promises').setTimeout;
var osu = require('node-os-utils')
var cpu = osu.cpu

var count = cpu.count() 

let usg; 

cpu.usage()
  .then(cpuPercentage => {
    usg = cpuPercentage
  })

let jj;
 cpu.free()
  .then(info => {
    jj = info
  })

const ram = os.totalmem()/1073741824

const usedram = os.totalmem() - os.freemem()

const joe = parseFloat(usedram) / os.totalmem() * 100
const ramleft= os.freemem()/1073741824

function formatMS(ms){
let e = (ms / 1000).toString().split(".")[0]
let f;
let c;
let b;
let d;
let g;
let h;
let valArr;
if(e<60){
valArr = `${e}s`
}
if(e>60){
b = e%60
c = (e - b)/60
valArr = null
valArr = `${c}m, ${b}s`
}
if(c>60){
d = c%60
f = (c - d)/60
valArr = null
valArr = `${f}h, ${d}m, ${b}s`
}
if(f>24){
g = f%24
h = (f - g)/24
valArr = null
valArr = `${h}d, ${g}h, ${d}m, ${b}s`
}
return valArr;
}
module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('stats')
    .setDescription('Get stats about DOUS bot.'),
  async execute(interaction) {


    let statsEmbed = new Discord.EmbedBuilder()
      .setColor(0xe67e22)
      .setTitle("Dous Stats")
      .setURL('https://youtu.be/d-ggzGbsEWE')
      
      .addFields({name:`General Info`, value:`\`\`\`yaml
Website: dous.vercel.app
Environment: node.js
Library: discord.js
Language: Javascript
\`\`\``},
                 
                 {name:`Software:`, value:`\`\`\`yaml
OS: ${os.type()}

\`\`\``},
                 
                  {name:`CPU:`, value:`\`\`\`yaml
CPU: ${os.cpus()[0].model}
CPUSPEED: ${os.cpus()[0].speed/1000} GHz 
CPUUSAGE: ${Math.ceil(parseFloat(usg))}%
CPUFREE: ${Math.ceil(parseFloat(jj))}%                 
\`\`\``},
                 
                    {name:`RAM:`, value:`\`\`\`yaml
TOTALRAM: ${Math.ceil(ram)} GB
RAMLEFT: ${Math.ceil(ramleft)} GB
RAMUSAGE: ${Math.ceil(joe)}%
\`\`\``},
                  {name:`Presence`, value:`\`\`\`yaml
Users:  ${ interaction.client.users.cache.size}
Guilds: ${interaction.client.guilds.cache.size}
\`\`\``},
 
                 
                 {name:`Bot Uptime`, value:`\`\`\`yaml
Uptime: ${formatMS(interaction.client.uptime)}
\`\`\``},
                 
                 {name:`Latency`, value:`\`\`\`yaml
Latency: ${Date.now() - interaction.createdTimestamp}ms \`\`\`` },
                
                
                 {name:`Bot Updates` ,  value:`\`\`\`yaml
v1.0: In development\`\`\``},
                 
                  {name:`Developers Info` ,  value:`\`\`\`arm
${title = "Yukon#5482 \nRaxTak#2036"}                                                                              \`\`\``},
    
                  
                
                ) 


         
    .setTimestamp()
    //.setThumbnail(`${interaction.client.user.displayAvatarURL({ size: 1024, dynamic: true })}`)

    
    
    await interaction.reply({ embeds: [statsEmbed] })
  },
};




const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
module.exports = {
    name: 'ping',
    aliases: ['ms', 'lag'],
    description: 'User ping',
    cooldown: 10,
     execute (message, args, commandName, client) { 
         const authorPerms = message.channel.permissionsFor(message.author);
        if(!authorPerms.has('SEND_MESSAGES')) {
            const noperm = new MessageEmbed()
            .setColor('RED')
            .setDescription('You don\'t have enough permission to execute this command.')

            message.reply({embeds: [noperm], allowedMentions: {
                repliedUser: false
            }}).then((sent) => {
                setTimeout(() => {
                    sent.delete()
                }, 9000);
            })
        } else {
       const latency = Date.now() - message.createdTimestamp
       const loading = new MessageEmbed()
       .setColor('#d8feff')
       .setDescription(`Collecting information... <a:web_loading:914794704548294656>`)
       message.channel.send({embeds: [loading]}).then((loadir) => {
           setTimeout(() => {
            const ok = new MessageEmbed()
            .setColor('#d8feff')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(`- **User's latency:** \`${Math.round(latency)}ms\`\n- **Discord API's latency: ** \`${client.ws.ping}ms\``)
            .setFooter('Note: User\'s ping might be displayed incorrectly due to their computer\'s clock')
            loadir.edit({embeds: [ok]})
           }, 3000);
       })
        

        }
    }
}
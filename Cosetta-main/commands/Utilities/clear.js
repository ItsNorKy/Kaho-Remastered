const { MessageEmbed, MessageActionRow, MessageButton, Interaction } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: 'clear',
    aliases: ['clear'],
    description: 'Bot\'s information',
    cooldown: 1,
    execute (message, args, commandName, client, interaction) { 
        const authorPerms = message.channel.permissionsFor(message.author);
       if(!authorPerms.has('ADMINISTRATOR')) {
           const noperm = new MessageEmbed()
           .setColor('RED')
           .setDescription('You don\'t have enough permission to execute this command.')

           message.reply({embeds: [noperm]}).then((sent) => {
               setTimeout(() => {
                   sent.delete()
               }, 9000);
           })

       } else {    

        const amount = args.slice(0).join('')

        if (args.length < 1 ) {
            const Docs = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Documentation')
                .setStyle('LINK')
                .setURL('https://discord.gg/YZ38GjjPFg')
            )

            const invalidlength = new MessageEmbed()
            .setColor('RED')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription('Invalid command usage, please check the documentation.')
            
            message.channel.send({
                embeds: [invalidlength],
                components: [Docs],
            }).then((sent) => {
                setTimeout(() => {
                    sent.delete();
                }, 9000)
            })
        } else { 

        if (isNaN(amount)) {
            const noperm = new MessageEmbed()
           .setColor('RED')
           .setDescription('Invalid number, please try again later.')
           message.reply({embeds: [noperm], allowedMentions: {
            repliedUser: false}}).then((sent) => {
               setTimeout(() => {
                   sent.delete()
               }, 9000);
           })
        } else {
            if (amount >= 100 ) {
                const exceed = new MessageEmbed()
           .setColor('RED')
           .setDescription('Too many messages! Please enter a number below 100.')
           message.reply({embeds: [exceed], allowedMentions: {
            repliedUser: false}}).then((sent) => {
               setTimeout(() => {
                   sent.delete()
               }, 9000);
           })
            } else {
            let rlmap = amount
            const output = ++rlmap
            message.channel.bulkDelete(output, true)
             }
        }
    }
        } 
    } 
}

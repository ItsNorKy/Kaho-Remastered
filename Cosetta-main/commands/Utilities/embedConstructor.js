const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "embed", 
    aliases: ['emb'],
    description: "Sending in embed has never been easier.",
    cooldown: 10,

    execute (message, args, commandName, client, interaction) { 
        const authorPerms = message.channel.permissionsFor(message.author);
       if(!authorPerms.has('ADMINISTRATOR')) {
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

        if(args.length < 1) {
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
                allowedMentions: {
                    repliedUser: false
                }
            }).then((sent) => {
                setTimeout(() => {
                    sent.delete();
                }, 9000)
            })

            } else {
                if (message.deletable) message.delete();
                const embed = new MessageEmbed()
                .setColor('#d8feff')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`${args.slice(0).join(' ')}`)
                message.channel.send({ embeds: [embed] })
            }
           

        }
    }
}
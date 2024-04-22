const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const champ = '<:ChampionQuest:1231876336927113226>'

module.exports = {
    name: "price", 
    aliases: ['price'],
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
                .setColor('#FFE333')
                .setTitle('**Price tag**')
                .setThumbnail('https://cdn-icons-png.flaticon.com/512/747/747781.png')
                .setDescription('Price is not certain and can be changed at any given time.')
                .addFields(
                    {name: `${champ} **Resurgence Champion Quest**`, value: '- ~~75$~~ 15$'},
                    {name: `${champ} **Battle Royale Champion Quest**`, value: '- ~~50$~~ 10$'},
                    {name: `${champ} **Nuke Defuse**`, value: '- Not Available'},
                )
                .setFooter('Last updated: 04/22/2024')
                message.channel.send({ embeds: [embed] })
            }
           

        }
    }
}
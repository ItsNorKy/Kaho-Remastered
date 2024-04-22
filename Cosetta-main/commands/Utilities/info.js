const { MessageEmbed, MessageActionRow, MessageButton, Interaction } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: 'info',
    aliases: ['information', 'details'],
    description: 'Bot\'s information',
    cooldown: 10,
    execute (message, args, commandName, client, interaction) { 
        const authorPerms = message.channel.permissionsFor(message.author);
       if(!authorPerms.has('SEND_MESSAGES')) {
           const noperm = new MessageEmbed()
           .setColor('RED')
           .setDescription('You don\'t have enough permission to execute this command.')

           message.reply({embeds: [noperm]}).then((sent) => {
               setTimeout(() => {
                   sent.delete()
               }, 9000);
           })
       } else {    
        const members = message.guild.members.cache;

        const norkyid = members.get("590827375189557259")
        const jennieeid = "274598441555066880"


        const inforow = new MessageActionRow() 
        .addComponents(
           new MessageButton()
            .setCustomId('contacts')
            .setLabel('Contacts')
            .setStyle('PRIMARY'),

           new MessageButton()
           .setLabel('Main server')
           .setStyle('LINK')
           .setURL('https://discord.gg/prWqhTZnsY'),

           new MessageButton()
           .setLabel('Invite the bot')
           .setStyle('LINK')
           .setURL('https://discord.com/api/oauth2/authorize?client_id=903140596967931954&permissions=8&scope=applications.commands%20bot')
        )

           const info = new MessageEmbed()
            .setColor('#d8feff')
            .setTitle('Bot Information')
            .setURL('https://discord.gg/prWqhTZnsY')
            .setThumbnail('http://assets.stickpng.com/thumbs/5a461418d099a2ad03f9c999.png')
            .setDescription(
                'Cosetta is a multi-function bot, it was created by a team of two people: **JnA**. The bot is currently in its early beta-testing and still under development, any bugs or glitches have to be reported back to the development team via email or Discord DMs.\n** ** \n- Default prefix: \`c/\` \n- Default language: \`English\` \n- Programming language: \`Javascript\` \n- First release date: \`null\`'
                )
            .setFooter('For more information, please consider joining our main server.')

                message.channel.send({
                    embeds: [info],
                    components: [inforow],
                })

            const filter = async (interaction) => {
                if (interaction.user.id === message.author.id) return true;
                await interaction.deferReply()
                return interaction.editReply({ content: "You can't use this button. It's not yours!", ephemeral: true})
            }

            const collector = message.channel.createMessageComponentCollector({
                filter,
                max: 1,
            })

            collector.on('end', async (ButtonInteraction) => {
                const id = ButtonInteraction.first().customId;

                if (id === 'contacts') {
               
                
                const contacts = new MessageEmbed()
                .setColor('#d8feff')
                .setDescription('Please **__DO NOT__** flood our email and dms or you will end up getting blocked.')
                .addFields(
                    {name: '**__Email:__**', value: `- \`cosettadev@gmail.com\``},
                    {name: `**__Discord IDs:__**`, value: `- \`${norkyid.user.tag}\`\n- \`j-ennie#5854\``},
                    
                )

                ButtonInteraction.first().reply({ 
                    embeds: [contacts],
                    ephemeral: true,
                })
            }
            })
        } 
    } 
}

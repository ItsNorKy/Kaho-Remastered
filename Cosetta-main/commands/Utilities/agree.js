const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const champ = '<:ChampionQuest:1231876336927113226>'

module.exports = {
    name: "agree", 
    aliases: ['agree'],
    description: "Sending in embed has never been easier.",
    cooldown: 1,
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
                if (message.deletable) message.delete();
                const embed = new MessageEmbed()
                .setColor('#FFE333')
                .setTitle('**Customer Agreements**')
                .setDescription('If a customer fails to follow the agreements, their active/unfinished order will be cancelled and they **__won\'t be able to request a refund.__**')
                .addFields(
                    {name: `**Sensitive Information**`, value: '1. Customer is expected not to leak any information regarding the service (including how it is operated, information about individuals that are involved)\n2. Customer must agree not to take screenshot/video of the order\'s process as well as its details (This includes in-game and other social platforms such as Disccord, Messenger, Instagram, etc...)'},
                    {name: `**Service Fees & Refund**`, value: '1. Fees are expected if a customer order is taking longer than usual to complete (Customer will be notified about the fees before-hand)\n2. Customer can issue a refund if the order status has not been changed to "In Progress", any later than that a refund request will be invalid and ignored.\n3. Customer is expected not to receive a full refund as fees are also appliable (this situaion rarely happens and if it does customer will be notified before-hand)'},
                )
                .setFooter('Last updated: 04/22/2024')
                message.channel.send({ embeds: [embed] })
            
           

        }
    }
}
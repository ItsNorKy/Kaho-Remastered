const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "rules", 
    aliases: ['rules'],
    description: "Text",
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

                if (message.deletable) message.delete();
                message.channel.send("**⚠️ All server members are required to agree to the following rules. If you are a customer, please read the __Customer Agreements__ before proceeding to purchase from our store.**  \n - Harrasing other clients as well as trying to compromise our business is strictly prohibited \n - Spamming, Advertising is not allowed \n - DO NOT SUBMIT more than one ticket, our system will automatically flag your request and blacklist you \n - You cannot purchase other items in the shop if there is still an active/unfinished order. Your new purchase will be cancelled. \n - Please treat the staff members with respect, contact **@Staff Manager** if you think a staff member is misbehaving.")
    }
}
}
const { Client, Message, MessageEmbed, Collection } = require ('discord.js')
const { PREFIX } = require('../../config.json') 

module.exports = {
    name: 'messageCreate',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client, Discord) {
        if(!message.content.startsWith(PREFIX) || message.author.bot) return;

        const args = message.content.slice(PREFIX.length).split(/ +/);

        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(commandName) || 
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        if (!command) return;
    
        const { cooldowns } = client;
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmt = (command.cooldown || 1) * 1000

        if (timestamps.has(message.author.id)) {
            const expTime = timestamps.get(message.author.id) + cooldownAmt;
            if (now < expTime) {
                const timeLeft = (expTime - now) / 1000
                const embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Command is on cooldown, you need to wait **${timeLeft.toFixed(0)}** more seconds before using it again.`)
                return  message.reply({embeds: [embed], allowedMentions: {
                    repliedUser: false
                }}).then((sent) => {
                    setTimeout(() => {
                        sent.delete()
                    }, 9000);
                })
            }
        }

        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmt)

        try {
            command.execute(message, args, commandName, client, Discord)
        } catch (error) {
            console.log(error)
            const err = new MessageEmbed()
            .setColor('RED')
            .setDescription('An error occured while running this command.')
            message.channel.send({embeds: [err]});
        }
    }
}
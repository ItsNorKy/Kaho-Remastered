// Configs
const { Intents, Collection, MessageButton, MessageActionRow } = require('discord.js')
const Discord = require ('discord.js')
const mongoose = require('mongoose')
const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_INVITES]
});

client.commands = new Collection();
client.cooldowns = new Collection()
client.events = new Collection()

const array = ["commands_handler", "events_handler"];
array.forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

require('dotenv').config()

mongoose.connect('mongodb+srv://Cosetta:03112052@cluster0.qt9aa.mongodb.net/Data', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
 }).then(() => {
     console.log('Database connected.');
 }).catch((err) => {
     console.log(err);
 });

client.login(process.env.token)


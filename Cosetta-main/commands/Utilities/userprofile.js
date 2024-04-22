const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { ButtonInteraction } = require('discord.js');
const Discord = require('discord.js')
const moment = require('moment')
const Schema = require('../../models/profileSchema')
var time = new Date,
timeformat = [time.getMonth()+1,
    time.getDate(),
    time.getFullYear()].join('/')+' '+
    [time.getHours(),
    time.getMinutes(),
    time.getSeconds()].join(':');

//badges
const devbadge = '<:Developer:915832921850527795>'

// badges test
const badges = "`null`"
const subdur = "`null`"
const coin = 0
const loyalty = 1

module.exports = {
    name: "aboutme",
    aliases: ['userinfo', 'myinfo'],
    description: 'User\'s information, details, etc...',
    cooldown: 10,

    execute (message, args, commandName, client, interaction) {
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
              

            if (args[0] != 'edit' && args[0] != 'report') {

            const userprofile = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Details')
                .setCustomId('details')
                .setStyle('PRIMARY')
            )
            const user = message.mentions.users.first() || message.author
            if (user.id === '903140596967931954') {
                const privateaccs = new MessageEmbed()
                .setColor('RED')
                .setThumbnail('https://uxwing.com/wp-content/themes/uxwing/download/03-editing-user-action/lock.png')
                .setAuthor(`${user.tag}'s server profile`, user.avatarURL({ dynamic: true}))
                .setDescription('This profile is private, you cannot view its details.')

                message.reply({
                    embeds: [privateaccs],
                    allowedMentions: {
                        repliedUser: false
                    }
                })
            } else {
                Schema.findOne({ userID: user.id}, async (err, data) => {
                    if (data) {
                        data.userID = user.id
                        data.save()
                    } else {
                    
                        new Schema({
                            userID: user.id,
                            MOTD: 'Welcome to my profile.',
                            status: 1
                        }).save();
                }
            })
            const userdata = message.guild.members.cache.get(user.id)
            const svicon = message.guild.iconURL()
            const info = new MessageEmbed()
            .setColor('#d8feff')
            .setAuthor(`${user.tag}'s server profile`, user.avatarURL({ dynamic: true}))
            .setThumbnail(svicon)
            .addField("**UserID:**", `${user.id}`)
            .addField("**Account creation date:**", `${moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")} - (${moment(user.createdAt).startOf("day").fromNow()})`)
            .addField("**Joined server on:**", `${moment(userdata.joinedAt).format("MMM Do YYYY, h:mm:ss a")} - (${moment(userdata.joinedAt).startOf("day").fromNow()})`)
            .addField("**Server roles:**", `${userdata.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)

            message.reply({ embeds: [info], components: [userprofile], allowedMentions: {
                repliedUser: false
            }}).catch((err) => {
                console.log(err)
            })
        }
            } else if (args[0] === 'edit') { 
                if (args.length < 2) {
                const documentation = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Documentation')
                    .setStyle('LINK')
                    .setURL('https://discord.gg/YZ38GjjPFg')

                )   

                const selection = new MessageEmbed()
                .setColor('#d8feff')
                .setTitle('**Editor**')
                .setURL('https://discord.gg/YZ38GjjPFg')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('- User can only edit the following contents in their profile.')
                .addFields(
                    { name: "1. **MOTD** (`c/aboutme edit MOTD`)", value: "- Your MOTD is limited to 100 characters incase of spamming and causing API Lag."},
                    { name: "2. **Banner** (`c/aboutme edit Banner`)", value: "- Must be a valid image URL."},
                    { name: "3. **Color** (`c/aboutme edit Color`)", value: "- Change the embed color to the color you prefer, MUST BE A HEX-CODE (#XXXX)"},
                    { name: "4. **Status** (`c/aboutme edit Status`)", value: "- Set your profile Public or Private depends on your choice"},
                    )
                .setFooter('Please follow our SFW-Profile ToS closely, violating the ToS will get your profile wiped or even locked.')

                message.reply({ 
                    embeds: [selection],
                    components: [documentation],
                    allowedMentions: {
                        repliedUser: false
                    }
                })
            } else if(args[1] === 'MOTD') {
                if (args.slice(2).length < 1) {
                    const documentation = new MessageActionRow()
                    .addComponents(
                    new MessageButton()
                    .setLabel('Documentation')
                    .setStyle('LINK')
                    .setURL('https://discord.gg/YZ38GjjPFg')

                )   
                    const invalidlength = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription("Your MOTD cannot be empty!")

                    message.reply({ 
                        embeds: [invalidlength],
                        components: [documentation],
                        allowedMentions: {
                            repliedUser: false
                        }
                    })
                } else {
                    if (message.content.length > 119) {
                        const charexceeded = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
                        .setDescription('Your MOTD exceeded 100 characters limit! Please shorten it.')
                        message.reply({
                            embeds: [charexceeded],
                            allowedMentions: {
                                repliedUser: false
                            }

                        })
                    } else {
                    const user = message.author
                    Schema.findOne({ userID: user.id}, async (err, data) => {
                        if (data) {
                            data.userID = user.id
                            data.MOTD = args.slice(2).join(' '),
                            data.save()
                            console.log(data.MOTD)
                        } else {
                        
                            new Schema({
                                userID: user.id,
                                MOTD: args.slice(2).join(' '),
                            }).save();
                    }
                })
                    const confirm = new MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription(`- Your MOTD has been changed to: \n*${args.slice(2).join(' ')}* `)

                    message.reply({ embeds: [confirm], allowedMentions: {
                        repliedUser: false
                    }
                })
            }
                }
             
            }  else if(args[1] === 'Status') {
                    const status = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('private')
                        .setLabel('Private')
                        .setStyle('PRIMARY'),

                        new MessageButton()
                        .setCustomId('public')
                        .setLabel('Public')
                        .setStyle('PRIMARY')
                    )
                    const statusselection = new MessageEmbed()
                    .setColor('#d8feff')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription("Please choose your profile status")

                    message.reply({ 
                        embeds: [statusselection],
                        components: [status],
                        allowedMentions: {
                            repliedUser: false
                        }
                    })

                    const filter = (interaction) => {
                        if (interaction.user.id === message.author.id) return true;
                        return interaction.reply({ content: "You can't use this button. It's not yours!", ephemeral: true})
                    }
        
                 const collector = message.channel.createMessageComponentCollector({
                    filter,
                    max: 1,
                }).catch((err) => {

                })

                collector.on('end', async (ButtonInteraction) => {
                    const id = ButtonInteraction.first().customId;


                    if (id === 'private') {
                        const privatestatus = new MessageEmbed()
                        .setColor('GREEN')
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
                        .setDescription('Your profile status has been set to: `Private`')
                        ButtonInteraction.first().reply({
                            embeds: [privatestatus],
                            ephemeral: true,
                        })

                        Schema.findOne({ userID: message.author.id}, async (err, data) => {
                            if (data) {
                                data.userID = message.author.id
                                data.status = 0
                                data.save()
                                console.log(data.MOTD)
                            } else {
                            
                                new Schema({
                                    userID: message.author.id,
                                    status: 0,
                                }).save();
                        }

                        })
                    } else if (id === 'public') {
                        const publicstatus = new MessageEmbed()
                        .setColor('GREEN')
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
                        .setDescription('Your profile status has been set to: `Public`')
                        ButtonInteraction.first().reply({
                            embeds: [publicstatus],
                            ephemeral: true,
                        })

                        Schema.findOne({ userID: message.author.id}, async (err, data) => {
                            if (data) {
                                data.userID = message.author.id
                                data.status = 1
                                data.save()
                                console.log(data.MOTD)
                            } else {
                            
                                new Schema({
                                    userID: message.author.id,
                                    status: 1,
                                }).save();
                        }

                        })
                    }
                })


                      
                } 
            
            } else if (args[0] === 'report') {
                if(args.length < 2) {
                    const Docs = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Documentation')
                        .setStyle('LINK')
                        .setURL('https://discord.gg/YZ38GjjPFg')
                    )
                    const invalid = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
                    .setDescription('Invalid command usage, please check the documentation.')

                    message.reply({
                        embeds: [invalid],
                        components: [Docs],
                        allowedMentions: {
                            repliedUser: false
                        }
                    }).then((invalid) => {
                        setTimeout(() => {
                            invalid.delete()
                        }, 9000);
                    })
                } else {
                    const Target = message.mentions.users.first() 
                    if(!Target) {

                        const Docs = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setLabel('Documentation')
                            .setStyle('LINK')
                            .setURL('https://discord.gg/YZ38GjjPFg')
                        )

                        const invalid2 = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
                        .setDescription('Invalid command usage, (TARGET) is missing')
                        message.reply({ 
                            embeds: [invalid2],
                            components: [Docs],
                            allowedMentions: {
                                repliedUser: false
                            }
                        }).then((invalid2) => {
                            setTimeout(() => {
                                invalid2.delete()
                            }, 9000);
                        })
                    } else {
                        if (args.length < 3) {
                    const invalid3 = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
                    .setDescription('Invalid command usage, (REASON) is missing')

                    message.reply({
                        embeds: [invalid3],
                        allowedMentions: {
                            repliedUser: false
                        }
                    }).then((invalid3) => {
                        setTimeout(() => {
                            invalid3.delete()
                        }, 9000);
                    })
                        } else {
                            if (message.deletable) message.delete();

                            const success = new MessageEmbed()
                            .setColor('GREEN')
                            .setDescription('You report application has been successfully sent.')
                            message.channel.send({ embeds: [success]}).then((success) => {
                                setTimeout(() => {
                                    success.delete()
                                }, 5500)
                            })
                            const rpcenter = client.channels.cache.get('915852258816696380');
                            const status = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setCustomId('remove')
                                .setLabel('Remove')
                                .setStyle('DANGER')
                            )
                           
                            const reportsend = new MessageEmbed()
                            .setColor('#d8feff')
                            .setAuthor(`${message.author.tag} has filed a report`, message.author.avatarURL({ dynamic: true}))
                            .addField("**User reported:**", `${Target.tag}`)
                            .addField("**TargetID:**", `${Target.id}`)
                            .addField("**Reason:**", `${args.slice(2).join(" ")}`)
                            .addField("**Reported on:**", `${time}`)

                    rpcenter.send({
                        embeds: [reportsend],
                        components: [status],
                    }).then((status) => {
                        client.on("interactionCreate", async (interaction) => {
                            if(interaction.isButton()) {
                                if (interaction.customId === 'remove') {
                                    status.delete()
                                }
                            }
                        })
                    })
                            
                        }
                    }
                }
            }
            const filter = (interaction) => {
                if (interaction.user.id === message.author.id) return true;
                return interaction.reply({ content: "You can't use this button. It's not yours!", ephemeral: true})
            }

         const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1,
        })

        collector.on('end', async (ButtonInteraction) => {
            const id = ButtonInteraction.first().customId;
            if (id === 'details') {
                const user = message.mentions.users.first() || message.author
                Schema.findOne({ userID: user.id}, async (err, data) => {
                    if(!data) return;
                
                const userMOTD = data.MOTD
                const Status = data.status
                if (!data) {
                    console.log('no data')
                }

                if (Status === 1) { // If Status is: Public

                const userdata = message.guild.members.cache.get(user.id)
                const userprofile = new MessageEmbed()
                .setColor('#d8feff')
                .setAuthor(`${user.tag}'s personal profile`, user.avatarURL({ dynamic: true}))
                .setThumbnail(user.avatarURL({ dynamic: true}))
                .setDescription(userMOTD)
                .addField("**Badges:**", `${badges}`)
                .addField("**Subscription:**", `${subdur}`)
                .addField("**Wallet:**", `${coin}`)
                .addField("**Loyalty:**", `Level ${loyalty}.`)

                ButtonInteraction.first().reply({ 
                    embeds: [userprofile],
                    ephemeral: true,
                    allowedMentions: {
                        repliedUser: false
                    }
                }).catch((err) => {
                    console.log(err)
                })
            } else if (Status === 0) {
                const privated = new MessageEmbed()
                .setColor('RED')
                .setThumbnail('https://uxwing.com/wp-content/themes/uxwing/download/03-editing-user-action/lock.png')
                .setAuthor(`${user.tag}'s server profile`, user.avatarURL({ dynamic: true}))
                .setDescription('This profile is private, you cannot view its details.')

                ButtonInteraction.first().reply({
                    embeds: [privated],
                    ephemeral: true,
                    allowedMentions: {
                        repliedUser: false
                    }
                })

            } 
            }).catch((err) => {
                console.log(err)
            })
            
        } 
            
    })
        }
    }
}
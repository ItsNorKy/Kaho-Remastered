const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Schema = require('../../models/profileSchema')
const { ButtonInteraction } = require('discord.js');
var currentDate = new Date()
var datetime = currentDate.getDay() + "/" + currentDate.getMonth() + "/" + currentDate.getFullYear() + " at " + currentDate.getHours() + ":" 
+ currentDate.getMinutes();

module.exports = {
    name: "order", 
    aliases: ['order'],
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

        if (args.length < 1) {
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
                if (args[0] == "add") {

                    if (args.length < 3) {
                    const ditcac = new MessageEmbed()
                    .setDescription("Invalid command usage, please check the following examples")
                    .addFields({
                        name: "c/order add (ORDER_ID) (CUSTOMER TAG)", value: "Create a new order with the following ID"
                    })
                    message.channel.send({embeds: [ditcac]}).then((sent) => {
                        setTimeout(() => {
                            sent.delete()
                        }, 9000);
                    })
                
                 } else {

                    const orderid = args[1];
                    const defaultID = args[2];
                    const selfplays = "---";
                    const prior = "---"
                    const itemd = "---"
                    const timegen = datetime
                    const orderc = message.author.id
                    const paystat = "---"
                    const orders = "Waiting for approval" //default
                        
                            new Schema({
                                userID: orderid,
                                customerID: defaultID,
                                selfplay: selfplays,
                                priorityqueue: prior,
                                item: itemd,
                                orderdate: timegen,
                                ordercreator: orderc,
                                paymentstatus: paystat,
                                orderstatus: orders

                            }).save();

                    const suckadicka = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`The following order ID has been successfully created: **${orderid}**`)
                    message.channel.send({embeds: [suckadicka]})
                }
            } else if (args[0] == "edit") {

                if (args.length < 2) {
                    const ditcac = new MessageEmbed()
                    .setColor("RED")
                    .setDescription("Invalid command usage, please provide an existing order ID in order to edit it")
                    message.channel.send({embeds: [ditcac]}).then((sent) => {
                        setTimeout(() => {
                            sent.delete()
                        }, 9000);
                    })
                
                 } else if (args.length < 3) {

                    const orderid = args[1]

                    Schema.findOne({userID: orderid}, async (err, data) => {

                        if (data) {

                            data.userID = orderid

                            const validdata = new MessageEmbed()
                            .setColor("#FFE333")
                            .setTitle(`${orderid}`)
                            .setThumbnail("https://cdn-icons-png.flaticon.com/512/5996/5996831.png")
                            .setDescription(`This order has been created by: **<@${data.ordercreator}>** for the following client: **${data.customerID}**. More details are displayed below:`)
                            .addFields(
                                {name: `**Items purchased:**`, value: `${data.item}`},
                                {name: `**Self-play?:**`, value: `${data.selfplay}`},
                                {name: `**Priority Queue:**`, value: `${data.priorityqueue}`},
                                {name: `**Payment Status:**`, value: `${data.paymentstatus}`},
                                {name: `**Order Status:**`, value: `${data.orderstatus}`}
                            )
                            .setFooter(`Date of Creation: ${data.orderdate}`)
                            message.channel.send({embeds: [validdata]})


                            } else {
                                const invaliddata = new MessageEmbed()
                                .setColor("RED")
                                .setDescription(`There is no existing order with the provided ID`) // PROVIDED ORDER ID NOT FOUND
                                message.channel.send({embeds: [invaliddata]}) .then((sent) => {
                                    setTimeout(() => {
                                        sent.delete()
                                    }, 9000);
                                })
                            } 
                        })

                 } else if (args[2] == "item") {

                    const itemsmenu = new MessageActionRow()

                    .addComponents(
                    new MessageButton()
                    .setCustomId("resurgence")
                    .setLabel('Resurgence')
                    .setStyle('SECONDARY'),

                    new MessageButton()
                    .setCustomId("battleroyale")
                    .setLabel('Battle Royale')
                    .setStyle('SECONDARY'),    
                    
                    new MessageButton()
                    .setCustomId("cancel")
                    .setLabel('Cancel')
                    .setStyle('DANGER'), 
                    )

                    const itemdesc = new MessageEmbed()
                    .setColor("GREY")
                    .setDescription("Please select an item to be added to the order")
                    message.reply({embeds: [itemdesc], components: [itemsmenu], allowedMentions: {
                        repliedUser: false
                    }}).then((sent) => {

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
                        

                        if (id === 'resurgence') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.item = "Resurgence Champion Quest"
                                    data.save()

                                    const resur = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The item has been updated to: `Resurgence Champion Quest`")
                                    sent.edit({embeds: [resur], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'battleroyale') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.item = "Battle Royale Champion Quest"
                                    data.save()

                                    const br = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The item has been updated to: `Battle Royale Champion Quest`")
                                    sent.edit({embeds: [br], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'cancel') {

                            const cancel = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The following action has been cancelled")
                                    sent.edit({embeds: [cancel], components: []})

                        }
                    })


                    })

                 } else if (args[2] == "self-play") {

                    const itemdesc = new MessageActionRow()

                    .addComponents(
                    new MessageButton()
                    .setCustomId("yes")
                    .setLabel('Yes')
                    .setStyle('SECONDARY'),

                    new MessageButton()
                    .setCustomId("no")
                    .setLabel('No')
                    .setStyle('SECONDARY'),
                    
                    new MessageButton()
                    .setCustomId("cancel")
                    .setLabel('Cancel')
                    .setStyle('DANGER'),  

                    )

                    const selfplay = new MessageEmbed()
                    .setColor("GREY")
                    .setDescription("Please select a state for this option")
                    message.reply({embeds: [selfplay], components: [itemdesc], allowedMentions: {
                        repliedUser: false
                    }}).then((sent) => {

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
                        

                        if (id === 'yes') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.selfplay = "✅"
                                    data.save()

                                    const yes = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The option has been updated to: `Yes ✅`")
                                    sent.edit({embeds: [yes], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'no') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.selfplay = "❌"
                                    data.save()

                                    const br = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The option has been updated to: `No ❌`")
                                    sent.edit({embeds: [br], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'cancel') {

                            const cancel = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The following action has been cancelled")
                                    sent.edit({embeds: [cancel], components: []})

                        }
                    })


                    })

                 } else if (args[2] == "payment") {

                    const itemdesc = new MessageActionRow()

                    .addComponents(
                    new MessageButton()
                    .setCustomId("pending")
                    .setLabel('Pending')
                    .setStyle('SECONDARY'),

                    new MessageButton()
                    .setCustomId("completed")
                    .setLabel('Completed')
                    .setStyle('SECONDARY'),
                    
                    new MessageButton()
                    .setCustomId("cancel")
                    .setLabel('Cancel')
                    .setStyle('DANGER'),  

                    )

                    const selfplay = new MessageEmbed()
                    .setColor("GREY")
                    .setDescription("Please select a state for this option")
                    message.reply({embeds: [selfplay], components: [itemdesc], allowedMentions: {
                        repliedUser: false
                    }}).then((sent) => {

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
                        

                        if (id === 'completed') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.paymentstatus = "Completed"
                                    data.save()

                                    const yes = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The option has been updated to: `Completed`")
                                    sent.edit({embeds: [yes], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'pending') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.paymentstatus = "Pending"
                                    data.save()

                                    const br = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The option has been updated to: `Pending`")
                                    sent.edit({embeds: [br], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'cancel') {

                            const cancel = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The following action has been cancelled")
                                    sent.edit({embeds: [cancel], components: []})

                        }
                    })
                    })

                 } else if (args[2] == "priority") {

                    const itemsmenu = new MessageActionRow()

                    .addComponents(
                    new MessageButton()
                    .setCustomId("yes")
                    .setLabel('Yes')
                    .setStyle('SECONDARY'),

                    new MessageButton()
                    .setCustomId("no")
                    .setLabel('No')
                    .setStyle('SECONDARY'),    
                    
                    new MessageButton()
                    .setCustomId("cancel")
                    .setLabel('Cancel')
                    .setStyle('DANGER'), 
                    )

                    const itemdesc = new MessageEmbed()
                    .setColor("GREY")
                    .setDescription("Please select a state of this option")
                    message.reply({embeds: [itemdesc], components: [itemsmenu], allowedMentions: {
                        repliedUser: false
                    }}).then((sent) => {

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
                        

                        if (id === 'yes') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.priorityqueue = "✅"
                                    data.save()

                                    const yes = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The option has been updated to: `Yes ✅`")
                                    sent.edit({embeds: [yes], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'no') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.priorityqueue = "❌"
                                    data.save()

                                    const no = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The option has been updated to: `No ❌`")
                                    sent.edit({embeds: [no], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'cancel') {

                            const cancel = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The following action has been cancelled")
                                    sent.edit({embeds: [cancel], components: []})

                        }
                    })


                    })

                 } else if (args[2] == "orderstatus") {

                    const itemsmenu = new MessageActionRow()

                    .addComponents(
                    new MessageButton()
                    .setCustomId("waiting")
                    .setLabel('Waiting for approval')
                    .setStyle('SECONDARY'),

                    new MessageButton()
                    .setCustomId("approved")
                    .setLabel('Approved')
                    .setStyle('SECONDARY'),   
                    
                    new MessageButton()
                    .setCustomId("cancelled")
                    .setLabel('Cancelled')
                    .setStyle('SECONDARY'),  

                    new MessageButton()
                    .setCustomId("completed")
                    .setLabel('Completed')
                    .setStyle('SECONDARY'),  
                    
                    new MessageButton()
                    .setCustomId("cancel")
                    .setLabel('Cancel')
                    .setStyle('DANGER'), 
                    )

                    const itemdesc = new MessageEmbed()
                    .setColor("GREY")
                    .setDescription("Please select a state of this option")
                    message.reply({embeds: [itemdesc], components: [itemsmenu], allowedMentions: {
                        repliedUser: false
                    }}).then((sent) => {

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
                        

                        if (id === 'waiting') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.orderstatus = "Waiting for approval"
                                    data.save()

                                    const yes = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The option has been updated to: `Waiting for approval`")
                                    sent.edit({embeds: [yes], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'cancelled') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.orderstatus = "Cancelled"
                                    data.save()

                                    const no = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The option has been updated to: `Cancelled`")
                                    sent.edit({embeds: [no], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'completed') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.orderstatus = "Completed"
                                    data.save()

                                    const no = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The option has been updated to: `Completed`")
                                    sent.edit({embeds: [no], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'approved') {

                            const orderid = args[1]

                            Schema.findOne({userID: orderid}, async (err, data) => {

                                if (data) {

                                    data.orderstatus = "Approved"
                                    data.save()

                                    const no = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The option has been updated to: `Approved`")
                                    sent.edit({embeds: [no], components: []})

                                } else {
                                    console.log(err)
                                } 
                            })

                        } else if (id === 'cancel') {

                            const cancel = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription("The following action has been cancelled")
                                    sent.edit({embeds: [cancel], components: []})

                        }
                    })


                    })

                 }

            } else if (args[[0]] == 'remove') {

                if (args.length < 2) {
                    const ditcac = new MessageEmbed()
                    .setColor("RED")
                    .setDescription("Invalid command usage, please provide an existing order ID in order to remove it")
                    message.channel.send({embeds: [ditcac]}).then((sent) => {
                        setTimeout(() => {
                            sent.delete()
                        }, 9000);
                    })
                
                 } else {

                    const orderid = args[1]

                    Schema.findOne({userID: orderid}, async (err, data) => {

                        if (data) {

                        const options = new MessageActionRow()
                        .addComponents(
                        new MessageButton()
                        .setCustomId('yes')
                        .setLabel('Yes')
                        .setStyle('DANGER'),

                        new MessageButton()
                        .setCustomId('no')
                        .setLabel('No')
                        .setStyle('SECONDARY')
                         )
                            const waitforapprove = new MessageEmbed()
                            .setColor("DARK_RED")
                            .setTitle("**WARNING**")
                            .setThumbnail("https://cdn-icons-png.flaticon.com/512/7801/7801791.png")
                            .setDescription("The following action cannot be undo, are you sure you want to delete the following order? Details are displayed below:")
                            .addFields(
                                {name: `**Customer:**`, value: `${data.customerID}`},
                                {name: `**Items purchased:**`, value: `${data.item}`},
                                {name: `**Self-play?:**`, value: `${data.selfplay}`},
                                {name: `**Priority Queue:**`, value: `${data.priorityqueue}`},
                                {name: `**Payment Status:**`, value: `${data.paymentstatus}`},
                                {name: `**Order Status:**`, value: `${data.orderstatus}`},
                                {name: `**Order created by:**`, value: `<@${data.ordercreator}>`},
                            )
                            .setFooter(`This order was created on ${data.orderdate}`)
                            message.reply({embeds:[waitforapprove], components:[options], allowedMentions: {
                                repliedUser: false
                            }
                            }).then((sent) => {
                            

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
                            

                            if (id === 'yes') {

                                Schema.findOneAndDelete({userID: orderid}, async (err, data) => {

                                    if (err) {
                                        console.log(err)
                                    } else {
                                        const approved = new MessageEmbed()
                                        .setColor('GREEN')
                                        .setDescription('The provided order has been successfully deleted from the database')
                                        sent.edit({embeds: [approved], components:[]})
                                    }
                                }
                            )
                       
                            } else if (id === 'no') {

                            const declined = new MessageEmbed()
                            .setColor('GREY')
                            .setDescription('Action cancelled, no changes were made to the database.')
                            sent.edit({embeds: [declined], components: []})
                            
                        }
                    
                    })
                })
        
                            } else {

                                const invaliddata = new MessageEmbed()
                                .setColor("RED")
                                .setDescription(`There is no existing order with the provided ID`) 
                                message.channel.send({embeds: [invaliddata]}) .then((sent) => {
                                    setTimeout(() => {
                                        sent.delete()
                                    }, 9000);
                                })

                            }
                        })
                 }


            }
                
        }
           
        }
    }
}


// 
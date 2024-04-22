module.exports = {
    name: 'ready',
    execute (client) {
        console.log('Mofuru has awaken')
        client.user.setActivity(`Destroying the Warzone`);
        client.user.setPresence({
            status: 'dnd'
    })
    }
}
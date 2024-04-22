const { readdirSync } = require('fs');

module.exports = (client, Client) => {
		const commandFolders = readdirSync('./commands');
		for (const folder of commandFolders) {
		const commandFiles = readdirSync(`./commands/${folder}`).filter(files => files.endsWith('.js'))
			for (const file of commandFiles) {
		const command = require(`../commands/${folder}/${file}`)
		client.commands.set(command.name, command)		
		}
	}
}
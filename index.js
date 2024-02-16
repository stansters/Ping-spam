const fs = require('node:fs');
const Discord = require('discord.js')
const { Client, ActivityType, Collection } = require("discord.js");
const config = require('./config.json');
const client = new Client({ intents: 14023 });
const sqlite3 = require('sqlite3').verbose();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

const db = new sqlite3.Database('database.db');
db.serialize(() => {
	db.run(
	  `CREATE TABLE IF NOT EXISTS channels (
		name TEXT PRIMARY KEY,
		id TEXT
	  )`
	);
  });

client.once('ready', () => {
	client.user.setPresence({
		activities: [{ name: `wiw yaw cwute widdle pp OwO~`, type: ActivityType.Playing }],
		status: 'dnd',
	});
    var finishedthingy = new Array(`| Successfully logged in as ${client.user.tag} |`.replace( /\s/g,' ').length + 1).join('-');
    console.log(finishedthingy);
    console.log(`| Successfully logged in as ${client.user.tag} |`);
    console.log(finishedthingy);
});




client.login(config.token);
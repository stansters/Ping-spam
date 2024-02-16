const { SlashCommandBuilder } = require('@discordjs/builders');
const sqlite3 = require('sqlite3').verbose();


module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-channels')
		.setDescription('Creates the ping channels (if you already have channels, you must purge them first)')
    .addNumberOption(option =>
      option.setName('times')
        .setDescription('How many ping channels to create?')
        .setRequired(true)),
	async execute(interaction) {
        const chnltimes = interaction.options.getNumber('times')
        await interaction.reply('Working on your request!');
        const db = new sqlite3.Database('database.db');
        if(interaction.member.roles.cache.get('1207970357294800916')) {
          for (let i = 1; i <= chnltimes; i++) {
              const channelName = `ping-${i}`;
              interaction.guild.channels.create({ name: channelName})
                .then((channel) => {
                  console.log(`Created channel ${channel.name} with ID ${channel.id}`);
                  interaction.editReply(`Created channel ${channel.name}  with ID ${channel.id}`);
                  // Store the channel ID in the SQLite database
                  db.run('INSERT INTO channels (name, id) VALUES (?, ?) ', [channelName, channel.id], function(err) {
                    if (err) {
                      return console.error(err.message);
                    }
                    console.log(`Stored channel ${channel.name} with ID ${channel.id}`);
                  });
                })
                .catch(console.error);
            }
          interaction.editReply('All done!')
          } else {
            await interaction.editReply('no.')
          }
        }
};
	

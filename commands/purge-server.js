const { SlashCommandBuilder } = require('@discordjs/builders');
const sqlite3 = require('sqlite3').verbose();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge-channels')
		.setDescription('Deletes all channels'),
	async execute(interaction) {
        await interaction.reply('Working on your request!');
        if(interaction.member.roles.cache.get('1207970357294800916')) {
            const guild = interaction.client.guilds.cache.get('902234903943450716');
            if (!guild) {
              console.error('Unable to find a guild to delete channels in.');
              return;
            }

            // Fetch all channels in the guild
            guild.channels.fetch()
              .then((channels) => {
                // Delete all channels in the guild
                channels.forEach((channel) => {
                  if (channel.deletable && channel.id !== '1207973149304692782') {
                    channel.delete()
                      .then(() => console.log(`Deleted channel ${channel.name} with ID ${channel.id}`))
                      
                      .catch(console.error);
                  } else {
                    console.error(`Unable to delete channel ${channel.name} with ID ${channel.id}`);
                  }
                });
              })
              .catch(console.error);
              const db = new sqlite3.Database('database.db');
              db.run('DELETE FROM channels', [], (err) => {
                if (err) {
                  console.error(err.message);
                  return;
              }
            });
        } else {
            await interaction.editReply("FUCK OFF YOU AINT NUKING MA DAM SERVER U CUNT")
        }
        await interaction.editReply(`Deleted channels and database cleared (requests may be still going through)`)
    }
};
    
	
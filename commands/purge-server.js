const { SlashCommandBuilder } = require('@discordjs/builders');
const sqlite3 = require('sqlite3').verbose();
const { guildId, adminrole, channelwhitelist } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge-channels')
		.setDescription('Deletes all channels'),
	async execute(interaction) {
        await interaction.reply('Working on your request!');
        if(interaction.member.roles.cache.get(adminrole)) {
            const guild = interaction.client.guilds.cache.get(guildId);
            if (!guild) {
              console.error('Unable to find a guild to delete channels in.');
              return;
            }


            guild.channels.fetch()
              .then((channels) => {
                channels.forEach((channel) => {
                  if (channel.deletable && channel.id !== channelwhitelist) {
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
    
	
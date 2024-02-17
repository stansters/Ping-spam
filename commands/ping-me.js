const { SlashCommandBuilder } = require('@discordjs/builders');
const sqlite3 = require('sqlite3').verbose();


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping-me')
		.setDescription('Pings you in all the channels')
    .addNumberOption(option =>
      option.setName('times')
        .setDescription('How many times to ping in each channel? (default is 1)')
        .setRequired(false)),
	async execute(interaction) {
        let timess = interaction.options.getNumber('times')
        if (timess == null){
          var times = (1)
          console.log('(1) Times set to ' + times)
        } else {
          var times = timess
          console.log('(2) Times set to ' + times)
        }
        const db = new sqlite3.Database('database.db');
        await interaction.reply('Working on your request!');


        db.all('SELECT id FROM channels', [], (err, rows) => {
            if (err) {
              console.error(err.message);
              return;
            }
        const totalRows = (rows.length*times)
        console.log('Amount of messages to send: '+totalRows)
        
        function timerfunc(){
          timer = (timer+1)
        }
        var timer = 1
        var runs = 0
        var percentdone = 0
        var minsleft = 0
        var timeleft = 0
        const timerVar = setInterval(timerfunc, 1000)


            for (let i = 0; i < times; i++){
              for (let row of rows) {
                const channelId = row.id;
                const channel = interaction.guild.channels.cache.get(channelId);
                if (channel) {
                  channel.send('@everyone')
                    .then(() => runs = (runs+1))
                    .then(() => percentdone = ((runs/totalRows)*100).toFixed(3))
                    .then(() => minsleft = Math.abs((((timer/runs)*(runs-totalRows))/60).toFixed(2)))
                    .then(() => {if (minsleft < 1){timeleft = Math.round((minsleft*60))+' seconds'} else {timeleft = minsleft+' minutes'}})
                    .then(() => console.log(`Sent message #${runs} in channel ${channel.name} with ID ${channel.id} (${percentdone}% done & ${timeleft} left) ${timer}s`))
                    .then(() => {if (runs == totalRows){
                      clearInterval(timerVar)
                      interaction.channel.send('All done!')
                    }})
                    .catch(console.error);
                } else {
                  console.error(`Unable to find channel with ID $ {channelId}`);
                }
              }
            }
        });
          
        },
    };
	

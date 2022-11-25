module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
        let command = interaction.client.generalCommands.get(interaction.commandName)
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occured\n Please wait till issues get resolved or report at https://discord.gg/BgMhGRyvZY', ephemeral: true });
        }
	},
};
const {MessageActionRow, MessageSelectMenu} = require('discord.js')
module.exports = {
    name: 'ticket',
    usage: 'template',
    category: "mod",
    description: `Commande template.`,
    async execute(client, message, args) {
		message.delete()
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Selecione o tipo de ticket para criar.')
					.addOptions([
						{
							label: '❗ | Escolha um dos Tickets abaixo',
							description: '',
							value: '000',
						},
						{
							label: '📞 | Suporte',
							description: ' Abrir um ticket de Suporte ',
							value: 'suporte',
						},
						{
							label: '⚠️ | Denuncia',
							description: 'Abrir um Ticket de Denúncia ',
							value: 'denuncia',
						},
                        {
							label: '💰 | Compra',
							description: ' Abrir um Ticket de Financeiro ',
							value: 'financeiro',
						},
					]),
			);

        message.channel.send({
            embeds: [{
                title: 'ENG TICKETS',
                description: '**__Como abrir um ticket :__**\nEscolha o tipo de Ticket abaixo para criar.',
                color: "BLURPLE",
                footer: {text: 'Ticket - EngPvP'}
            }],
            components: [row]
        })
    }
}

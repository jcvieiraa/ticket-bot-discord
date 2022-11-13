const {Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu }=require('discord.js')
module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isSelectMenu()) return;
        
	const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('del')
                    .setPlaceholder('Selecione para deletar o ticket !')
					.addOptions([
						{
							label: '🗑️ Deletar o ticket',
							description: 'Deletar',
							value: 'delete',
						}
					])
                );
                
        let catégorie = "1011321322783133736"
        let roleStaff = interaction.guild.roles.cache.get('847148061276504104')
        let roleSell = interaction.guild.roles.cache.get('1000755303161278484')
        let roleSup = interaction.guild.roles.cache.get('844631197174071386')
        let roleRep = interaction.guild.roles.cache.get('844604422210191390')

        let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
        
        if(interaction.customId === "del") {
            if (interaction.values[0] == "delete") {
                const channel = interaction.channel
                channel.delete();
            }
        }

        if (interaction.customId == "select") {
            if (DejaUnChannel) return interaction.reply({content: 'Você já tem um ticket, delete o antigo.', ephemeral: true})

            if (interaction.values[0] == "") {
                interaction.reply({content: `Selecione algum ticket. <#${c.id}>`, ephemeral: true})
            } else if (interaction.values[0] == "denuncia") {
                interaction.guild.channels.create(`tkt-report-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const plainte = new MessageEmbed()
                    .setTitle('Ticket de Denúncia')
                    .setDescription('Por favor, detalhe sua reclamação para que um moderador do servidor venha cuidar dela.')
                    .setFooter('Ticket - EngPvP')
                    c.send({embeds: [plainte], content: `${roleStaff} | ${roleRep} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Seu ticket foi aberto com sucesso. <#${c.id}>`, ephemeral: true})
                })
            } else if (interaction.values[0] == "financeiro") {
                interaction.guild.channels.create(`tkt-financeiro-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const embed = new MessageEmbed()
                    .setTitle('Você abriu um Ticket de Financeiro / Compra')
                    .setDescription('Caso tenha algum problema com compras ou deseja fazer uma nova compra fique no Ticket.')
                    .setFooter('Ticket - EngPvP')
                    c.send({embeds: [embed], content: `${roleSell} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Seu ticket foi aberto com sucesso. <#${c.id}>`, ephemeral: true})
                })
            } else if (interaction.values[0] == "suporte") {
                interaction.guild.channels.create(`tkt-suporte-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const embed = new MessageEmbed()
                    .setTitle('Você abriu um Ticket de Suporte')
                    .setDescription('Escreva sua Dúvida / Necessidade e aguarde por um Staff.')
                    .setFooter('Ticket - EngPvP')
                    c.send({embeds: [embed], content: `${roleSell} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Seu ticket foi aberto com sucesso. <#${c.id}>`, ephemeral: true})
                })
                
            }
        }
    }
}
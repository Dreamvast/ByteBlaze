import { Accessableby, Command } from '../../structures/Command.js'
import { CommandHandler } from '../../structures/CommandHandler.js'
import { Manager } from '../../manager.js'
import { stripIndents } from 'common-tags'
import { EmbedBuilder } from 'discord.js'

export default class implements Command {
  public name = ['info']
  public description = 'Shows the information of the Bot'
  public category = 'Info'
  public accessableby = [Accessableby.Member]
  public usage = ''
  public aliases = []
  public lavalink = false
  public options = []
  public playerCheck = false
  public usingInteraction = true
  public sameVoiceCheck = false
  public permissions = []

  public async execute(client: Manager, handler: CommandHandler) {
    await handler.deferReply()

    const botInfo = stripIndents`\`\`\`
    Codename         | ${client.manifest.metadata.bot.codename}
    Bot Version      | ${client.manifest.metadata.bot.version}
    Node.js          | ${process.version}
    Discord.js       | ${client.manifest.package.discordjs}
    Rainlink         | ${client.manifest.package.rainlink}
    Autofix Version  | ${client.manifest.metadata.autofix.version}
    Autofix Codename | ${client.manifest.metadata.autofix.codename}
    Guild Count      | ${client.guilds.cache.size}
    User Count       | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}
    Total Packages   | ${client.manifest.package.totalAmount}
    \`\`\``

    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user!.username,
        iconURL: String(client.user!.displayAvatarURL({ size: 2048 })),
      })
      .setColor(client.color)
      .addFields({ name: 'Bot Info', value: botInfo })
      .setTimestamp()
    await handler.editReply({ embeds: [embed] })
  }
}

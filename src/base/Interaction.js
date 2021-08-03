const {isEqual} = require("lodash");

class Interaction {
  constructor(client, options) {
    options.permissions = options.permissions || {}
    this.client = client;

    this.help = {
      name: options.name || null
    };

    this.config = {
      data: options.data || null,
      guild: options.guild || null,
      permissions: {
        user: options.permissions.user || [],
        bot: options.permissions.bot || [],
        optional: options.permissions.optional || []
      },
    };
  }

  async checkUpdates(data, guild) {
    let route = this.client.application;
    if (guild) route = await this.client.guilds.fetch(guild);

    const applicationCommands = await route.commands.fetch();
    const command = applicationCommands.find(x => x.name === data.name || x.description === data.description);
    if (!command) return await route.commands.create(data, guild);

    const resolvedCommand = { name: command.name, description: command.description, options: command.options };
    if (!isEqual(this.removeUndefinedValues(resolvedCommand), data)) return await route.commands.edit(command.id, data, guild);
  }

removeUndefinedValues(obj) {
  const retObj = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    if (typeof value !== 'object') {
      retObj[key] = value
      continue;
    }
    if (Array.isArray(value)) {
      const retArr = []
      value.forEach((x, i) => {
        const arrayObj = this.removeUndefinedValues(x)
        retArr[i] = arrayObj
      })
      retObj[key] = retArr
      continue;
    }
    const finalObj = this.removeUndefinedValues(value)
    retObj[key] = finalObj
  }
  return retObj
}

}

module.exports = Interaction;

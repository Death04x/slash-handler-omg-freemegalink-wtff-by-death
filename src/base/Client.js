const {Client, Collection} = require("discord.js");
const {readdirSync} = require("fs");

class BaseClient extends Client{
  constructor(options = {}){
    super(options);

this.commands = new Collection();
this.commands.interactions = new Collection();

  }

async login(token){
 await super.login(token);
 return this
}

loadCommands(path){

  for(const folder of readdirSync(path)){
    for(const cmd of readdirSync(`${path}/${folder}`)){
      const command = new (require(`../comandos/${folder}/${cmd}`))(this);
      command.help.category = folder
      command.help.name = cmd.split(".")[0]
      this.commands.set(command.help.name, command)
    }
  }

  return this;
}

loadInteractions(path){
 
  for(const folder of readdirSync(path)){
    for(const cmd of readdirSync(`${path}/${folder}`)){
      const interaction = new (require(`../interactions/${folder}/${cmd}`))(this);
      interaction.help.name = cmd.split(".")[0]
      this.commands.interactions.set(interaction.help.name, interaction)
    }
  }

  return this; 
}

loadEvents(path){
  for(const evt of readdirSync(path)){

  if(!evt.endsWith(".js")){ //Process events (handling internal errors)
    for(const internalEvt of readdirSync(`${path}/${evt}`)){
      const event = new (require(`../eventos/${evt}/${internalEvt}`))(this)
      require(evt).on(internalEvt.split(".")[0], (...args) => event.run(...args))
    }
    continue;
  }

    const event = new (require(`../eventos/${evt}`))(this)
    super.on(evt.split(".")[0], (...args) => event.run(...args))
  }

  return this;
}
  
async loadEmotes(guilds){ //Loading emotes property (use this instead strings)
  for(const guild of guilds){
  const server = this.guilds.cache.get(guild) || await this.guilds.fetch(guild).catch(() => {})
  if(!server || !server.emojis) continue;
if(!this.emotes) this.emotes = {}

  for(const emoji of server.emojis.cache.map(x => x)){
    Object.defineProperty(this.emotes, emoji.name.toLowerCase(), {
      value: emoji.toString(),
      writable: false
    })
  }
}

}

}

module.exports = BaseClient;

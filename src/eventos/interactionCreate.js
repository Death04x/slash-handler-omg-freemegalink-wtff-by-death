class Interaction {
  constructor(client) {
    this.client = client
  }
  async run(interaction) {

if(interaction.type === "APPLICATION_COMMAND"){

    const interactionCommand = this.client.commands.interactions.get(i.commandName)
    if (!interactionCommand) return;
    
    const options = {}
    this.getOptions(interaction.options.data, options)

try{
   await interactionCmd.run(interaction, options);
}catch(e){
   console.error(`[InteractionCreate] Caught error running ${interactionCmd.help.name} command:
   ${e}`)
}

 getOptions(options, route) {
      for (const option of options) {
        const { name, ...rest } = option
        if (rest.type.startsWith("SUB_COMMAND")) {
          route[name] = {}
          this.getOptions(rest.options, route[name])
        } else {
          if (!rest.role && !rest.channel && !rest.user) route[name] = rest.value
          else route[name] = rest
        }
      }
    }
  }

}
  
  module.exports = Interaction;

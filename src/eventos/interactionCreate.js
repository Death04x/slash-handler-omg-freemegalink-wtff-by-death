class Interaction {
  constructor(client) {
    this.client = client
  }
  async run(interaction) {

if(interaction.type === "APPLICATION_COMMAND"){

    const interactionCommand = this.client.commands.interactions.get(i.commandName)
    if (!interactionCommand) return;
    
    const options = {}
    this.parseOptions(interaction, options)

try{
   await interactionCmd.run(interaction, options);
}catch(e){
   console.error(`[InteractionCreate] Caught error running ${interactionCmd.help.name} command:
   ${e}`)
}

  parseOptions(interaction, route) {
    getOptions(interaction.options.data, route)

    function getOptions(options, route) {
      for (const option of options) {
        const { name, ...rest } = option
        if (rest.type.startsWith("SUB_COMMAND")) {
          route[name] = {}
          getOptions(rest.options, route[name])
        } else {
          if (!rest.role && !rest.channel && !rest.user) route[name] = rest.value
          else route[name] = rest
        }
      }
    }
  }

}
  
  module.exports = Interaction;

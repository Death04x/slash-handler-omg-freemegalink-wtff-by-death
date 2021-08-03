class Ready {
constructor(client){
this.client = client
}
async run(){
  
this.client.loadEmotes(["123456789012345678"]) //Array of Guild IDs, assigns guilds emotes in client instance, use this as: client.emotes.info (LowerCase emoji name) 
  
this.checkInteractionUpdates()

checkInteractionUpdates(){
  this.client.commands.interactions.each(interaction => interaction.checkUpdates(interaction.config.data, interaction.config.guild))
}

}

module.exports = Ready;

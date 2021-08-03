class Ready {
constructor(client){
this.client = client
}
async run(){
  
this.checkInteractionUpdates()

checkInteractionUpdates(){
  this.client.commands.interactions.each(interaction => interaction.checkUpdates(interaction.config.data, interaction.config.guild))
}

}

module.exports = Ready;

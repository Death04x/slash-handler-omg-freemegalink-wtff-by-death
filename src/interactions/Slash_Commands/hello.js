const Base = require("../../base/Interaction.js");

class Hello extends Base {

  constructor(client) {
    super(client, {
      data: {
        name: "hello",
        description: "ola",
        options: [
          {
            type: 'USER',
            name: 'usuario',
            description: 'Usuario a saludar',
            required: true
          }
        ]
      },
      guild: '123456789012345678' //Specify a guild ID if u don't want this command as public command 
    });
  }

async run(interaction, options) {

    if(options.usuario){
    return await interaction.reply(`Saludos rey ${options.usuario.user}`) //options.usuario can have resolved User and resolved GuildMember (https://discord.js.org/#/docs/main/master/typedef/CommandInteractionOption)
    }

}

module.exports = Hello;

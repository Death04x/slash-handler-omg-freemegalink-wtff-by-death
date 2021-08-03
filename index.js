const Client = require('./src/base/Client');

const client = new Client();

client
	.loadCommands('./src/commands') //Commands dir
	.loadInteractions('./src/interactions') 
	.loadEvents('./src/events');

client
	.login(process.env.TOKEN);

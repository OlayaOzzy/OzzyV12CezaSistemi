const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
let komutCooldown = new Set();

module.exports = message => {
  if (komutCooldown.has(message.author.id)) {
    return;
  }
  komutCooldown.add(message.author.id); // Ozzy tarafından geliştirildi
	setTimeout(() => {
    komutCooldown.delete(message.author.id);
  }, 1250);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let args = message.content.split(' ').slice(1);
  let perms = client.yetkihesapla(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
   if (cmd.conf.enabled === false) {
      if (!ayarlar.sahip.includes(message.author.id) && !ayarlar.sahip.includes(message.author.id)) {
                return
      }
    }
    
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, args, perms);
  }

};

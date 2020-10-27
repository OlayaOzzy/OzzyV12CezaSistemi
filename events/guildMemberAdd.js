const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
let db = require("quick.db")
module.exports = async(member) => {
  let muterolu = ayarlar.muterolu || "muterolid"
  let jailrolu = ayarlar.jailrolu || "jailroluid"
  let boostrolu = ayarlar.boosterrolu || "boosterroluid"

 let x = db.fetch(`Hapiste_${member.guild.name}_${member.id}`)
 let y = db.fetch(`Mutede_${member.guild.name}_${member.id}`)
  if(x) {
  setTimeout(() => {
member.roles.cache.has(boostrolu) ? member.roles.set([boostrolu,jailrolu]) : member.roles.set([jailrolu])
}, 5000)
}
if(y) {
member.roles.add(muteroluid).catch(err => console.log(err))
}
};

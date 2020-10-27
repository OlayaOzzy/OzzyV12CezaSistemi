const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
let db = require("quick.db")
module.exports = async(member) => {
console.log("Ozi test edio")
  let muterolu = ayarlar.muterolu || "muterolid"
  let jailrolu = ayarlar.jailrolu || "jailroluid"
  let boostrolu = ayarlar.boosterrolu || "boosterroluid"

 let x = await  db.fetch(`Hapiste_${member.guild.name}_${member.id}`)
 let y = await  db.fetch(`Mutede_${member.guild.name}_${member.id}`)
  if(x) {
  setTimeout(() => {
member.roles.cache.has(boostrolu) ? member.roles.set([boostrolu,jailrolu]) : member.roles.set([jailrolu])
}, 5000);
}
if(y) {
member.roles.add(muterolu).catch(err => console.log(err));
}
};

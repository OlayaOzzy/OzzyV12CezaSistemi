const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const moment = require("moment")
module.exports = () => {
    //Ozzy's ready
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Ozzy's V12 Register: Aktif, Komutlar ve Events Dosyası Yüklendi!`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Client Username: ${client.user.username} ile giriş yapıldı!`);
    client.user.setPresence({ activity: { name: `Ozzy ❤️ Serendia` , type: "PLAYING"}, status: 'dnd' })
            .then(console.log)
            .catch(console.error); 
}

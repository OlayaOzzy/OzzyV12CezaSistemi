// Bu bot Ozzy tarafından 24.10.2020 Tarihinde Serendiadaki herkes ve Sude için geliştirilmiştir.
// İçindeki kodları Dilediğiniz gibi kullanabilirsiniz.
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const ytdl = require('ytdl-core');
const prefix = ayarlar.prefix;
const sahip = ayarlar.sahip;
global.client = client;
require('./util/eventLoader')(client);

// Command Handler
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        console.log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

// Client Loader
client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.yetkihesapla = message => {
    if (!message.guild) {
        return;
    }
    let yetkiseviyesi = 0;
    if (message.member.hasPermission("MANAGE_MESSAGES")) yetkiseviyesi = 1;
    if (message.member.hasPermission("BAN_MEMBERS")) yetkiseviyesi = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) yetkiseviyesi = 3;
    if (message.author.id === ayarlar.sahip) yetkiseviyesi = 4;
    return yetkiseviyesi;
};

// Database Handler
const db = require('quick.db');

client.login(ayarlar.token).then(console.log(`Giriş Başarılı! Bot aktif.`)).catch(err => console.log(err))
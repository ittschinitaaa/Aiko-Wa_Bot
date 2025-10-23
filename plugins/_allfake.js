import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) { 
global.canalIdM = ["120363345778623279@newsletter", "120363419164978167@newsletter", "120363402839382986@newsletter"]
global.canalNombreM = ["౨🌷 𝗔𝗶𝗸𝗼 𝗕𝗼𝘁 𝗢𝗳𝗶𝗰𝗶𝗮𝗹 𝗖𝗵𝗮𝗻𝗻𝗲𝗹 🌷ৎ ", "౨🌷 𝗔𝗶𝗸𝗼 𝗕𝗼𝘁 𝗖𝗵𝗮𝗻𝗻𝗲𝗹 𝗨𝗽𝗱𝗮𝘁𝗲'𝘀 🌷ৎ"," =͟͟͞͞𝐒𝐩𝐚𝐜𝐞 𝐖𝐨𝐫𝐥𝐝 - 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ✰"]
global.channelRD = await getRandomChannel()

global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, {weekday: 'long'})
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
global.mes = d.toLocaleDateString('es', {month: 'long'})
global.año = d.toLocaleDateString('es', {year: 'numeric'})
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

var canal = 'https://whatsapp.com/channel/0029Van1PcoFSAt50tWN4d0x'  
var comunidad = 'https://whatsapp.com/channel/0029Vb6GYInD8SDuyzHk3f3l'
var git = 'https://github.com/ittschinitaaa'
var github = 'https://github.com/ittschinitaaa/Aiko-Bot' 
var correo = 'itts.chinitaaa@gmail.com'
global.redes = [canal, comunidad, git, github, correo].getRandom()

global.nombre = m.pushName || 'Anónimo'
global.packsticker = `𓂃˖˳·˖ ִֶָ ⋆🌷͙⋆  ִֶָ˖·˳˖𓂃 ִֶָ\n👑 Usuario: ${nombre}\n🤖 Bot: ${botname}\n📅 Fecha: ${fecha}\n⏰ Hora: ${moment.tz('America/Argentina/Buenos_Aires').format('HH:mm:ss')}`
global.packsticker2 = `\n𓂃˖˳·˖ ִֶָ ⋆🌷͙⋆  ִֶָ˖·˳˖𓂃 ִֶָ\n\n${dev}`
  
global.fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: '', newsletterName: channelRD.name }, externalAdReply: { title: botname, body: dev, mediaUrl: null, description: null, previewType: "PHOTO", thumbnail: await (await fetch(icono)).buffer(), sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, mentionedJid: null }}
}

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalIdM.length)
let id = canalIdM[randomIndex]
let name = canalNombreM[randomIndex]
return { id, name }
}

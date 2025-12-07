/*import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'
let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
  try {
    await m.react('🍁')

    let mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[m.sender] || {}
    let name = await conn.getName(m.sender)
    let premium = user.premium ? '✔️ Sí' : 'free'
    let limit = user.limit || 10
    let totalreg = Object.keys(global.db.data.users).length
    let groupUserCount = m.isGroup ? participants.length : '-'
    let groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
    let uptime = clockString(process.uptime() * 1000)
    let fecha = new Date(Date.now())
    let locale = 'es-PE'
    let dia = fecha.toLocaleDateString(locale, { weekday: 'long' })
    let fechaTxt = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let hora = fecha.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })

    let totalCommands = Object.keys(global.plugins).length
    let readMore = String.fromCharCode(8206).repeat(4001)

    let userIdNum = m.sender.split('@')[0]
    let phone = PhoneNumber('+' + userIdNum)
    let pais = phone.getRegionCode() || 'Desconocido 🌐'
 
    let tags = {
      'info': '🪹 `𝐈𝐍𝐅𝐎` ❐',
      'main': '❄️ `𝐌𝐀𝐈𝐍` ❐',
      'anime': '🧃 `𝐀𝐍𝐈𝐌𝐄` ❐',
      'menu': '🦋 `𝐌𝐄𝐍𝐔𝐒` ❐',
      'search': '🍧 `𝐁𝐔𝐒𝐐𝐔𝐄𝐃𝐀𝐒` ❐',
      'download': '🍃 `𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒` ❐',
      'socket': '🧊 `𝐉𝐀𝐃𝐈-𝐁𝐎𝐓𝐒` ❐',
      'rg': '🪵 `𝐏𝐄𝐑𝐅𝐈𝐋` ❐',
      'fun': '🪴 `𝐅𝐔𝐍` ❐',
      'rpg': '🪸 `𝐄𝐂𝐎𝐍𝐎𝐌𝐈𝐀` ❐',
      'gacha': '🪷 `𝐆𝐀𝐂𝐇𝐀` ❐',
      'game': '🪺 `𝐆𝐀𝐌𝐄` ❐',
      'group': '🕸️ `𝐆𝐑𝐔𝐏𝐎` ❐',
      'nable': '💫 `𝐎𝐍 / 𝐎𝐅𝐅` ❐',
      'ia': ' 🌿 `𝐈𝐍𝐓𝐄𝐋𝐈𝐆𝐄𝐍𝐂𝐈𝐀` ❐',
      'stalk': '💐 `𝐒𝐓𝐀𝐋𝐊`  ❐',
      'maker': '🎋 `𝐋𝐎𝐆𝐎𝐓𝐈𝐏𝐎𝐒` ❐',
      'tools': '🍬 `𝐓𝐎𝐎𝐋𝐒` ❐',
      'sticker': '👾🪼 `𝐒𝐓𝐈𝐂𝐊𝐄𝐒` ❐',
      'owner': '🐦‍🔥 `𝐎𝐖𝐍𝐄𝐑` ❐',
      'nsfw': '👾 `𝐍𝐒𝐅𝐖` ❐',
    }

    let commands = Object.values(global.plugins)
      .filter(v => v.help && v.tags)
      .map(v => {
        return {
          help: Array.isArray(v.help) ? v.help : [v.help],
          tags: Array.isArray(v.tags) ? v.tags : [v.tags]
        }
      })

    let menuTexto = ''
    for (let tag in tags) {
      let comandos = commands
        .filter(cmd => cmd.tags.includes(tag))
        .map(cmd => cmd.help.map(e => `• ۫  𖢷͜੭ 🌴ֹ 𔐼ֹ֪➩ \`\`\`${usedPrefix}${e}\`\`\``).join('\n'))
        .join('\n')
      if (comandos) {
        menuTexto += `\n\n> ׅ    𓈈 ׁ ${tags[tag]} 𓏽 ֟꒱𑁬
${comandos}\n`
      }
    }

    const infoUser = `̮═͜═࣪͜═͜═࣪͜═͜═࣪͜═͜═࣪͜═͜═࣪͜ ִ  ۫ 𔐼ֹ ⸼ ࣪࣪ ۪ ═͜═࣪͜═͜═࣪͜═͜═࣪͜═͜═࣪͜═͜═
> ✰ ¡Hola! @${userIdNum}, Soy *${botname}*, Aquí tienes la lista de comandos.
> ✯  ִ ࣪ 𓈒 ᗣ  ${ucapan()}  ࣫ㅤׅ 🍋‍🟩۫ 

﹙🥦 ﹚ ੭੭ ─ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎𝐍  ﾟ･:𑇛
 ⌗ֶㅤ֯𝅄⿻ 🪹 ׄ ⬭ 🄿remium: *${premium}*
 ⌗ֶㅤ֯𝅄⿻ 🌵 ׄ ⬭ 🄿ais: *${pais}*
 ⌗ֶㅤ֯𝅄⿻ 🪽 ׄ ⬭ 🄻imite: *${limit}*
 ⌗ֶㅤ֯𝅄⿻ 🌿 ׄ ⬭ 🅄sers registrados: *${totalreg}*
 ⌗ֶㅤ֯𝅄⿻ 🍄 ׄ ⬭ 🄶rupos activos: *${groupsCount}*
 ⌗ֶㅤ֯𝅄⿻ 🌟 ׄ ⬭ 🅁untime: *${uptime}*
${readMore}

 ⌗ֶㅤ֯𝅄⿻ 🫛 ׄ ⬭ 🄱ot: *${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Sub-Bot')}*
 ⌗ֶㅤ֯𝅄⿻ 🎋 ׄ ⬭ 🄲omandos: *${totalCommands}*
 ⌗ֶㅤ֯𝅄⿻ 🌾 ׄ ⬭ 🅅ersion: *${vs}*
 ⌗ֶㅤ֯𝅄⿻ 🍟 ׄ ⬭ 🄻ibreria: *${libreria}*
 ⌗ֶㅤ֯𝅄⿻ 🥢 ׄ ⬭ 🄵echa: *${hora}, ${dia}, ${fechaTxt}*

${readMore}
     *✎ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs ✰*`.trim()

    const icon = [
      'https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1763911352440_131724.jpeg',
      'https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1763911305951_36243.jpeg',
      'https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1763911237754_990508.jpeg',
      'https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1763911566098_479123.jpeg'
    ]
    let icons = icon[Math.floor(Math.random() * icon.length)]
    
  const Shadow_url = await (await fetch(icons)).buffer()
  const fkontak = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      productMessage: {
        product: {
          productImage: {
            mimetype: "image/jpeg",
            jpegThumbnail: Shadow_url
          },
          title: "𝐌 𝐄 𝐍 𝐔 • 𝐊 𝐀 𝐍 𝐄 𝐊 𝐈",
          description: "",
          currencyCode: "USD",
          priceAmount1000: 10000,
          retailerId: "menu"
        },
        businessOwnerJid: "51919199620@s.whatsapp.net"
      }
    }
  }

await conn.sendMessage(m.chat, { 
text: infoUser + menuTexto,
contextInfo: {
 //mentionedJid: [mentionedJid],
 isForwarded: true,
 forwardedNewsletterMessageInfo: {
   newsletterJid: channelRD.id,
   serverMessageId: '',
   newsletterName: channelRD.name
 },
 externalAdReply: {
   title: botname,
   body: textbot,
   mediaType: 1,
   mediaUrl: redes,
   sourceUrl: redes,
   thumbnail: await (await fetch(banner)).buffer(),
   showAdAttribution: false,
   containsAutoReply: true,
   renderLargerThumbnail: true
 }}}, { quoted: fkontak })

 } catch (e) {
   console.error(e)
   await conn.sendMessage(m.chat, { 
     text: `✘ Error al enviar el menú: ${e.message}`,
     mentionedJid: [mentionedJid]
   })
 }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú','allmenu','menucompleto']

export default handler

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH')
  let res = "🅑𝖚𝖊𝖓𝖆𝖘 ɴᴏᴄʜᴇ𝓢 👻"
  
  if (time >= 5 && time < 12)
    res = "🅑𝖚𝖊𝖓𝖔𝖘 𝒟í𝖆𝓢 ☀️"
  else if (time >= 12 && time < 18)
    res = "🅑𝖚𝖊𝖓𝖆𝖘 Ŧ𝖆𝖗𝖉𝖊𝓢 🌤️"
  else if (time >= 18)
    res = "🅑𝖚𝖊𝖓𝖆𝖘 ɴᴏᴄʜᴇ𝓢 🌌"

  return res
}*/

import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
let mentionedJid = await m.mentionedJid
let userId = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.sender
let totalreg = Object.keys(global.db.data.users).length
let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length

let txt = `
̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮
︶•︶°︶•︶°︶•︶°︶•︶°︶•︶°︶•︶
> ¡𝐇𝐨𝐥𝐚! @${userId.split('@')[0]}, 𝐒𝐨𝐲 *${botname}*, 𝐀𝐪𝐮𝐢 𝐭𝐢𝐞𝐧𝐞𝐬 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬.


\`⭐ 𝖳𝖨𝖯𝖮:\` » ${(conn.user.jid == global.conn.user.jid ? '𝗣rіᥒᥴі⍴ᥲᥣ 🌷' : '𝗦ᥙᑲ-𝗕᥆𝗍 ❤')}
\`🪻 𝖵𝖤𝖱𝖲𝖨𝖮́𝖭:\` » ${vs}
\`👑 𝖮𝖶𝖭𝖤𝖱:\` » +${suittag}
\`🍯 𝖯𝖫𝖴𝖦𝖨𝖭𝖲:\` » ${totalCommands}
\`🍄 𝖫𝖨𝖡𝖱𝖤𝖱𝖨𝖠:\` » ${libreria}

𓂂𓏸  𐅹੭੭   *\`𝗗᥆ᥕᥒᥣ᥆ᥲძ\`* ☁ ᦡᦡ

ര ׄ ☁️ ׅ #𝗍іk𝗍᥆k • #𝗍𝗍  + [ᥣіᥒk] / [ᑲᥙ́s𝗊ᥙᥱძᥲ]
ര ׄ ☁️ ׅ #mᥱძіᥲ𝖿іrᥱ • #m𝖿 + [ᥣіᥒk]
ര ׄ ☁️ ׅ #mᥱgᥲ • #mg + [ᥣіᥒk]
ര ׄ ☁️ ׅ #⍴ᥣᥲᥡ • #⍴ᥣᥲᥡ2 + [ᥴᥲᥒᥴі᥆́ᥒ]
ര ׄ ☁️ ׅ #ᥡ𝗍m⍴3 • #ᥡ𝗍m⍴4 + [ᥣіᥒk]
ര ׄ ☁️ ׅ #𝖿ᥲᥴᥱᑲ᥆᥆k • #𝖿ᑲ + [ᥣіᥒk]
ര ׄ ☁️ ׅ #𝗍ᥕі𝗍𝗍ᥱr • #᥊ + [ᥣіᥒk]
ര ׄ ☁️ ׅ #іg • #іᥒs𝗍ᥲgrᥲm + [ᥣіᥒk]
ര ׄ ☁️ ׅ # ⍴іᥒ𝗍ᥱrᥱs𝗍 • #⍴іᥒ + [ᑲᥙ́s𝗊ᥙᥱძᥲ] / [ᥣіᥒk]
ര ׄ ☁️ ׅ #іmᥲgᥱ • #іmᥲgᥱᥒ + [ᑲᥙs𝗊ᥙᥱძᥲ]
ര ׄ ☁️ ׅ #ᥲ⍴k • #m᥆ძᥲ⍴k + [ᑲᥙs𝗊ᥙᥱძᥲ]
ര ׄ ☁️ ׅ #ᥡ𝗍sᥱᥲrᥴһ • #sᥱᥲrᥴһ + [ᑲᥙ́s𝗊ᥙᥱძᥲ]

𓂂𓏸  𐅹੭੭   *\`𝗦᥆ᥴkᥱ𝗍s\`* 🪼 ᦡᦡ

ര ׄ 🪼 ׅ #𝗊r • #ᥴ᥆ძᥱ
ര ׄ 🪼 ׅ #ᑲ᥆𝗍s • #ᑲ᥆𝗍ᥣіs𝗍
ര ׄ 🪼 ׅ #s𝗍ᥲ𝗍ᥙs • #ᥱs𝗍ᥲძ᥆
ര ׄ 🪼 ׅ #⍴ • #⍴іᥒg
ര ׄ 🪼 ׅ #ȷ᥆іᥒ + [іᥒ᥎і𝗍ᥲᥴі᥆́ᥒ]
ര ׄ 🪼 ׅ #lᥱᥲ᥎ᥱ • #sᥲᥣіr
ര ׄ 🪼 ׅ #ᥣ᥆g᥆ᥙ𝗍
ര ׄ 🪼 ׅ #rᥱᥣ᥆ᥲძ
ര ׄ 🪼 ׅ #sᥱ𝗍⍴𝖿⍴ • #sᥱ𝗍іmᥲgᥱ
ര ׄ 🪼 ׅ #sᥱ𝗍s𝗍ᥲ𝗍ᥙs + [ᥱs𝗍ᥲძ᥆]
ര ׄ 🪼 ׅ #sᥱ𝗍ᥙsᥱrᥒᥲmᥱ + [ᥒ᥆mᑲrᥱ]

𓂂𓏸  𐅹੭੭   *\`𝗨𝗍іᥣіძᥲძᥱs\`* 🌳 ᦡᦡ

ര ׄ 🌳 ׅ #һᥱᥣ⍴ • #mᥱᥒᥙ
ര ׄ 🌳 ׅ #ᥴrᥱᥲძ᥆rᥲ • #᥆ᥕᥒᥱr
ര ׄ 🌳 ׅ #sᥴ • #sᥴrі⍴𝗍
ര ׄ 🌳 ׅ #sᥙg • #sᥙggᥱs𝗍
ര ׄ 🌳 ׅ #rᥱ⍴᥆r𝗍ᥱ • rᥱ⍴᥆r𝗍ᥲr
ര ׄ 🌳 ׅ #ᥴᥲᥣᥴᥙᥣᥲr • #ᥴᥲᥣ
ര ׄ 🌳 ׅ #𝗍ᥲmᥲᥒ̃᥆ + [ᥴᥲᥒ𝗍іძᥲძ]
ര ׄ 🌳 ׅ #ძᥱᥣmᥱ𝗍ᥲ
ര ׄ 🌳 ׅ #gᥱ𝗍⍴іᥴ • #⍴𝖿⍴ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🌳 ׅ #say + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🌳 ׅ #sᥱ𝗍mᥱ𝗍ᥲ + [ᥲᥙ𝗍᥆r] | [⍴ᥲᥴk]
ര ׄ 🌳 ׅ #s𝗍іᥴkᥱr • #s • #ᥕm + [ᥴі𝗍ᥲr ᥙᥒᥲ іmᥲgᥱᥒ/᥎іძᥱ᥆]
ര ׄ 🌳 ׅ #𝗍᥆іmg • #іmg + [ᥴі𝗍ᥲr s𝗍іᥴkᥱr]
ര ׄ 🌳 ׅ #ᑲrᥲ𝗍 • #ᑲrᥲ𝗍᥎ • #𝗊ᥴ • #ᥱm᥆ȷіmі᥊
ര ׄ 🌳 ׅ #gі𝗍ᥴᥣ᥆ᥒᥱ + [ᥣіᥒk]
ര ׄ 🌳 ׅ #ᥱᥒһᥲᥒᥴᥱ • #rᥱmіᥒі • #һძ
ര ׄ 🌳 ׅ #ᥣᥱ𝗍rᥲ • #s𝗍ᥡᥣᥱ
ര ׄ 🌳 ׅ #𝖿ᥲkᥱᥕs⍴⍴ • #і⍴һ᥆ᥒᥱ𝖿ᥲkᥱ
ര ׄ 🌳 ׅ #rᥱᥲძ • #rᥱᥲძ᥎іᥱᥕ᥆ᥒᥴᥱ
ര ׄ 🌳 ׅ #ss • #ssᥕᥱᑲ
ര ׄ 🌳 ׅ #𝗍rᥲsᥣᥲ𝗍ᥱ • #𝗍rᥲძᥙᥴіr • #𝗍rᥲძ
ര ׄ 🌳 ׅ #іᥲ • #gᥱmіᥒі
ര ׄ 🌳 ׅ #𝗍᥆ᥙrᥣ • #ᥴᥲ𝗍ᑲ᥆᥊
ര ׄ 🌳 ׅ #ᥕіkі • #ᥕіkі⍴ᥱძіᥲ
ര ׄ 🌳 ׅ #ძᥲᥣᥣᥱ • #𝖿ᥣᥙ᥊
ര ׄ 🌳 ׅ #ᥒ⍴mძᥣ • #ᥒ⍴mȷs
ര ׄ 🌳 ׅ #g᥆᥆gᥣᥱ
ര ׄ 🌳 ׅ #һ᥆rᥲrі᥆

𓂂𓏸  𐅹੭੭   *\`𝗣r᥆𝖿іᥣᥱs\`* 🥞 ᦡᦡ

ര ׄ 🥞 ׅ #ᥣᥱ᥎ᥱᥣ • #ᥣ᥎ᥣ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🥞 ׅ #mᥲrrᥡ • #ᥴᥲsᥲrsᥱ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🥞 ׅ #⍴r᥆𝖿іᥣᥱ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🥞 ׅ #rᥱg • #᥎ᥱrі𝖿іᥴᥲr
ര ׄ 🥞 ׅ #ᥙᥒrᥱg
ര ׄ 🥞 ׅ #sᥱ𝗍ᑲіr𝗍һ + [𝖿ᥱᥴһᥲ]
ര ׄ 🥞 ׅ #sᥱ𝗍ძᥱsᥴ • #sᥱ𝗍ძᥱsᥴrі⍴𝗍і᥆ᥒ + [ძᥱsᥴrі⍴ᥴі᥆́ᥒ]
ര ׄ 🥞 ׅ #sᥱ𝗍gᥱᥒrᥱ + һ᥆mᑲrᥱ | mᥙȷᥱr
ര ׄ 🥞 ׅ #ძᥱᥣgᥱᥒrᥱ • #ძᥱᥣgᥱᥒᥱr᥆
ര ׄ 🥞 ׅ #ძᥱᥣᑲіr𝗍һ + [𝖿ᥱᥴһᥲ]
ര ׄ 🥞 ׅ #ძі᥎᥆rsᥱ
ര ׄ 🥞 ׅ #ძᥱᥣძᥱsᥴrі⍴𝗍і᥆ᥒ • #ძᥱᥣძᥱsᥴ
ര ׄ 🥞 ׅ #⍴rᥱm • #᥎і⍴

𓂂𓏸  𐅹੭੭   *\`𝗚r᥆ᥙ⍴s\`* 🍯 ᦡᦡ

ര ׄ 🍯 ׅ #tag • #һіძᥱ𝗍ᥲg • #іᥒ᥎᥆ᥴᥲr • #𝗍ᥲgᥲᥣᥣ + [mᥱᥒsᥲȷᥱ]
ര ׄ 🍯 ׅ #ᥱᥒᥴᥙᥱs𝗍ᥲ
ര ׄ 🍯 ׅ #mᥙ𝗍ᥱ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🍯 ׅ #ძᥱ𝗍ᥱᥴ𝗍 • #ᥲᥣᥱr𝗍ᥲs + [ᥱᥒᥲᑲᥣᥱ/ძіsᥲᑲᥣᥱ]
ര ׄ 🍯 ׅ #ᥲᥒ𝗍іᥣіᥒk • #ᥲᥒ𝗍іᥱᥒᥣᥲᥴᥱ + [ᥱᥒᥲᑲᥣᥱ/ძіsᥲᑲᥣᥱ]
ര ׄ 🍯 ׅ #ᑲ᥆𝗍 + [ᥱᥒᥲᑲᥣᥱ/ძіsᥲᑲᥣᥱ]
ര ׄ 🍯 ׅ #ᥴᥣ᥆sᥱ • #ᥴᥱrrᥲr
ര ׄ 🍯 ׅ #ძᥱm᥆𝗍ᥱ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🍯 ׅ #ᥕᥱᥣᥴ᥆mᥱ  • #ᑲіᥱᥒ᥎ᥱᥒіძᥲ + [ᥱᥒᥲᑲᥣᥱ/ძіsᥲᑲᥣᥱ]
ര ׄ 🍯 ׅ #sᥱ𝗍g⍴
ര ׄ 🍯 ׅ #sᥱ𝗍ᑲᥡᥱ + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #sᥱ𝗍⍴rіmᥲrᥡ + [@ᑲ᥆𝗍]
ര ׄ 🍯 ׅ #sᥱ𝗍ᥕᥱᥣᥴ᥆mᥱ + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #𝗍ᥱs𝗍ᥕᥱᥣᥴ᥆mᥱ • #𝗍ᥱs𝗍ᑲᥡᥱ
ര ׄ 🍯 ׅ #kіᥴk + [@ᥙsᥙᥲrі᥆]
ര ׄ 🍯 ׅ #᥆ᥒᥣᥡᥲძmіᥒ + [ᥱᥒᥲᑲᥣᥱ/ძіsᥲᑲᥣᥱ]
ര ׄ 🍯 ׅ #᥆⍴ᥱᥒ • #ᥲᑲrіr
ര ׄ 🍯 ׅ #⍴r᥆m᥆𝗍ᥱ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🍯 ׅ #ᥲძძ • #ᥲᥒ̃ᥲძіr • #ᥲgrᥱgᥲr + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #ᥲძmіᥒs • #ᥲძmіᥒ + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #rᥱs𝗍ᥲᑲᥣᥱᥴᥱr • #rᥱ᥎᥆kᥱ
ര ׄ 🍯 ׅ #ᥲძძᥕᥲrᥒ • #ᥕᥲrᥒ [@ᥙsᥙᥲrі᥆]
ര ׄ 🍯 ׅ #ᥙᥒᥕᥲrᥒ • #ძᥱᥣᥕᥲrᥒ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🍯 ׅ #ᥲძ᥎ᥣіs𝗍 • #ᥣіs𝗍ᥲძ᥎
ര ׄ 🍯 ׅ #іᥒᥲᥴ𝗍і᥎᥆s • #kіᥴkіᥒᥲᥴ𝗍і᥎᥆s
ര ׄ 🍯 ׅ #ᥣіs𝗍ᥒᥙm • #kіᥴkᥒᥙm + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #g⍴ᑲᥲᥒᥒᥱr • #gr᥆ᥙ⍴іmg
ര ׄ 🍯 ׅ #g⍴ᥒᥲmᥱ • #gr᥆ᥙ⍴ᥒᥲmᥱ + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #g⍴ძᥱsᥴ • #gr᥆ᥙ⍴ძᥱsᥴ + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #ძᥱᥣ • #ძᥱlete + [ᥴі𝗍ᥲr ᥙᥒ mᥱᥒsᥲȷᥱ]
ര ׄ 🍯 ׅ #ᥣіᥒᥱᥲ • #ᥣіs𝗍᥆ᥒᥣіᥒᥱ
ര ׄ 🍯 ׅ #g⍴ • #іᥒ𝖿᥆grᥙ⍴᥆
ര ׄ 🍯 ׅ #ᥣіᥒk

> ${botname} | ${etiqueta}

`.trim()
await conn.sendMessage(m.chat, { 
text: txt,
contextInfo: {
mentionedJid: [userId],
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: channelRD.id,
serverMessageId: '',
newsletterName: channelRD.name
},
externalAdReply: {
title: botname,
body: textbot,
mediaType: 1,
mediaUrl: redes,
sourceUrl: redes,
thumbnail: await (await fetch(banner)).buffer(),
showAdAttribution: false,
containsAutoReply: true,
renderLargerThumbnail: true
}}}, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler


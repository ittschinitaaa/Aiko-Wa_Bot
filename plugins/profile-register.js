import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://i.pinimg.com/originals/f3/a1/25/f3a1255debb3a1dfbcf5d132d8c54722.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  let bio
  try {
    const info = await conn.fetchStatus(who)
    bio = info?.status?.trim() || "Sin descripción personal..."
  } catch {
    bio = "Sin descripción personal..."
  }

  if (user.registered) {
    const botones = [
      { buttonId: `${usedPrefix}unreg`, buttonText: { displayText: '💀 𝐄𝐋𝐈𝐌𝐈𝐍𝐀𝐑 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 💀' }, type: 1 },
    ];

    return await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: `╭━━━〔 ⚠️ 𝐀𝐕𝐈𝐒𝐎 ⚠️ 〕━━⬣
  Ya estás registrado en el sistema.
  
  Si deseas reiniciar tu registro,
  usa el comando:
  ➤ *${usedPrefix}unreg*
  
  ✧ No es necesario volver a registrarte.
╰━━━━━━━━━━━━━━━━━━⬣`,
      footer: `${botname} ┊ Sistema de Identificación`,
      buttons: botones,
      headerType: 4
    }, { quoted: fkontak });
  }

  if (!Reg.test(text)) {
    const botones = [
      { buttonId: `${usedPrefix}reg ${name2}.18`, buttonText: { displayText: '🩸 𝐀𝐔𝐓𝐎 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐑 🩸' }, type: 1 },
    ];

    return await conn.sendMessage(m.chat, {
      image: { url: 'https://i.pinimg.com/originals/b3/67/d5/b367d513d861de468305c32c6cd22756.jpg' },
      caption: `╭─〔 ⛔ 𝐄𝐑𝐑𝐎𝐑 𝐃𝐄 𝐅𝐎𝐑𝐌𝐀𝐓𝐎 ⛔ 〕
 Usa el comando de esta forma:

 📥 *${usedPrefix + command} nombre.edad*

 Ejemplo:
 ➤ *${usedPrefix + command} ${name2}.18*

 💡 Si no quieres escribirlo,
 puedes presionar el botón de abajo.
╰──────────────────────────⬣`,
      footer: `${botname} ┊ Verificador de Usuario`,
      buttons: botones,
      headerType: 4
    }, { quoted: fkontak });
  }

  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply("❌ El nombre no puede estar vacío.")
  if (!age) return m.reply("❌ La edad no puede estar vacía.")
  if (name.length >= 100) return m.reply("⚠️ El nombre es demasiado largo.")
  age = parseInt(age)
  if (age > 100) return m.reply("😳 ¿Más de 100 años? Inmortal detected.")
  if (age < 5) return m.reply("🍼 Demasiado joven para registrarte.")

  user.name = `${name} ✓`
  user.age = age
  user.regTime = + new Date      
  user.registered = true

  let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
  let fechaObj = new Date();
  let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
  let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  let regbot = `
 〔 ✅ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎 ✅ 〕
 🌾 𝐍𝐨𝐦𝐛𝐫𝐞: ${name}
 🧩 𝐔𝐬𝐮𝐚𝐫𝐢𝐨: ${name2}
 🌿 𝐍𝐮𝐦𝐞𝐫𝐨: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
 🧢 𝐄𝐝𝐚𝐝: ${age} años
 💊 𝐁𝐢𝐨: ${bio}
 📆 𝐅𝐞𝐜𝐡𝐚: ${fecha}
 🧬 𝐇𝐨𝐫𝐚: ${hora}
 🌙 𝐃𝐢𝐚: ${dia}
 🔥 𝐈𝐃: ${sn}


🩸 *Bienvenido(a) al sistema, ${name2}*
> Tu registro ha sido procesado exitosamente por *KanekiBot-V3* 🕷️
`

  await m.react?.('🩸')
  await conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: regbot,
    footer: "☯︎ KanekiBot-V3 ┊ Registro Finalizado",
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: '︩︪•°ֺ໋۪݊💫 🅁🄴🄶🄸🅂🅃🅁🄾 • 🄲🄾🄼🄿🄻🄴🅃🄾°໋•︪︩',
        body: '꒰🍃꒱ 𝐊𝐚𝐧𝐞𝐤𝐢𝐁𝐨𝐭-𝐕𝟑 ☃️`',
        thumbnailUrl: 'https://i.pinimg.com/originals/6f/d3/ea/6fd3ea4a79c2d9e1c38d4c4a38e73a6a.jpg',
        sourceUrl: "https://github.com/Yuji-XDev",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: fkontak })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler

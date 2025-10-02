import db from '../lib/database.js'

const handler = async (m, { conn, text, command, usedPrefix }) => {
  try {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://files.catbox.moe/xr2m6u.jpg')
    let mentionedJid = await m.mentionedJid
    let who = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
    const groupInfo = await conn.groupMetadata(m.chat)
    const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net'

    switch (command) {
      case 'advertencia':
      case 'warn':
      case 'addwarn': {
        if (!who || typeof who !== 'string' || !who.includes('@')) {
          return m.reply(`❀ Debés mencionar o citar un mensaje de un usuario para aplicar una advertencia.\n> Ejemplo: *${usedPrefix + command} @usuario (motivo | opcional)*`)
        }

        const msgtext = text?.trim() || ''
        const partes = msgtext.split(/\s+/)
        const tieneMencion = partes.some(part => part.startsWith('@'))
        const motivo = tieneMencion ? partes.filter(part => !part.startsWith('@')).join(' ').trim() || 'Sin especificar' : msgtext || 'Sin especificar'

        if (who === conn.user.jid) return conn.reply(m.chat, `ꕥ No puedo ponerle advertencias al bot.`, m)
        if (who === ownerGroup) return conn.reply(m.chat, `ꕥ No puedo darle advertencias al propietario del grupo.`, m)
        if (who === ownerBot) return conn.reply(m.chat, `ꕥ No puedo darle advertencias al propietario del bot.`, m)

        // 🔹 Usamos la DB global de usuarios
        let user = global.db.data.users[who]
        if (!user) global.db.data.users[who] = { warn: 0 }
        user.warn = (user.warn || 0) + 1

        await m.reply(`*@${who.split`@`[0]}* recibió una advertencia!\nMotivo: ${motivo}\n*Advertencias: ${user.warn}/3*`, null, { mentions: [who] })

        if (user.warn >= 3) {
          user.warn = 0
          await m.reply(`❀ ¡Te lo advertí varias veces!\n*@${who.split`@`[0]}* superó las *3* advertencias, ahora será eliminado/a.`, null, { mentions: [who] })
          await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
        }
        break
      }

      case 'delwarn':
      case 'unwarn': {
        if (!who) return m.reply(`❀ Etiqueta a un usuario para quitarle las advertencias.`)
        let user = global.db.data.users[who]
        if (!user || !user.warn) return m.reply(`ꕥ El usuario tiene 0 advertencias.`)

        user.warn -= 1
        await m.reply(`❀ A *@${who.split`@`[0]}* se le quitó una advertencia.\n*Advertencias ${user.warn}/3*`, null, { mentions: [who] })
        break
      }

      case 'listadv':
      case 'advlist': {
        let users = global.db.data.users
        let adv = Object.entries(users).filter(([_, u]) => u.warn && u.warn > 0)

        let listadvs = `❀ Usuarios Advertidos\n\n*Total : ${adv.length} Usuarios*`
        if (adv.length > 0) {
          listadvs += '\n' + adv.map(([jid, user]) => `*●* @${jid.split`@`[0]} : *(${user.warn}/3)*`).join('\n')
        }

        let warns = users[m.sender]?.warn || 0
        listadvs += `\n\n⚠︎ Tus advertencias ⇢ *${warns}/3*`

        await conn.sendMessage(m.chat, { image: { url: pp }, caption: listadvs, mentions: await conn.parseMention(listadvs) }, { quoted: m })
        break
      }
    }
  } catch (error) {
    m.reply(`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`)
  }
}

handler.command = ['advertencia', 'warn', 'addwarn', 'delwarn', 'unwarn', 'listadv', 'advlist']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler


/*import db from '../lib/database.js'

const handler = async (m, { conn, text, command, usedPrefix }) => {
try {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://files.catbox.moe/xr2m6u.jpg')
let mentionedJid = await m.mentionedJid
let who = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
const user = global.db.data.users[m.sender]
const usuario = conn.user.jid.split`@`[0] + '@s.whatsapp.net'
const groupInfo = await conn.groupMetadata(m.chat)
const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
const ownerBot = global.owner[0][0] + '@s.whatsapp.net'
switch (command) {
case 'advertencia': case 'warn': case 'addwarn': {
if (!who || typeof who !== 'string' || !who.includes('@')) {
return m.reply(`❀ Debés mencionar o citar un mensaje de un usuario para aplicar una advertencia.\n> Ejemplo: *${usedPrefix + command} @usuario (motivo | opcional)*`)
}
const msgtext = text?.trim() || ''
const partes = msgtext.split(/\s+/)
const tieneMencion = partes.some(part => part.startsWith('@'))
const motivo = tieneMencion ? partes.filter(part => !part.startsWith('@')).join(' ').trim() || 'Sin especificar' : msgtext || 'Sin especificar'
if (who === conn.user.jid) return conn.reply(m.chat, `ꕥ No puedo ponerle advertencias al bot.`, m)
if (who === ownerGroup) return conn.reply(m.chat, `ꕥ No puedo darle advertencias al propietario del grupo.`, m)
if (who === ownerBot) return conn.reply(m.chat, `ꕥ No puedo darle advertencias al propietario del bot.`, m)
user.warn = (user.warn || 0) + 1
await m.reply(`*@${who.split`@`[0]}* recibió una advertencia en este grupo!\nMotivo: ${motivo}\n*Advertencias: ${user.warn}/3*`, null, { mentions: [who] })
if (user.warn >= 3) {
user.warn = 0
await m.reply(`❀ ¡Te lo advertí varias veces!\n*@${who.split`@`[0]}* superó las *3* advertencias, ahora será eliminado/a.`, null, { mentions: [who] })
await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
}
break
}
case 'delwarn': case 'unwarn': {
if (!who) return m.reply(`❀ Etiqueta a un usuario para quitarle las advertencias.`)
if (mentionedJid.includes(conn.user.jid)) return
if (user.warn === 0) throw `ꕥ El usuario tiene 0 advertencias.`
user.warn -= 1
await m.reply(`${user.warn === 1 ? `*@${who.split`@`[0]}*` : `❀ *@${who.split`@`[0]}*`} Se le quitó una advertencia.\n*ADVERTENCIAS ${user.warn}/3*`, null, { mentions: [who] })
break
}
case 'listadv': case 'advlist': {
const adv = Object.entries(global.db.data.chats[m.chat].users).filter(([_, u]) => u.warn)
const warns = global.db.data.chats[m.chat].users.warn || 0
const listadvs = `❀ Usuarios Advertidos\n\n*Total : ${adv.length} Usuarios*${adv.length > 0 ? '\n' + adv.map(([jid, user]) => `*●* @${jid.split`@`[0]} : *(${user.warn}/3)*`).join('\n') : ''}\n\n⚠︎ Advertencias ⇢ *${warns ? `${warns}/3` : '0/3'}*`
await conn.sendMessage(m.chat, { image: { url: pp }, caption: listadvs, mentions: await conn.parseMention(listadvs) }, { quoted: m })
break
}}} catch (error) {
m.reply(`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`)
}}

handler.command = ['advertencia', 'warn', 'addwarn', 'delwarn', 'unwarn', 'listadv', 'advlist']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler*/

import fs from 'fs'
import { WAMessageStubType } from '@whiskeysockets/baileys'

async function generarBienvenida({ conn, userId, groupMetadata, chat }) {
  const username = `@${userId.split('@')[0]}`
  const pp = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://files.catbox.moe/8yhxtr.jpg')//'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')

  const fecha = new Date().toLocaleDateString("es-ES", { 
    timeZone: "America/Argentina/Buenos_Aires", 
    day: 'numeric', month: 'long', year: 'numeric' 
  })

  const groupSize = groupMetadata.participants.length + 1
  const desc = typeof groupMetadata.desc === "string" ? groupMetadata.desc : "Sin descripción"

  const mensaje = (chat.sWelcome || 'Edita con el comando "setwelcome"')
    .replace(/{usuario}/g, username)
    .replace(/{grupo}/g, `*${groupMetadata.subject}*`)
    .replace(/{desc}/g, desc)

  const caption = 
`❀ Bienvenido a *"${groupMetadata.subject}"*
✰ *${username}*

${mensaje}
 
• _Ahora somos ${groupSize} Miembros._
ꕥ Fecha » ${fecha}

> *➮ Usa #help para ver los comandos.*
> ✐ https://chinaxzzp.vercel.app`

  return { pp, caption, mentions: [userId] }
}

async function generarDespedida({ conn, userId, groupMetadata, chat }) {
  const username = `@${userId.split('@')[0]}`
  const pp = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')

  const fecha = new Date().toLocaleDateString("es-ES", { 
    timeZone: "America/Argentina/Buenos_Aires", 
    day: 'numeric', month: 'long', year: 'numeric' 
  })

  const groupSize = groupMetadata.participants.length - 1
  const desc = typeof groupMetadata.desc === "string" ? groupMetadata.desc : "Sin descripción"

  const mensaje = (chat.sBye || 'Edita con el comando "setbye"')
    .replace(/{usuario}/g, username)
    .replace(/{grupo}/g, groupMetadata.subject)
    .replace(/{desc}/g, `*${desc}*`)

  const caption = 
`❀ Adiós de *"${groupMetadata.subject}"*

✰ *${username}*

${mensaje}
 
• _Ahora somos ${groupSize} Miembros._
ꕥ Fecha » ${fecha}

> *➮ Usa #help para ver los comandos.*
> ✐ https://chinaxzzp.vercel.app`

  return { pp, caption, mentions: [userId] }
}

let handler = m => m

handler.before = async function (m, { conn, groupMetadata }) {

  if (!m.messageStubType || !m.isGroup) return !0

  const primaryBot = global.db.data.chats[m.chat].primaryBot
  if (primaryBot && conn.user.jid !== primaryBot) throw !1

  const chat = global.db.data.chats[m.chat]
  const userId = m.messageStubParameters[0]

  // 🔥 TARJETA AUTOMÁTICA
  let externalReply = {
    contextInfo: {
      mentionedJid: [userId],
      externalAdReply: {
        title: `${botname}`,
        body: `${textbot}`,
        mediaType: 1,
        thumbnailUrl: "",   // <- SE COMPLETA ABAJO
        renderLargerThumbnail: true,
        showAdAttribution: false,
        sourceUrl: "https://www.instagram.com/its.chinitaaa_"
      }
    }
  }

  // 🔥 WELCOME
  if (chat.welcome && m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const { pp, caption, mentions } = await generarBienvenida({ conn, userId, groupMetadata, chat })

    externalReply.contextInfo.mentionedJid = mentions
    externalReply.contextInfo.externalAdReply.thumbnailUrl = pp

    await conn.sendMessage(m.chat, { text: caption, ...externalReply }, { quoted: null })
  }

  // 🔥 GOODBYE
 if (
  chat.goodbye &&
  (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
   m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE)
) {
  const { pp, caption, mentions } =
    await generarDespedida({ conn, userId, groupMetadata, chat })

  externalReply.contextInfo.mentionedJid = mentions
  externalReply.contextInfo.externalAdReply.thumbnailUrl = pp

  await conn.sendMessage(m.chat, { text: caption, ...externalReply }, { quoted: null })
    }
    /*  if (chat.welcome && 
     (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE || 
      m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE)) {

    const { pp, caption, mentions } = await generarDespedida({ conn, userId, groupMetadata, chat })

    externalReply.contextInfo.mentionedJid = mentions
    externalReply.contextInfo.externalAdReply.thumbnailUrl = pp

    await conn.sendMessage(m.chat, { text: caption, ...externalReply }, { quoted: null })
  }*/

}

export { generarBienvenida, generarDespedida }
export default handler


/*
import fs from 'fs'
import { WAMessageStubType } from '@whiskeysockets/baileys'

async function generarBienvenida({ conn, userId, groupMetadata, chat }) {
const username = `@${userId.split('@')[0]}`
const pp = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://files.catbox.moe/bp1qfw.png')
const fecha = new Date().toLocaleDateString("es-ES", { timeZone: "America/Argentina/Buenos_Aires", day: 'numeric', month: 'long', year: 'numeric' })
const groupSize = groupMetadata.participants.length + 1
const desc = groupMetadata.desc?.toString() || 'Sin descripción'
const mensaje = (chat.sWelcome || 'Edita con el comando *"#setwelcome"*').replace(/{usuario}/g, `${username}`).replace(/{grupo}/g, `*${groupMetadata.subject}*`).replace(/{desc}/g, `${desc}`)
const caption = `🪻 Bienvenido a *"_${groupMetadata.subject}_"*\n👤 _Usuario_ » ${username}\n✰ ${mensaje}\n★ _Ahora somos ${groupSize} Miembros._\nꕥ Fecha » ${fecha}\n૮꒰ ˶• ᴗ •˶꒱ა Disfruta tu estadía en el grupo!\n> *➮ Puedes usar _#help_ para ver la lista de comandos.*`
return { pp, caption, mentions: [userId] }
}
async function generarDespedida({ conn, userId, groupMetadata, chat }) {
const username = `@${userId.split('@')[0]}`
const pp = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://files.catbox.moe/709gog.jpg')
const fecha = new Date().toLocaleDateString("es-ES", { timeZone: "America/Argentina/Buenos_Aires", day: 'numeric', month: 'long', year: 'numeric' })
const groupSize = groupMetadata.participants.length - 1
const desc = groupMetadata.desc?.toString() || 'Sin descripción'
const mensaje = (chat.sBye || 'Edita con el comando *"#setbye"*').replace(/{usuario}/g, `${username}`).replace(/{grupo}/g, `${groupMetadata.subject}`).replace(/{desc}/g, `*${desc}*`)
const caption = `💐 Adiós de *"_${groupMetadata.subject}_"*\n👤 _Usuario_ » ${username}\n✰ ${mensaje}\n★ _Ahora somos ${groupSize} Miembros._\nꕥ Fecha » ${fecha}\n(˶˃⤙˂˶) Te esperamos pronto!\n> *➮ Puedes usar _#help_ para ver la lista de comandos.*`
return { pp, caption, mentions: [userId] }
}
let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return !0
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const chat = global.db.data.chats[m.chat]
const userId = m.messageStubParameters[0]
if (chat.welcome && m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) {
const { pp, caption, mentions } = await generarBienvenida({ conn, userId, groupMetadata, chat })
//rcanal.contextInfo.mentionedJid = mentions
await conn.sendMessage(m.chat, { image: { url: pp }, caption, ...rcanal }, { quoted: null })
try { fs.unlinkSync(img) } catch {}
}
if (chat.welcome && (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE)) {
const { pp, caption, mentions } = await generarDespedida({ conn, userId, groupMetadata, chat })
//rcanal.contextInfo.mentionedJid = mentions
await conn.sendMessage(m.chat, { image: { url: pp }, caption, ...rcanal }, { quoted: null })
try { fs.unlinkSync(img) } catch {}
}}

export { generarBienvenida, generarDespedida }
export default handler


*/

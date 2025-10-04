var handler = async (m, { conn, usedPrefix, command, text, groupMetadata, isAdmin }) => {
let mentionedJid = await m.mentionedJid
let user = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
if (!user) return conn.reply(m.chat, `❀ Debes mencionar a un usuario para poder quitarle los privilegios de administrador.`, m)

try {
const groupInfo = await conn.groupMetadata(m.chat)
const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net'

// Verifica si es dueño del grupo
if (user === ownerGroup) 
return conn.reply(m.chat, 'ꕥ No se puede quitar el rol de administrador al dueño del grupo.', m)

// Verifica si el usuario ya no es admin
if (!groupInfo.participants.some(p => p.id === user && p.admin))
return conn.reply(m.chat, 'ꕥ El usuario mencionado ya es miembro normal.', m)

// Ejecuta el demote
await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
await m.react('✅')
//await conn.reply(m.chat, `❀ Se le quitó el admin correctamente.`, m)

} catch (e) {
conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`, m)
}}

handler.help = ['demote']
handler.tags = ['grupo']
handler.command = ['demote', 'quitaradmin']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

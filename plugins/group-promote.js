var handler = async (m, { conn, usedPrefix, command, text, groupMetadata, isAdmin }) => {
let mentionedJid = await m.mentionedJid
let user = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
if (!user) return conn.reply(m.chat, `🌸 Debes mencionar a un usuario para poder promoverlo a administrador.`, m)
try {
const groupInfo = await conn.groupMetadata(m.chat)
const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net'
if (user === ownerGroup || groupInfo.participants.some(p => p.id === user && p.admin))
return conn.reply(m.chat, 'ꕥ El usuario mencionado ya tiene privilegios de administrador.', m)
await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
await m.react('✅')   
  //await conn.reply(m.chat, `❀ Fue agregado como admin del grupo con exito.`, m)
} catch (e) {
conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`, m)
}}

handler.help = ['promote']
handler.tags = ['grupo']
handler.command = ['promote', 'promover']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

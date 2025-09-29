const handler = async (m, {conn, participants, groupMetadata, args}) => {
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => 'https://files.catbox.moe/rq6lzs.jpg')
const groupAdmins = participants.filter((p) => p.admin)
const listAdmin = groupAdmins.map(v => `● @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
const pesan = args.join` `
const oi = `» ${pesan}`
const text = `『✦』Admins del grupo:  
  
${listAdmin}

❍ Mensaje ${oi || 'Sin especificar'}`
conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]})
}

handler.help = ['admins']
handler.tags = ['grupo']
handler.command = ['admins', 'admin']
handler.group = true

export default handler

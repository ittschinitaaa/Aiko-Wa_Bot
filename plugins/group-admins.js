const handler = async (m, {conn, participants, groupMetadata, args}) => {
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => 'https://files.catbox.moe/rq6lzs.jpg')
const groupAdmins = participants.filter((p) => p.admin)
const listAdmin = groupAdmins.map(v => `⏤͟͟͞͞@${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
const pesan = args.join` `
await m.react('👑')
const oi = `» ${pesan}`
const text = `*『✦』𝐒𝐎𝐋𝐈𝐂𝐈𝐓𝐀𝐍𝐃𝐎 𝐋𝐎𝐒 𝐀𝐃𝐌𝐈𝐍𝐒:*  
  
${listAdmin}

📝 Mensaje ${oi || 'Sin especificar'}
> nota: 𝐔𝐭𝐢𝐥𝐢𝐳𝐚 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐬𝐢 𝐞𝐬 𝐮𝐧𝐚 𝐞𝐦𝐞𝐫𝐠𝐞𝐧𝐜𝐢𝐚.`
conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]})
}

handler.help = ['admins']
handler.tags = ['grupo']
handler.command = ['admins', 'admin']
handler.group = true

export default handler

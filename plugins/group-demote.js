var handler = async (m, { conn, usedPrefix, command, text, groupMetadata, isAdmin }) => {
  let mentionedJid = await m.mentionedJid
  let user = mentionedJid && mentionedJid.length 
      ? mentionedJid[0] 
      : m.quoted && await m.quoted.sender 
        ? await m.quoted.sender 
        : null

  if (!user) return conn.reply(m.chat, `❀ Debes mencionar a un usuario para poder quitarle los privilegios de administrador.`, m)

  try {
    const groupInfo = await conn.groupMetadata(m.chat)
    const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net'

    if (user === ownerGroup) 
      return conn.reply(m.chat, 'ꕥ No puedes quitarle el admin al propietario del grupo.', m)

    let participante = groupInfo.participants.find(p => p.id === user)
    if (!participante || !participante.admin) 
      return conn.reply(m.chat, 'ꕥ El usuario mencionado no es administrador.', m)

    await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
    await m.react('✅')   
    //await conn.reply(m.chat, `❀ Se le quitó el admin al usuario con éxito.`, m)
  } catch (e) {
    conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`, m)
  }
}

handler.help = ['demote']
handler.tags = ['grupo']
handler.command = ['demote', 'quitaradmin']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

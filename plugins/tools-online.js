var handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) 
    return conn.reply(m.chat, `❀ Ingresa un número para verificar.\n\nEjemplo:\n> *${usedPrefix + command} +5491134567890*`, m)

  let number = args[0].replace(/[^0-9]/g, '')
  if (!number) return conn.reply(m.chat, `⚠︎ Número inválido.`, m)

  let id = number + '@s.whatsapp.net'

  try {
    // Verificar si el número existe en WhatsApp
    let exists = await conn.onWhatsApp(id)
    if (!exists || !exists[0]?.exists) 
      return conn.reply(m.chat, `✘ El número *${args[0]}* no está registrado en WhatsApp.`, m)

    // Obtener el estado (última vez visto)
    let statusInfo = await conn.fetchStatus(id).catch(() => null)

    let lastSeen
    try {
      let presence = await conn.presenceSubscribe(id)
      lastSeen = presence ? '🟢 Actualmente en línea.' : '⚫ No está en línea ahora.'
    } catch {
      lastSeen = '⚫ No está en línea ahora.'
    }

    let text = `🦊 *Información de ${args[0]}*\n\n${lastSeen}\n`
    if (statusInfo?.status) text += `\n🌸 *Estado:* ${statusInfo.status}`
    if (statusInfo?.setAt) {
      let time = new Date(statusInfo.setAt).toLocaleString('es-AR')
      text += `\n🕒 *Última actualización:* ${time}`
    }

    await conn.reply(m.chat, text, m)
  } catch (e) {
    conn.reply(m.chat, `⚠︎ Error al consultar el número.\n> Usa *${usedPrefix}report* si el problema persiste.\n\n${e}`, m)
  }
}

handler.help = ['online']
handler.tags = ['tools']
handler.command = ['online', 'veronline', 'ultimavez']

export default handler

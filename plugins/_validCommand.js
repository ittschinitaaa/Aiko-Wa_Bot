// código adaptado para Starlights ✨
// github.com/ittschinitaaa

export async function before(m, { groupMetadata }) {
  if (!m.text || !global.prefix.test(m.text)) return
  const usedPrefix = global.prefix.exec(m.text)[0]
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase()
  if (!command || command.length === 0) return

  const validCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      if (
        plugin.command &&
        (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)
      ) {
        return true
      }
    }
    return false
  }

  let chat = global.db.data.chats[m.chat]
  let settings = global.db.data.settings[this.user.jid]
  let owner = [...global.owner.map(([number]) => number)]
    .map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
    .includes(m.sender)

  // Evita notificar si el chat o bot están en ciertos modos
  if (chat.modoadmin) return
  if (settings.self) return
  if (command === 'mute') return
  if (chat.isMute && !owner) return
  if (command === 'bot') return
  if (chat.isBanned && !owner) return

  // ⚙️ Canal de difusión donde quieres recibir las notificaciones
  const canalNotificacion = "120363419164978167@newsletter" // 👈 reemplaza por el ID real de tu canal

  // 🩵 Si el comando existe, manda notificación
  if (validCommand(command, global.plugins)) {
    try {
      const usuario = m.pushName || "Usuario desconocido"
      const grupo = m.isGroup ? groupMetadata.subject : "Chat privado"
      const mensaje = `🦊 *Nuevo uso del bot* 🦊\n\n👤 Usuario: ${usuario}\n💬 Comando: ${usedPrefix}${command}\n🏠 Origen: ${grupo}\n🕒 ${new Date().toLocaleString("es-AR")}`

      await this.sendMessage(canalNotificacion, { text: mensaje })
    } catch (e) {
      console.error("No se pudo enviar la notificación al canal:", e)
    }
  } else {
    const comando = command
    await m.reply(`ꕥ El comando *<${comando}>* no existe.\n> Usa *${usedPrefix}help* para ver la lista de comandos disponibles.`)
  }
}

/*export async function before(m, { groupMetadata }) {
if (!m.text || !global.prefix.test(m.text)) return
const usedPrefix = global.prefix.exec(m.text)[0]
const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase()
if (!command || command.length === 0) return
const validCommand = (command, plugins) => {
for (let plugin of Object.values(plugins)) {
if (plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)) {
return true
}}
return false
}
let chat = global.db.data.chats[m.chat]
let settings = global.db.data.settings[this.user.jid]
let owner = [...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
if (chat.modoadmin) return
if (settings.self) return
if (command === 'mute') return
if (chat.isMute && !owner) return
if (command === 'bot') return
if (chat.isBanned && !owner) return
if (validCommand(command, global.plugins)) {
} else {
const comando = command
await m.reply(`ꕥ El comando *<${comando}>* no existe.\n> Usa *${usedPrefix}help* para ver la lista de comandos disponibles.`)
}}
*/

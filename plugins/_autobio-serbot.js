// plugins/autobio-subbot.js

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [
    d > 0 ? `${d} día(s)` : "",
    h > 0 ? `${h} hora(s)` : "",
    m > 0 ? `${m} minuto(s)` : "",
    s > 0 ? `${s} segundo(s)` : ""
  ].filter(v => v).join(" ")
}

async function iniciarAutobioSubBot(sock) {
  const startTime = Date.now()

  setInterval(async () => {
    if (!sock || !sock.user) return
    let uptime = Date.now() - startTime
    let bio = `⏤͟͟͞͞Sub-Bot 🌸 | ⏰ Activo: ${clockString(uptime)}`
    await sock.updateProfileStatus(bio).catch(() => {})
  }, 60 * 1000) // cada minuto
}

export { iniciarAutobioSubBot }

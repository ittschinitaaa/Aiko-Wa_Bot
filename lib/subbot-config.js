import fs from 'fs'
import path from 'path'

const configPath = path.join('./lib', 'subbots.json')

// Cargar configuración del sub-bot
export function loadSubBotConfig(jid) {
  if (!fs.existsSync(configPath)) fs.writeFileSync(configPath, '{}')
  const data = JSON.parse(fs.readFileSync(configPath))
  return data[jid] || getDefaultConfig()
}

// Guardar configuración del sub-bot
export function saveSubBotConfig(jid, config) {
  const data = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath)) : {}
  data[jid] = config
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2))
}

// Configuración por defecto
export function getDefaultConfig() {
  return {
    botname: "Aiko-Wa_Bot",
    banner: "https://files.catbox.moe/op76f1.png"
  }
                                              }

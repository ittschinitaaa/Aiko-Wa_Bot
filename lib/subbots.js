import fs from 'fs'
import path from 'path'

const filePath = path.join('./lib', 'subbots.json')

if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{}')

export function getSubBotConfig(jid) {
  const data = JSON.parse(fs.readFileSync(filePath))
  return data[jid] || { botname: 'Aiko-Wa_Bot', banner: 'https://files.catbox.moe/op76f1.png'}
}

export function setSubBotConfig(jid, key, value) {
  const data = JSON.parse(fs.readFileSync(filePath))
  if (!data[jid]) data[jid] = {}
  data[jid][key] = value
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

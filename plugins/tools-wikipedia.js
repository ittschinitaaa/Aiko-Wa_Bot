import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) {
await conn.reply(m.chat, `❀ Por favor, ingresa lo que quieres buscar en Wikipedia.`, m)
return
}
try {
await m.react('🕒')
const link = await axios.get(`https://es.wikipedia.org/wiki/${text}`)
const $ = cheerio.load(link.data)
let wik = $('#firstHeading').text().trim()
let resulw = $('#mw-content-text > div.mw-parser-output').find('p').text().trim()
await m.reply(`▢ *Wikipedia*\n\n‣ Buscado : ${wik}\n\n${resulw}`)
await m.react('✅')
} catch (e) {
await m.react('❌')
await m.reply(`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`, m)
}}

handler.help = ['wikipedia']
handler.tags = ['tools']
handler.command = ['wiki', 'wikipedia'] 
handler.group = true
handler.register = true

export default handler

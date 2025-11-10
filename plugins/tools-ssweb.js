import fetch from 'node-fetch'

let handler = async (m, { conn, command, args, usedPrefix }) => {
if (!args[0]) return conn.reply(m.chat, `❀ Por favor, ingrese el Link de una página.`, m)
try {
await m.react('🕒')
let ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()
conn.sendFile(m.chat, ss, 'error.png', args[0], fkontak)
await m.react('✅')
} catch (error) {
await m.react('❌')
return conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`, m)
}}

handler.help = ['ssweb', 'ss']
handler.tags = ['tools']
handler.command = ['ssweb', 'ss']
handler.group = true
handler.register = true

export default handler

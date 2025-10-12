const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
const pesan = args.join` `
await m.react('🌻')
const oi = `*» 𝕀𝐍𝔽𝐎 :* ${pesan}`
let teks = `*⏤͟͟͞͞🌟 𝐌𝔼𝐍ℂ𝐈𝕆𝐍 𝔾𝐄ℕ𝐄ℝ𝐀𝕃 ☄️*\n  *𝐏𝔸𝐑𝔸 ${participants.length} 𝐌𝕀𝐄𝕄𝐁ℝ𝐎𝕊* 🦊\n\n ${oi}\n\n╭  ┄ 𝅄 ۪꒰ \`⡞᪲=͟͟͞${botname}≼᳞ׄ\` ꒱ ۟ 𝅄 ┄\n`
for (const mem of participants) {
teks += ` ᮫໋۟۟۟۟۟⌯ ᤳ݄፞★꯭݃ @${mem.id.split('@')[0]}\n`
}
teks += `╰⸼ ┄ ┄ ┄ ─  ꒰  ׅ୭ *${vs}* ୧ ׅ ꒱  ┄  ─ ┄⸼`
conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) })
}

handler.help = ['todos']
handler.tags = ['group']
handler.command = ['todos', 'invocar', 'tagall']
handler.admin = true
handler.group = true

export default handler

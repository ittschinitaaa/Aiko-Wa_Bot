import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
let mentionedJid = await m.mentionedJid
let userId = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.sender
let totalreg = Object.keys(global.db.data.users).length
let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length
await m.react('🌷')   
  
let txt = `
̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮
︶•︶°︶•︶°︶•︶°︶•︶°︶•︶°︶•︶
> 🪻 ¡𝐇𝐨𝐥𝐚! @${userId.split('@')[0]}, 𝐒𝐨𝐲 *${botname}*, 𝐀𝐪𝐮𝐢 𝐭𝐢𝐞𝐧𝐞𝐬 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬.

\`⭐ 𝖳𝖨𝖯𝖮\` » ${(conn.user.jid == global.conn.user.jid ? '𝗣rіᥒᥴі⍴ᥲᥣ' : '𝗦ᥙᑲ-𝗕᥆𝗍')}
\`🪻 𝖵𝖤𝖱𝖲𝖨𝖮́𝖭\` » ${vs}
\`🍯 𝖯𝖫𝖴𝖦𝖨𝖭𝖲\` » ${totalCommands}
\`🍄 𝖫𝖨𝖡𝖱𝖤𝖱𝖨𝖠\` » ${libreria}

𓂂𓏸  𐅹੭੭   *\`𝗗᥆ᥕᥒᥣ᥆ᥲძ\`* ☁ ᦡᦡ

ര ׄ ☁️ ׅ #𝗍іk𝗍᥆k • #𝗍𝗍  + [ᥣіᥒk] / [ᑲᥙ́s𝗊ᥙᥱძᥲ]
ര ׄ ☁️ ׅ #mᥱძіᥲ𝖿іrᥱ • #m𝖿 + [ᥣіᥒk]
ര ׄ ☁️ ׅ #mᥱgᥲ • #mg + [ᥣіᥒk]
ര ׄ ☁️ ׅ #⍴ᥣᥲᥡ • #⍴ᥣᥲᥡ2 + [ᥴᥲᥒᥴі᥆́ᥒ]
ര ׄ ☁️ ׅ #ᥡ𝗍m⍴3 • #ᥡ𝗍m⍴4 + [ᥣіᥒk]
ര ׄ ☁️ ׅ #𝖿ᥲᥴᥱᑲ᥆᥆k • #𝖿ᑲ + [ᥣіᥒk]
ര ׄ ☁️ ׅ #𝗍ᥕі𝗍𝗍ᥱr • #᥊ + [ᥣіᥒk]
ര ׄ ☁️ ׅ #іg • #іᥒs𝗍ᥲgrᥲm + [ᥣіᥒk]
ര ׄ ☁️ ׅ # ⍴іᥒ𝗍ᥱrᥱs𝗍 • #⍴іᥒ + [ᑲᥙ́s𝗊ᥙᥱძᥲ] / [ᥣіᥒk]
ര ׄ ☁️ ׅ #іmᥲgᥱ • #іmᥲgᥱᥒ + [ᑲᥙs𝗊ᥙᥱძᥲ]
ര ׄ ☁️ ׅ #ᥲ⍴k • #m᥆ძᥲ⍴k + [ᑲᥙs𝗊ᥙᥱძᥲ]
ര ׄ ☁️ ׅ #ᥡ𝗍sᥱᥲrᥴһ • #sᥱᥲrᥴһ + [ᑲᥙ́s𝗊ᥙᥱძᥲ]

𓂂𓏸  𐅹੭੭   *\`𝗦᥆ᥴkᥱ𝗍s\`* 🪼 ᦡᦡ

ര ׄ 🪼 ׅ #𝗊r • #ᥴ᥆ძᥱ
ര ׄ 🪼 ׅ #ᑲ᥆𝗍s • #ᑲ᥆𝗍ᥣіs𝗍
ര ׄ 🪼 ׅ #s𝗍ᥲ𝗍ᥙs • #ᥱs𝗍ᥲძ᥆
ര ׄ 🪼 ׅ #⍴ • #⍴іᥒg
ര ׄ 🪼 ׅ #ȷ᥆іᥒ + [іᥒ᥎і𝗍ᥲᥴі᥆́ᥒ]
ര ׄ 🪼 ׅ #lᥱᥲ᥎ᥱ • #sᥲᥣіr
ര ׄ 🪼 ׅ #ᥣ᥆g᥆ᥙ𝗍
ര ׄ 🪼 ׅ #rᥱᥣ᥆ᥲძ
ര ׄ 🪼 ׅ #sᥱ𝗍⍴𝖿⍴ • #sᥱ𝗍іmᥲgᥱ
ര ׄ 🪼 ׅ #sᥱ𝗍s𝗍ᥲ𝗍ᥙs + [ᥱs𝗍ᥲძ᥆]
ര ׄ 🪼 ׅ #sᥱ𝗍ᥙsᥱrᥒᥲmᥱ + [ᥒ᥆mᑲrᥱ]

𓂂𓏸  𐅹੭੭   *\`𝗨𝗍іᥣіძᥲძᥱs\`* 🌳 ᦡᦡ

ര ׄ 🌳 ׅ #һᥱᥣ⍴ • #mᥱᥒᥙ
ര ׄ 🌳 ׅ #ᥴrᥱᥲძ᥆rᥲ • #᥆ᥕᥒᥱr
ര ׄ 🌳 ׅ #sᥴ • #sᥴrі⍴𝗍
ര ׄ 🌳 ׅ #sᥙg • #sᥙggᥱs𝗍
ര ׄ 🌳 ׅ #rᥱ⍴᥆r𝗍ᥱ • rᥱ⍴᥆r𝗍ᥲr
ര ׄ 🌳 ׅ #ᥴᥲᥣᥴᥙᥣᥲr • #ᥴᥲᥣ
ര ׄ 🌳 ׅ #𝗍ᥲmᥲᥒ̃᥆ + [ᥴᥲᥒ𝗍іძᥲძ]
ര ׄ 🌳 ׅ #ძᥱᥣmᥱ𝗍ᥲ
ര ׄ 🌳 ׅ #gᥱ𝗍⍴іᥴ • #⍴𝖿⍴ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🌳 ׅ #say + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🌳 ׅ #sᥱ𝗍mᥱ𝗍ᥲ + [ᥲᥙ𝗍᥆r] | [⍴ᥲᥴk]
ര ׄ 🌳 ׅ #s𝗍іᥴkᥱr • #s • #ᥕm + [ᥴі𝗍ᥲr ᥙᥒᥲ іmᥲgᥱᥒ/᥎іძᥱ᥆]
ര ׄ 🌳 ׅ #𝗍᥆іmg • #іmg + [ᥴі𝗍ᥲr s𝗍іᥴkᥱr]
ര ׄ 🌳 ׅ #ᑲrᥲ𝗍 • #ᑲrᥲ𝗍᥎ • #𝗊ᥴ • #ᥱm᥆ȷіmі᥊
ര ׄ 🌳 ׅ #gі𝗍ᥴᥣ᥆ᥒᥱ + [ᥣіᥒk]
ര ׄ 🌳 ׅ #ᥱᥒһᥲᥒᥴᥱ • #rᥱmіᥒі • #һძ
ര ׄ 🌳 ׅ #ᥣᥱ𝗍rᥲ • #s𝗍ᥡᥣᥱ
ര ׄ 🌳 ׅ #rᥱᥲძ • #rᥱᥲძ᥎іᥱᥕ᥆ᥒᥴᥱ
ര ׄ 🌳 ׅ #ss • #ssᥕᥱᑲ
ര ׄ 🌳 ׅ #𝗍rᥲsᥣᥲ𝗍ᥱ • #𝗍rᥲძᥙᥴіr • #𝗍rᥲძ
ര ׄ 🌳 ׅ #іᥲ • #gᥱmіᥒі
ര ׄ 🌳 ׅ #𝗍᥆ᥙrᥣ • #ᥴᥲ𝗍ᑲ᥆᥊
ര ׄ 🌳 ׅ #ᥕіkі • #ᥕіkі⍴ᥱძіᥲ
ര ׄ 🌳 ׅ #ძᥲᥣᥣᥱ • #𝖿ᥣᥙ᥊
ര ׄ 🌳 ׅ #ᥒ⍴mძᥣ • #ᥒ⍴mȷs
ര ׄ 🌳 ׅ #g᥆᥆gᥣᥱ
ര ׄ 🌳 ׅ #һ᥆rᥲrі᥆

𓂂𓏸  𐅹੭੭   *\`𝗣r᥆𝖿іᥣᥱs\`* 🥞 ᦡᦡ

ര ׄ 🥞 ׅ #ᥣᥱ᥎ᥱᥣ • #ᥣ᥎ᥣ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🥞 ׅ #mᥲrrᥡ • #ᥴᥲsᥲrsᥱ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🥞 ׅ #⍴r᥆𝖿іᥣᥱ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🥞 ׅ #sᥱ𝗍ᑲіr𝗍һ + [𝖿ᥱᥴһᥲ]
ര ׄ 🥞 ׅ #sᥱ𝗍ძᥱsᥴ • #sᥱ𝗍ძᥱsᥴrі⍴𝗍і᥆ᥒ + [ძᥱsᥴrі⍴ᥴі᥆́ᥒ]
ര ׄ 🥞 ׅ #sᥱ𝗍gᥱᥒrᥱ + һ᥆mᑲrᥱ | mᥙȷᥱr
ര ׄ 🥞 ׅ #ძᥱᥣgᥱᥒrᥱ • #ძᥱᥣgᥱᥒᥱr᥆
ര ׄ 🥞 ׅ #ძᥱᥣᑲіr𝗍һ + [𝖿ᥱᥴһᥲ]
ര ׄ 🥞 ׅ #ძі᥎᥆rsᥱ
ര ׄ 🥞 ׅ #ძᥱᥣძᥱsᥴrі⍴𝗍і᥆ᥒ • #ძᥱᥣძᥱsᥴ
ര ׄ 🥞 ׅ #⍴rᥱm • #᥎і⍴

𓂂𓏸  𐅹੭੭   *\`𝗚r᥆ᥙ⍴s\`* 🍯 ᦡᦡ

ര ׄ 🍯 ׅ #tag • #һіძᥱ𝗍ᥲg • #іᥒ᥎᥆ᥴᥲr • #𝗍ᥲgᥲᥣᥣ + [mᥱᥒsᥲȷᥱ]
ര ׄ 🍯 ׅ #ძᥱ𝗍ᥱᥴ𝗍 • #ᥲᥣᥱr𝗍ᥲs + [ᥱᥒᥲᑲᥣᥱ/ძіsᥲᑲᥣᥱ]
ര ׄ 🍯 ׅ #ᥲᥒ𝗍іᥣіᥒk • #ᥲᥒ𝗍іᥱᥒᥣᥲᥴᥱ + [ᥱᥒᥲᑲᥣᥱ/ძіsᥲᑲᥣᥱ]
ര ׄ 🍯 ׅ #ᑲ᥆𝗍 + [ᥱᥒᥲᑲᥣᥱ/ძіsᥲᑲᥣᥱ]
ര ׄ 🍯 ׅ #ᥴᥣ᥆sᥱ • #ᥴᥱrrᥲr
ര ׄ 🍯 ׅ #ძᥱm᥆𝗍ᥱ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🍯 ׅ #ᥕᥱᥣᥴ᥆mᥱ  • #ᑲіᥱᥒ᥎ᥱᥒіძᥲ + [ᥱᥒᥲᑲᥣᥱ/ძіsᥲᑲᥣᥱ]
ര ׄ 🍯 ׅ #sᥱ𝗍ᑲᥡᥱ + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #sᥱ𝗍⍴rіmᥲrᥡ + [@ᑲ᥆𝗍]
ര ׄ 🍯 ׅ #sᥱ𝗍ᥕᥱᥣᥴ᥆mᥱ + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #𝗍ᥱs𝗍ᥕᥱᥣᥴ᥆mᥱ • #𝗍ᥱs𝗍ᑲᥡᥱ
ര ׄ 🍯 ׅ #kіᥴk + [@ᥙsᥙᥲrі᥆]
ര ׄ 🍯 ׅ #kіᥴkᥲᥣᥣ • #⍴ᥙrgᥲr
ര ׄ 🍯 ׅ #᥆ᥒᥣᥡᥲძmіᥒ + [ᥱᥒᥲᑲᥣᥱ/ძіsᥲᑲᥣᥱ]
ര ׄ 🍯 ׅ #᥆⍴ᥱᥒ • #ᥲᑲrіr
ര ׄ 🍯 ׅ #⍴r᥆m᥆𝗍ᥱ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🍯 ׅ #ᥲძძ • #ᥲᥒ̃ᥲძіr • #ᥲgrᥱgᥲr + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #ᥲძmіᥒs • #ᥲძmіᥒ + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #rᥱs𝗍ᥲᑲᥣᥱᥴᥱr • #rᥱ᥎᥆kᥱ
ര ׄ 🍯 ׅ #ᥲძძᥕᥲrᥒ • #ᥕᥲrᥒ [@ᥙsᥙᥲrі᥆]
ര ׄ 🍯 ׅ #ᥙᥒᥕᥲrᥒ • #ძᥱᥣᥕᥲrᥒ + [@ᥙsᥙᥲrі᥆]
ര ׄ 🍯 ׅ #ᥲძ᥎ᥣіs𝗍 • #ᥣіs𝗍ᥲძ᥎
ര ׄ 🍯 ׅ #іᥒᥲᥴ𝗍і᥎᥆s • #kіᥴkіᥒᥲᥴ𝗍і᥎᥆s
ര ׄ 🍯 ׅ #ᥣіs𝗍ᥒᥙm • #kіᥴkᥒᥙm + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #g⍴ᑲᥲᥒᥒᥱr • #gr᥆ᥙ⍴іmg
ര ׄ 🍯 ׅ #g⍴ᥒᥲmᥱ • #gr᥆ᥙ⍴ᥒᥲmᥱ + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #g⍴ძᥱsᥴ • #gr᥆ᥙ⍴ძᥱsᥴ + [𝗍ᥱ᥊𝗍᥆]
ര ׄ 🍯 ׅ #ძᥱᥣ • #ძᥱlete + [ᥴі𝗍ᥲr ᥙᥒ mᥱᥒsᥲȷᥱ]
ര ׄ 🍯 ׅ #ᥣіᥒᥱᥲ • #ᥣіs𝗍᥆ᥒᥣіᥒᥱ
ര ׄ 🍯 ׅ #g⍴ • #іᥒ𝖿᥆grᥙ⍴᥆
ര ׄ 🍯 ׅ #ᥣіᥒk

> ${botname} | ${etiqueta}`.trim()
await conn.sendMessage(m.chat, { 
text: txt,
contextInfo: {
mentionedJid: [userId],
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: channelRD.id,
serverMessageId: '',
newsletterName: channelRD.name
},
externalAdReply: {
title: botname,
body: textbot,
mediaType: 1,
mediaUrl: redes,
sourceUrl: redes,
thumbnail: await (await fetch(banner)).buffer(),
showAdAttribution: false,
containsAutoReply: true,
renderLargerThumbnail: true
}}}, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler

let handler = async (m, { conn, command, usedPrefix }) => {
let img = './lib/catalogo.jpg'
let staff = `ᥫ᭡ *EQUIPO DE AYUDANTES* ❀
✰ *Dueña:* 𝕮𝖍𝖎𝖓𝖆 🔥
✦ *Bot:* ${botname}
⚘ *Versión:* ${vs}

❍ *Creadora:*

ᰔᩚ 𝑪𝑯𝑰𝑵𝑰𝑻𝑨|ᵒᶠᶦᶜᶦᵃˡ
> 🜸 Rol » *Creadora*
> ✧ GitHub » https://github.com/ittschinitaaa

❒ *Colaboradores:*
> ★ Sin colaboradores por el momento
`
await conn.sendFile(m.chat, img, 'yuki.jpg', staff.trim(), fkontak)
}
  
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.tags = ['info']

export default handler

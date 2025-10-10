var handler = async (m, { conn }) => {
  const ownerNumber = global.owner[0][0] + '@s.whatsapp.net'
  const ownerName = global.owner[0][1] || 'Propietario'
  const github = 'https://github.com/ittschinitaaa/Senko-Bot'
  const instagram = 'https://www.instagram.com/ittschinitaaa/'

  const texto = `
🌸 *INFORMACIÓN DEL OWNER* 🌸

🪪 *Nombre:* ${ownerName}
📞 *Número:* wa.me/${global.owner[0][0]}
💻 *GitHub:* ${github}
📷 *Instagram:* ${instagram}

━━━━━━━━━━━━━━━
🦊 *Senko-Bot* está bajo el cuidado de su creadora.
Cualquier duda, sugerencia o reporte, podés contactarla 💖
`

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/swwwag.jpg' }, // Imagen representativa
    caption: texto,
    footer: 'Senko-Bot 💫 by Chinita',
    buttons: [
      { buttonId: `.menu`, buttonText: { displayText: '🌸 Menú Principal' }, type: 1 },
      { buttonId: `.report`, buttonText: { displayText: '📩 Reportar un error' }, type: 1 },
      { buttonId: `https://github.com/ittschinitaaa/Senko-Bot`, buttonText: { displayText: '💻 GitHub Oficial' }, type: 1 },
      { buttonId: `${instagram}`, buttonText: { displayText: '📷 Instagram' }, type: 1 }
    ],
    headerType: 4
  }, { quoted: m })
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner', 'creadora', 'dueño']

export default handler

export async function before(m, { groupMetadata }) {
  if (!m.text || !globalThis.prefix.test(m.text)) return;

  const usedPrefix = globalThis.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();
  if (!command) return;

  const validCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      if (
        plugin.command &&
        (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)
      ) {
        return true;
      }
    }
    return false;
  };

  let chat = globalThis.db.data.chats[m.chat];
  let id = this.user.jid;
  let settings = globalThis.db.data.settings[id];
  let owner = [...globalThis.owner.map(([number]) => number)]
    .map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
    .includes(m.sender);

  if (chat.adminonly) return;
  if (settings.self) return;
  if (command === 'mute') return;
  if (chat.bannedGrupo && !owner) return;

  // 🌐 Canal o grupo donde se enviarán las notificaciones
  const canalNotificacion = "120363419164978167@newsletter"; // 🔹 Reemplaza con tu JID real

/*  try {
    // 📋 Texto de la notificación
    let chtxt = ` ֯　ׅ👤ㅤ *𝐔𝐬𝐮𝐚𝐫𝐢𝐨 ›* ${m.pushName || "Desconocido"}

 ׄ 🦊 ׅ り *𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐔𝐬𝐚𝐝𝐨 ›* ${usedPrefix}${command}
 ׄ 🍁 ׅ り *𝐕𝐢𝐬𝐢𝐭𝐚 ›* instagram.com/its.chinitaaa_
 ׄ 🦊 ׅ り *𝐁𝐨𝐭 ›* ${botname}
 ׄ 🍁 ׅ り *𝐕𝐞𝐫𝐬𝐢𝐨́𝐧 𝐝𝐞𝐥 𝐛𝐨𝐭 ›* ${vs}`;

    let ppch = await this.profilePictureUrl(m.sender, 'image').catch(_ => "https://cdn.stellarwa.xyz/files/1758842359325.jpeg");

    await this.sendMessage(canalNotificacion, {
      text: chtxt,
      contextInfo: {
        externalAdReply: {
          title: "🌟 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 🌟",
          body: '💞 ¡𝙉𝙪𝙚𝙫𝙤 𝙘𝙤𝙢𝙖𝙣𝙙𝙤 𝙪𝙨𝙖𝙙𝙤! 💞',
          thumbnailUrl: ppch,
          sourceUrl: globalThis.redes || "https://instagram.com/its.chinitaaa_",
          mediaType: 2,
          showAdAttribution: false,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: null });

  } catch (e) {
    console.log(`[ ❌ Error ] No se pudo enviar el mensaje al canal.\n${e}`);
  }*/

  if (validCommand(command, globalThis.plugins)) {
  
  } else {
    const comando = command;
    await m.reply(`✿ El comando *${comando}* no existe.\n> Usa *${usedPrefix}help* para ver la lista de comandos disponibles.`);
  }
      }

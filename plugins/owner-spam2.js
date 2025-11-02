const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const args = text.split('|').map(v => v.trim());

  if (args.length < 3) {
    return m.reply(`✧ Debes ingresar el link del grupo, el mensaje y la cantidad de spam separados por "|".\n\nEjemplo:\n${usedPrefix + command} https://chat.whatsapp.com/SSSS | Hola, ¿cómo están? | 5`);
  }

  const [groupLink, message, countStr] = args;
  const count = parseInt(countStr, 10);

  if (!groupLink.includes('chat.whatsapp.com')) {
    return m.reply(`✦ Proporcione un enlace válido del grupo.`);
  }
  if (isNaN(count) || count <= 0) {
    return m.reply(`✧ Especifique una cantidad válida de mensajes (mayor a 0).`);
  }

  try {
    const code = groupLink.split('chat.whatsapp.com/')[1];
    const groupId = await conn.groupAcceptInvite(code);

    await m.reply(`✅ Unido al grupo con éxito.\nIniciando envío de ${count} mensajes...`);

    for (let i = 0; i < count; i++) {
      await conn.sendMessage(groupId, { text: message });
      await delay(1500); // 1.5s entre mensajes para evitar baneo
    }

    await m.reply(`✅ Envío completado. Saliendo del grupo...`);
    await conn.groupLeave(groupId);

  } catch (error) {
    console.error(error);

    let msg = '❌ Error al intentar realizar la operación.';
    if (String(error).includes('bad-request')) {
      msg = '⚠️ No se pudo unir al grupo. Enlace inválido, grupo lleno o restricción de WhatsApp.';
    }

    await m.reply(msg);
  }
};

handler.help = ['spam2'];
handler.tags = ['owner'];
handler.command = ['spam2'];
handler.owner = true;

module.exports = handler;

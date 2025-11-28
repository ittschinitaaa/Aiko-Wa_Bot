const handler = async (m, { conn, args }) => {
  try {
    const texto = args.join(" ");
    const emojis = ["🤣","🔥","💖","😎","🌸","🎉","🥳","🍀","⭐","😻"];

    if (!texto) {
      return m.reply("⚠️ Uso correcto: *#reactch Hola canal*");
    }

    // ID del canal (newsletter)
    const channelId = "120363345778623279@newsletter"; // reemplázalo por el real

    // 1. Enviar mensaje al canal
    const enviado = await conn.sendMessage(channelId, { text: texto });

    // 2. Reaccionar varias veces al mensaje enviado
    for (let emoji of emojis) {
      await conn.sendMessage(channelId, {
        react: {
          text: emoji,
          key: enviado.key
        }
      });

      await new Promise(r => setTimeout(r, 500)); // mini delay
    }

    m.reply("✅ Mensaje enviado y reaccionado con éxito!");

  } catch (e) {
    console.error(e);
    m.reply("❌ Ocurrió un error al reaccionar en el canal");
  }
};

handler.help = ["reactch"];
handler.tags = ["tools"];
handler.command = ["reactch"];

module.exports = handler;

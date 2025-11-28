const handler = async (m, { conn, args }) => {
  try {
    const texto = args.join(" ");
    const emojis = ["🤣","🔥","💖","😎","🌸","🎉","🥳","🍀","⭐","😻"];

    if (!texto) {
      return m.reply("⚠️ Uso correcto: #reactch Hola canal");
    }

    // ID del canal newsletter
    const channelId = "120363345778623279@newsletter"; // cámbialo por el tuyo

    // 1. Enviar mensaje al canal
    const enviado = await conn.sendMessage(channelId, { text: texto });

    // 2. Agregar reacciones al mensaje enviado
    for (const emoji of emojis) {
      await conn.sendMessage(channelId, {
        react: {
          text: emoji,
          key: enviado.key
        }
      });

      await new Promise(res => setTimeout(res, 500)); // delay opcional
    }

    m.reply("✅ Reacciones enviadas correctamente!");

  } catch (e) {
    console.error(e);
    m.reply("❌ Ocurrió un error en el comando");
  }
};

handler.help = ["reactch"];
handler.tags = ["tools"];
handler.command = ["reactch"];

export default handler;

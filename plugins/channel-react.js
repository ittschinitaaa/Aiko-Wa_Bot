// Pon aquí el ID de tu canal newsletter:
const MY_CHANNEL = "120363345778623279@newsletter";

// Emojis que quieres usar para reaccionar
const MANY_EMOJIS = [
  "😂", "🤣", "😍", "🥰", "😱", "🔥", "💖", "✨", "😎", "🤩",
  "🫶", "🌸", "💫", "🎉", "😘", "😻", "🍓", "⚡", "🌈", "🧸",
  "😳", "😜", "😇", "👀", "💗", "🍀", "🌙", "⭐", "💥", "🔮"
];

const handler = async (m, { conn }) => {
  try {
    // Si no viene de un newsletter, no hace nada
    if (!m.key.remoteJid?.includes("@newsletter")) return;

    // Si no es tu canal, también ignorará
    if (m.key.remoteJid !== MY_CHANNEL) return;

    console.log("⚡ Nuevo post del canal detectado, enviando reacciones...");

    // Reaccionar con MUCHOS emojis
    for (const emoji of MANY_EMOJIS) {
      await conn.sendMessage(m.key.remoteJid, {
        react: {
          text: emoji,
          key: m.key
        }
      });

      // Pausa opcional para evitar limite/spam  
      await new Promise(res => setTimeout(res, 200));
    }

    console.log("✨ Reacciones enviadas correctamente.");

  } catch (err) {
    console.error("❌ Error reaccionando al canal:", err);
  }
};

// Listener automático
handler.before = handler;

export default handler;

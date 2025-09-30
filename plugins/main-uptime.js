let handler = async (m, { conn }) => {
    if (!global.botStart) global.botStart = new Date();

    let now = new Date();
    let diff = now - global.botStart;

    let seconds = Math.floor(diff / 1000) % 60;
    let minutes = Math.floor(diff / 1000 / 60) % 60;
    let hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    let days = Math.floor(diff / 1000 / 60 / 60 / 24);

    // Mensaje aesthetic
    let uptimeMessage = `
╭─❀ ⌛ 𝘼𝙘𝙩𝙞𝙫𝙤 ⌛ ❀─╮
│
│ 🌟 Días: ${days}
│ 🌟 Horas: ${hours}
│ 🌟 Minutos: ${minutes}
│ 🌟 Segundos: ${seconds}
│
╰─❀ 𝙎𝙞𝙜𝙤 𝙛𝙪𝙣𝙘𝙞𝙤𝙣𝙖𝙣𝙙𝙤 𝙘𝙤𝙢𝙤 𝙨𝙞𝙚𝙢𝙥𝙧𝙚 ❀─╯
`;

    conn.sendMessage(m.chat, { text: uptimeMessage }, { quoted: m });
};

handler.command = ["uptime", "activado"];
export default handler;

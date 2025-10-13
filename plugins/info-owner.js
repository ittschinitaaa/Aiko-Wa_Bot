import axios from 'axios'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn }) => {
  const proses = '🌸 Obteniendo información de la creadora...'
  await conn.sendMessage(m.chat, { text: proses }, { quoted: m })

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, {
      upload: conn.waUploadToServer
    })
    return imageMessage
  }

  const owners = [
    {
      name: '𝑪𝑯𝑰𝑵𝑰𝑻𝑨 | ᵒᶠᶦᶜᶦᵃˡ',
      desc: 'Creador Principal de Senko-Bot',
      image: 'https://files.catbox.moe/ep8t7x.jpg',
      buttons: [
        { name: 'WhatsApp', url: 'https://wa.me/573243768166' },
        { name: 'Instagram', url: 'https://www.instagram.com/its.chinitaaa_' },
        { name: 'Github', url: 'https://www.github.com/ittschinitaaa' },
      ]
    },
    {
      name: '𝕮𝖍𝖎𝖓𝖆 🔥',
      desc: 'Creadora de Aiko-Bot',
      image: 'https://files.catbox.moe/bp1qfw.png',
      buttons: [
        { name: 'WhatsApp', url: 'https://wa.me/573243768166' },
        { name: 'Instagram', url: 'https://www.instagram.com/its.chinitaaa_' },
        { name: 'Github', url: 'https://www.githib.com/ittschinitaaa' },
      ]
    }
  ]

  let cards = []

  for (let owner of owners) {
    const imageMsg = await createImage(owner.image)

    let formattedButtons = owner.buttons.map(btn => ({
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: btn.name,
        url: btn.url
      })
    }))

    cards.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `✨️`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: '> Conoce más sobre nuestra creadora siguiendo sus redes sociales. Haz clic en cualquier botón para acceder a su perfil y descubrir su trabajo.'
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        hasMediaAttachment: true,
        imageMessage: imageMsg
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: formattedButtons
      })
    })
  }

  const slideMessage = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: '𝗖rᥱᥲძ᥆rᥲ 𝗱ᥱ 𝗦ᥱᥒk᥆-𝗕᥆𝗍 𝘆 𝗔іk᥆-𝗕᥆𝗍'
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Conoce a la desarrolladora de los bot'
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards
          })
        })
      }
    }
  }, {})

  await conn.relayMessage(m.chat, slideMessage.message, { messageId: slideMessage.key.id })
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner', 'creador', 'donar']

export default handler

/*import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
  m.react('👑');
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let pp = await conn.profilePictureUrl(who).catch(_ => 'https://qu.ax/PRgfc.jpg');
  let biografia = await conn.fetchStatus(`${suittag}@s.whatsapp.net`).catch(_ => 'Sin Biografía');
  let biografiaBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}@s.whatsapp.net`).catch(_ => 'Sin Biografía');
  let bio = biografia.status?.toString() || 'Sin Biografía';
  let biobot = biografiaBot.status?.toString() || 'Sin Biografía';
  let name = await conn.getName(who);

  await sendContactArray(conn, m.chat, [
    [`${suittag}`, `𝕮𝖍𝖎𝖓𝖆 🔥`, dev, `𝗣𝗿𝗼𝗽𝗶𝗲𝘁𝗮𝗿𝗶𝗮 👑`, `⊹˚• Argentina •˚⊹`, bio],
    [`${conn.user.jid.split('@')[0]}`, `✦ Es Un Bot`, botname, dev, channel, biobot]
  ], m);
}

handler.help = ["creadora", "owner"];
handler.tags = ["info"];
handler.command = ['owner', 'creator', 'creadora', 'dueña'];

export default handler;

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];
  let contacts = [];
  for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
    number = number.replace(/[^0-9]/g, '');
    let njid = number + '@s.whatsapp.net';
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name.replace(/\n/g, '\\n')};;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:Email
item3.ADR:;;${isi3};;;;
item3.X-ABADR:ac
item3.X-ABLabel:Region
item4.URL:${isi4}
item4.X-ABLabel:Website
item5.X-ABLabel:${isi5}
END:VCARD`.trim();
    contacts.push({ vcard, displayName: name });
  }
  return await conn.sendMessage(jid, {
    contacts: {
      displayName: (contacts.length > 1 ? `Contactos` : contacts[0].displayName) || null,
      contacts,
    }
  }, {
    quoted,
    ...options
  });
}
*/

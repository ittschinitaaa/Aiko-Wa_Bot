import axios from 'axios'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn }) => {
  const proses = '🌸 Obteniendo información de los creadores...'
  await conn.sendMessage(m.chat, { text: proses }, { quoted: m })

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, {
      upload: conn.waUploadToServer
    })
    return imageMessage
  }

  const owners = [
    {
      name: 'DevBrayan',
      desc: 'Creador Principal de NagiBotV3',
      image: 'https://files.cloudkuimages.guru/images/fJk8xWXl.jpg',
      buttons: [
        { name: 'WhatsApp', url: 'https://wa.me/50231458537' },
        { name: 'Instagram', url: 'https://www.instagram.com/elbrayan502ff' },
        { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61556686993783' },
        { name: 'Telegram', url: 'https://t.me/DevBrayan' },
        { name: 'TikTok', url: 'https://www.tiktok.com/@fantom_uwu_330' },
        { name: 'PayPal', url: 'https://paypal.me/BrayanMoscoso' }
      ]
    },
    {
      name: 'DavBrayan2',
      desc: 'Co-Creador de Roxy-MD',
      image: 'https://files.cloudkuimages.guru/images/MLrB6aiO.jpg',
      buttons: [
        { name: 'WhatsApp', url: 'https://wa.me/573001533523' },
        { name: 'Instagram', url: 'https://www.instagram.com/elbrayan502ff' },
        { name: 'TikTok', url: 'https://www.tiktok.com/@fantom_uwu_330' },
        { name: 'PayPal', url: 'https://paypal.me/davidryze' }
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
        text: '> Conoce más sobre nuestros creadores siguiendo sus redes sociales. Haz clic en cualquier botón para acceder a sus perfiles y descubrir su trabajo. Si te gustaría apoyarlos, también puedes realizar una donación a través de nuestro PayPal.'
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
            text: '✨️ Creadores de Roxy-MD & NagiBot-MD ✨️'
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Conoce a los desarrolladores del bot'
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

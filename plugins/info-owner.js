import axios from 'axios'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn }) => {
  const proses = '> ✿ Obteniendo información de la creadora...'
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
      desc: '𝗖𝗿𝗲𝗮𝗱𝗼𝗿𝗮 𝗣𝗿𝗶𝗻𝗰𝗶𝗽𝗮𝗹 𝗱𝗲 𝗔𝗶𝗸𝗼-𝗕𝗼𝘁',
      image: 'https://files.catbox.moe/bp1qfw.png',
      buttons: [
        { name: 'WhatsApp', url: 'https://wa.me/573243768166' },
        { name: 'Instagram', url: 'https://www.instagram.com/its.chinitaaa_' },
        { name: 'Github', url: 'https://www.github.com/ittschinitaaa' },
      ]
    },
    {
      name: '𝕮𝖍𝖎𝖓𝖆 🔥',
      desc: '𝗖𝗿𝗲𝗮𝗱𝗼𝗿𝗮 𝗱𝗲 𝗦𝗲𝗻𝗸𝗼-𝗕𝗼𝘁',
      image: 'https://files.catbox.moe/ep8t7x.jpg',
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
        text: `⍴᥆ᥕᥱrᥱძ ᑲᥡ ᥴһіᥒі𝗍ᥲ`
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
handler.command = ['owner', 'creadora', 'dueña']

export default handler


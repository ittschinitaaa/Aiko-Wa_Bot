import fetch from "node-fetch"
import yts from "yt-search"
import axios from "axios";

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  
try {
if (!text.trim()) return conn.reply(m.chat, `🔔 *Por favor, ingresa el nombre o link del archivo a descargar.*`, m)

    let videoIdMatch = text.match(youtubeRegexID)
    let search = await yts(videoIdMatch ? 'https://youtu.be/' + videoIdMatch[1] : text)
    let video = videoIdMatch
      ? search.all.find(v => v.videoId === videoIdMatch[1]) || search.videos.find(v => v.videoId === videoIdMatch[1])
      : search.videos?.[0]

    if (!video) return conn.reply(m.chat, '❌ *No se encontraron resultados para tu búsqueda.*', m)
   
    await m.react('⏱️')
    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const vistas = formatViews(views)
    const canal = author?.name || 'Desconocido'
    
    const infoMessage = 
    `˚∩　ׅ　🅨𝗼𝘂𝘁𝘂𝗯𝗲 🅟𝗹𝗮𝘆　ׄᰙ　ׅ
    
*🎵 Titulo:* ${title}
    
> *🎬 Canal:* ${canal}
     
*👀 Vistas:* ${vistas}   
*⏳ Duración:* ${timestamp}
*🤩 Calidad:* 130kbps
*📆 Publicado:* ${ago}
*🔗 Link:* ${url}

${botname} | ${etiqueta}`

    const thumb = (await conn.getFile(thumbnail))?.data
    const external = {
      contextInfo: {
        externalAdReply: {
          title: title,
          body: 'Descargando archivo',
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true
        }
      }
    }

    await conn.reply(m.chat, infoMessage, m, external)

    if (['playaudio','play'].includes(command)) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/v1/download/youtube/audio?url=${url}&quality=130`)
        const json = await res.json()
        
        if (!json.result?.download?.url) throw '*⚠️ No se obtuvo un enlace válido.*'

        await conn.sendMessage(m.chat, {
          audio: { url: json.result.download.url },
          mimetype: 'audio/mpeg',
          fileName: json.result.download.filename || `${json.result.metadata?.title || title}.mp3`,
          contextInfo: {
            externalAdReply: {
              title: title,
              body: `${dev}`,
              mediaType: 1,
              thumbnail: thumb,
              mediaUrl: url,
              sourceUrl: url,
              renderLargerThumbnail: true
            }
          }
        }, { quoted: m })

        await m.react('✅')
      } catch (e) {
        return conn.reply(m.chat, '*❌ No se pudo enviar el audio. El archivo podría ser demasiado pesado o hubo un error en la generación del enlace.*', m)
      }
    }
    
    else if (['playvideo','play2'].includes(command)) {
      try {
        const res = await fetch(`https://api.stellarwa.xyz/dow/ytmp4?url=${url}&apikey=Diamond`)
        const json = await res.json()

        if (!json.status || !json.data?.dl) throw '⚠️ *No se obtuvo enlace de video.*'
        const data = json.data

        const size = await getSize(data.dl)
        const sizeStr = size ? await formatSize(size) : 'Desconocido'

        let caption = `🎬 *Título:*
> ${data.title}`
       .trim()

        await conn.sendFile(
          m.chat,
          data.dl,
          `${data.title || 'video'}.mp4`,
          caption,
          m
        )

        await m.react('✅')
      } catch (e) {
        return conn.reply(m.chat, '⚠️ *No se pudo enviar el video. El archivo podría ser muy pesado o hubo un error en el enlace.*', m)
      }
    }

    else {
      return conn.reply(m.chat, '✧︎ Comando no reconocido.', m)
    }

  } catch (err) {
    return m.reply(`❌ *Ocurrió un error* \n${err}`)
  }
}

handler.command = handler.help = ['playaudio','play','playvideo', 'p]ay2']
handler.tags = ['descargas']

export default handler


function formatViews(views) {
  if (views === undefined) return "No disponible"
  if (views >= 1e9) return `${(views / 1e9).toFixed(1)}B (${views.toLocaleString()})`
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M (${views.toLocaleString()})`
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}K (${views.toLocaleString()})`
  return views.toString()
}

async function getSize(downloadUrl) {
  try {
    const response = await axios.head(downloadUrl, { maxRedirects: 5 });
    const length = response.headers['content-length'];
    return length ? parseInt(length, 10) : null;
  } catch (error) {
    console.error("Error al obtener el tamaño:", error.message);
    return null;
  }
}

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

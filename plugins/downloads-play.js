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

    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const vistas = formatViews(views)
    const canal = author?.name || 'Desconocido'
    
    const infoMessage = 
    `*🎵 Titulo:* ${title}
    
> *🎬 Canal:* ${canal}
     
> *👀 Vistas:* ${vistas}
     
> *⏳ Duración:* ${timestamp}
     
> *📆 Publicado:* ${ago}
     
> *🔗 Link:* ${url}

𝘔𝘪𝘺𝘶𝘬𝘪𝘉𝘰𝘵-𝘔𝘋 | © 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘉𝘺 𝘖𝘮𝘢𝘳𝘎𝘳𝘢𝘯𝘥𝘢`

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

    if (['playaudio'].includes(command)) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/v1/download/youtube/audio?url=${url}&quality=128`)
        const json = await res.json()
        
        if (!json.result?.download?.url) throw '*⚠️ No se obtuvo un enlace válido.*'

        await conn.sendMessage(m.chat, {
          audio: { url: json.result.download.url },
          mimetype: 'audio/mpeg',
          fileName: json.result.download.filename || `${json.result.metadata?.title || title}.mp3`,
          contextInfo: {
            externalAdReply: {
              title: title,
              body: 'Archivo descargado' ,
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
    
    else if (['playvideo'].includes(command)) {
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

handler.command = handler.help = ['playaudio', 'playvideo']
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
/*import fetch from "node-fetch"
import yts from 'yt-search'

const handler = async (m, { conn, text, usedPrefix, command }) => {
try {
if (!text.trim()) return conn.reply(m.chat, `❀ Por favor, ingresa el nombre de la música a descargar.`, m)
await m.react('🕒')
const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text
const search = await yts(query)
const result = videoMatch ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] : search.all[0]
if (!result) throw 'ꕥ No se encontraron resultados.'
const { title, thumbnail, timestamp, views, ago, url, author, seconds } = result
if (seconds > 1800) throw '⚠ El video supera el límite de duración (10 minutos).'
const vistas = formatViews(views)
const info = `「✦」Descargando *<${title}>*\n\n> 🪻 Canal » *${author.name}*\n> 👥 Vistas » *${vistas}*\n> ⏰ Duración » *${timestamp}*\n> 🌸 Publicado » *${ago}*\n> 🔗 Link » ${url}`
const thumb = (await conn.getFile(thumbnail)).data
await conn.sendMessage(m.chat, { image: thumb, caption: info }, { quoted: m })
if (['play', 'yta', 'ytmp3', 'playaudio'].includes(command)) {
const audio = await getAud(url)
if (!audio?.url) throw '⚠ No se pudo obtener el audio.'
m.reply(`> ❀ *Audio procesado. Servidor:* \`${audio.api}\``)
await conn.sendMessage(m.chat, { audio: { url: audio.url }, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
await m.react('✅')
} else if (['play2', 'ytv', 'ytmp4', 'mp4'].includes(command)) {
const video = await getVid(url)
if (!video?.url) throw '⚠ No se pudo obtener el video.'
m.reply(`> ❀ *Vídeo procesado. Servidor:* \`${video.api}\``)
await conn.sendFile(m.chat, video.url, `${title}.mp4`, `> ❀ ${title}`, m)
await m.react('✅')
}} catch (e) {
await m.react('❌')
return conn.reply(m.chat, typeof e === 'string' ? e : '⚠︎ Se ha producido un problema.\n> Usa *' + usedPrefix + 'report* para informarlo.\n\n' + e.message, m)
}}

handler.command = handler.help = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4', 'playaudio', 'mp4']
handler.tags = ['descargas']
handler.group = true

export default handler

async function getAud(url) {
const apis = [
{ api: 'ZenzzXD', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.download_url },
{ api: 'ZenzzXD v2', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp3v2?url=${encodeURIComponent(url)}`, extractor: res => res.download_url }, 
{ api: 'Vreden', endpoint: `${global.APIs.vreden.url}/api/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url },
{ api: 'Delirius', endpoint: `${global.APIs.delirius.url}/download/ymp3?url=${encodeURIComponent(url)}`, extractor: res => res.data?.download?.url }
]
return await fetchFromApis(apis)
}
async function getVid(url) {
const apis = [
{ api: 'ZenzzXD', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.download_url },
{ api: 'ZenzzXD v2', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp4v2?url=${encodeURIComponent(url)}`, extractor: res => res.download_url },
{ api: 'Vreden', endpoint: `${global.APIs.vreden.url}/api/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url },
{ api: 'Delirius', endpoint: `${global.APIs.delirius.url}/download/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.data?.download?.url }
]
return await fetchFromApis(apis)
}
async function fetchFromApis(apis) {
for (const { api, endpoint, extractor } of apis) {
try {
const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 10000)
const res = await fetch(endpoint, { signal: controller.signal }).then(r => r.json())
clearTimeout(timeout)
const link = extractor(res)
if (link) return { url: link, api }
} catch (e) {}
await new Promise(resolve => setTimeout(resolve, 500))
}
return null
}
function formatViews(views) {
if (views === undefined) return "No disponible"
if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
return views.toString()
}
*/

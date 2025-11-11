const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = (await import("@whiskeysockets/baileys"))
import qrcode from "qrcode"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import pino from "pino"
import chalk from "chalk"
import util from "util"
import * as ws from "ws"
const { child, spawn, exec } = await import("child_process")
const { CONNECTING } = ws
import { makeWASocket } from "../lib/simple.js"
import { fileURLToPath } from "url"

let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"
let drm1 = ""
let drm2 = ""

let rtx = `\`🌷 𝗦𝗘𝗥 𝗕𝗢𝗧 • 𝗠𝗢𝗗𝗘 𝗤𝗥 🌷\`\n\n💻 Con otro celular o en la PC escanea este QR para convertirte en un *Sub-Bot* Temporal.\n\n\`1\` 𖹬 Toca los tres puntos arriba a la derecha\n\`2\` 𖹬 Selecciona "Dispositivos vinculados"\n\`3\` 𖹬 Escanea este código QR para iniciar sesión\n\n✧ ¡Este código QR expira en 45 segundos!`
let rtx2 = `\`🌷 𝗦𝗘𝗥 𝗕𝗢𝗧 • 𝗠𝗢𝗗𝗘 𝗖𝗢𝗗𝗘 🌷\`\n\n📱 Usa este Código para convertirte en un *Sub-Bot* Temporal.\n\n\`1\` 𖹬 Toca los tres puntos arriba a la derecha\n\`2\` 𖹬 Selecciona "Dispositivos vinculados"\n\`3\` 𖹬 Vincular con el número de teléfono\n\`4\` 𖹬 Escribe el código mostrado abajo\n\n> ✧ No uses tu cuenta principal.`

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const yukiJBOptions = {}
if (!(global.conns instanceof Array)) global.conns = []

function isSubBotConnected(jid) {
  return global.conns.some(sock => sock?.user?.jid && sock.user.jid.split("@")[0] === jid.split("@")[0])
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!globalThis.db.data.settings[conn.user.jid].jadibotmd)
    return m.reply(`ꕥ El comando *${command}* está desactivado temporalmente.`)

  let time = global.db.data.users[m.sender].Subs + 120000
  if (new Date - global.db.data.users[m.sender].Subs < 120000)
    return conn.reply(m.chat, `ꕥ Debes esperar ${msToTime(time - new Date())} antes de volver a vincular un sub-bot.`, m)

  let socklimit = global.conns.filter(sock => sock?.user).length
  if (socklimit >= 15) return m.reply("ꕥ No hay espacios disponibles para más *Sub-Bots.*")

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let id = `${who.split`@`[0]}`
  let pathYukiJadiBot = path.join(`./${jadi}/`, id)

  if (!fs.existsSync(pathYukiJadiBot)) fs.mkdirSync(pathYukiJadiBot, { recursive: true })

  yukiJadiBot({ pathYukiJadiBot, m, conn, args, usedPrefix, command })
  global.db.data.users[m.sender].Subs = new Date * 1
}

handler.help = ["qr", "code"]
handler.tags = ["serbot"]
handler.command = ["qr", "code"]
export default handler

// 📦 FUNCIÓN PRINCIPAL
export async function yukiJadiBot(options) {
  let { pathYukiJadiBot, m, conn, args, usedPrefix, command } = options
  if (command === "code") {
    command = "qr"
    args.unshift("code")
  }

  const mcode = args[0]?.match(/(--code|code)/) || args[1]?.match(/(--code|code)/)
  const { state, saveCreds } = await useMultiFileAuthState(pathYukiJadiBot)
  const { version } = await fetchLatestBaileysVersion()
  const connectionOptions = {
    logger: pino({ level: "fatal" }),
    printQRInTerminal: false,
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })) },
    browser: ["Windows", "Firefox"],
    version,
  }

  let sock = makeWASocket(connectionOptions)

  // 🧩 EVENTO DE CONEXIÓN
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr, isNewLogin } = update

    if (qr && !mcode) {
      let txtQR = await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim() }, { quoted: m })
      setTimeout(() => conn.sendMessage(m.sender, { delete: txtQR.key }), 30000)
    }

    if (qr && mcode) {
      let secret = await sock.requestPairingCode(m.sender.split`@`[0])
      secret = secret.match(/.{1,4}/g)?.join("-")
      await conn.sendMessage(m.chat, { text: rtx2 }, { quoted: m })
      await m.reply(secret)
    }

    if (connection === "open") {
      if (!global.db.data?.users) loadDatabase()
      await joinChannels(sock)

      let userName = sock.authState.creds.me.name || "Anónimo"
      const id = path.basename(pathYukiJadiBot)
      const canal = "120363402839382986@newsletter" // cambia a tu canal real

      console.log(chalk.bold.cyanBright(`\n🌷⸺⸺⸺⸺【• SUB-BOT •】⸺⸺⸺⸺🌷\n│\n│ 🌼 ${userName} (+${id}) conectado exitosamente.\n│\n🌱⸺⸺⸺【• CONECTADO •】⸺⸺⸺🌱`))
      sock.isInit = true
      global.conns.push(sock)

      if (m?.chat) {
        await sock.sendMessage(m.chat, {
          text: isSubBotConnected(m.sender)
            ? `> 🌷 @${m.sender.split("@")[0]}, ya estás conectado, ahora eres parte de la familia de sub-bots de Aiko...`
            : `🌸 Has registrado un nuevo *Sub-Bot!* [@${m.sender.split("@")[0]}]\n\n> Usa *#infobot* para más info.`,
          mentions: [m.sender],
        }, { quoted: m })
      }

      // 📢 Notificación al canal
      try {
        let metodoConexion = mcode ? "Código de 8 dígitos" : "Código QR"
        let navegador = connectionOptions.browser[1]
        let mensaje = `【 🔔 *Notificación General* 🔔 】\n\n🐾 ¡Nuevo sub-bot conectado!\n\n👤 *Usuario:* ${userName}\n🔑 *Método:* ${metodoConexion}\n🌐 *Navegador:* ${navegador}\n🤖 *Bot:* Starlights\n⭐ *Versión:* 1.7.5 (Beta)\n\n✨ Conviértete en sub-bot ahora:\nwa.me/${id}?text=/code`

        await sock.sendMessage(canal, {
          text: mensaje,
          contextInfo: {
            externalAdReply: {
              title: "🌟 Notificación General 🌟",
              body: "¡Nuevo sub-bot conectado!",
              thumbnailUrl: "https://raw.githubusercontent.com/miaoficial02/storage/main/img/menu.jpg",
              sourceUrl: "https://github.com/miaoficial02",
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        })
      } catch (err) {
        console.log("⚠️ Error al enviar notificación al canal:", err)
      }
    }
  })

  sock.ev.on("creds.update", saveCreds)
}

// 🕒 UTILIDADES
function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60)
  let minutes = Math.floor((duration / (1000 * 60)) % 60)
  return `${minutes} m y ${seconds} s`
}

async function joinChannels(sock) {
  for (const value of Object.values(global.ch)) {
    if (typeof value === "string" && value.endsWith("@newsletter")) {
      await sock.newsletterFollow(value).catch(() => {})
    }
  }
}

import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = "" //Ejemplo: 573218138672

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
"923256941884",
"5492644996684",
"573243768166"
]

global.suittag = ["923256941884"] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = "Baileys Multi Device"
global.vs = "^1.0.0 | Latest"
global.nameqr = "⏤͟͟͞͞𝙎𝙚𝙣𝙠𝙤-𝘽𝙤𝙩 🦊"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.yukiJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.botname = "⏤͟͟͞͞𝐒𝔼𝐍𝕂𝐎 - 𝔹𝐎𝕋 🦊"
global.textbot = "sᥱᥒk᥆, mᥲძᥱ ᥕі𝗍һ ᑲᥡ 𝑪𝑯𝑰𝑵𝑰𝑻𝑨|ᵒᶠᶦᶜᶦᵃˡ"
global.dev = "© ⍴᥆ᥕᥱrᥱძ ᑲᥡ 𝑪𝑯𝑰𝑵𝑰𝑻𝑨|ᴼᶠᴵᶜᴵᴬᴸ"
global.author = "© mᥲძᥱ ᥕі𝗍һ ᑲᥡ 𝑪𝑯𝑰𝑵𝑰𝑻𝑨|ᴼᶠᴵᶜᴵᴬᴸ"
global.etiqueta = "𝑪𝑯𝑰𝑵𝑰𝑻𝑨|ᴼᶠᴵᶜᴵᴬᴸ"
global.currency = "¥enes"
global.banner = "https://cdn.stellarwa.xyz/files/1758842352363.jpeg"
global.icono = "https://cdn.stellarwa.xyz/files/1758842359325.jpeg"
global.catalogo = fs.readFileSync('./lib/catalogo.jpg')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.group = "https://chat.whatsapp.com/HaKf6ezcwdbGzmH782eBal"
global.community = "https://chat.whatsapp.com/G0kXqsteJFU74yrLtg79o6"
global.channel = "https://whatsapp.com/channel/0029Vb64nWqLo4hb8cuxe23n"
global.github = "https://github.com/The-King-Destroy/YukiBot-MD"
global.gmail = "thekingdestroy507@gmail.com"
global.ch = {
ch1: "120363401404146384@newsletter"
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.APIs = {
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null }
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'settings.js'"))
import(`${file}?update=${Date.now()}`)
})

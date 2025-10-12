import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = "" //Ejemplo: 573243768166

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
"923256941884",
"5492644996684",
"573243768166", 
"923297474483" 
]

global.suittag = ["923297474483"] 
global.prems = ["923297474483"]
global.mods = ["5492644996684"]
//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = "Baileys Multi Device"
global.vs = "^1.0.0 | Latest"
global.nameqr = "⏤͟͟͞͞𝐃𝐑𝐀𝐂𝐔𝐋𝐀𝐔𝐑𝐀 🦇"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.yukiJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.botname = "⏤͟͟͞͞𝐃ℝ𝐀ℂ𝐔𝕃𝐀𝕌𝐑𝔸 🦇"
global.textbot = "ძrᥲᥴᥙᥣᥲᥙrᥲ, mᥲძᥱ ᥕі𝗍һ ᑲᥡ 𝑪𝑯𝑰𝑵𝑰𝑻𝑨 | ᵒᶠᶦᶜᶦᵃˡ"
global.dev = "© ⍴᥆ᥕᥱrᥱძ ᑲᥡ 𝑪𝑯𝑰𝑵𝑰𝑻𝑨 | ᵒᶠᶦᶜᶦᵃˡ"
global.author = "© mᥲძᥱ ᥕі𝗍һ ᑲᥡ 𝑪𝑯𝑰𝑵𝑰𝑻𝑨 | ᵒᶠᶦᶜᶦᵃˡ"
global.etiqueta = "𝑪𝑯𝑰𝑵𝑰𝑻𝑨 | ᵒᶠᶦᶜᶦᵃˡ"
global.currency = "¥enes"
global.banner = "https://files.catbox.moe/gr75lp.mp4"
global.icono = "https://files.catbox.moe/uffo5i.jpg"
global.catalogo = fs.readFileSync('./lib/catalogo.jpg')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.group = "https://whatsapp.com/channel/0029Vb6KW2Y0AgW5RA4QIS1B"
global.community = "https://whatsapp.com/channel/0029Van1PcoFSAt50tWN4d0x"
global.channel = "https://whatsapp.com/channel/0029Vb6GYInD8SDuyzHk3f3l"
global.github = "https://github.com/itts.chinitaaa/Senko-Bot"
global.gmail = "itts.chinitaaa@gmail.com"
global.ch = {
ch1: "120363345778623279@newsletter"
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

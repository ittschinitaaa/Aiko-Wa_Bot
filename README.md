> [!IMPORTANT]
> **Este proyecto está en constante evolución. Estamos comprometidos en ofrecer a nuestra comunidad un Bot increíble. Te invitamos a instalarlo y para estar al tanto de todas las novedades.**

<p align="center"> 
<img src="https://files.catbox.moe/gr75lp.mp4" alt="SakuraBot-MD" style="width: 75%; height: auto; max-width: 100px;">

<p align="center"> 
<a href="#"><img title="SakuraBot-MD" src="https://img.shields.io/badge/¡Disfruta de un Bot totalmente gratuito, con múltiples funciones y de código abierto! -purple?colorA=%239b33b0&colorB=%231c007b&style=for-the-badge"></a> 
</p>

---

## 🪻 Descripción 

`Luna Bot` es un bot de WhatsApp multifuncional basado en `baileys`. Este bot ofrece una variedad de características para mejorar tu experiencia en WhatsApp.

---

## 🪻 Características

- Respuestas automáticas
- Gestión de grupos
- Juegos interactivos
- Integración con APIs externas

---

### **`📌 Click en la imagen para descargar termux`**
<a
href="https://www.mediafire.com/file/wkinzgpb0tdx5qh/com.termux_1022.apk/file"><img src="https://qu.ax/finc.jpg" height="125px"></a> 

### **` Instalación por termux`**
<details>
<summary><b💐✰ Instalación Manual</b></summary>

> *Comandos para instalar de forma manual*
```bash
termux-setup-storage
```
```bash
apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn
```
```bash
git clone https://github.com/ittschinitaaa/Aiko-Bot && cd Aiko-Bot
```
```bash
yarn install
```
```bash
npm install
```
```bash
npm start
```
> *Si aparece **(Y/I/N/O/D/Z) [default=N] ?** use la letra **"y"** y luego **"ENTER"** para continuar con la instalación.*
</details>

<details>
  <summary><b>🍄 Comandos para mantener más tiempo activo el Bot</b></summary>

> *Ejecutar estos comandos dentro de la carpeta Aiko-Bot*
```bash
termux-wake-lock && npm i -g pm2 && pm2 start index.js && pm2 save && pm2 logs 
``` 
#### Opciones Disponibles
> *Esto eliminará todo el historial que hayas establecido con PM2:*
```bash 
pm2 delete index
``` 
> *Si tienes cerrado Termux y quiere ver de nuevo la ejecución use:*
```bash 
pm2 logs 
``` 
> *Si desea detener la ejecución de Termux use:*
```bash 
pm2 stop index
``` 
> *Si desea iniciar de nuevo la ejecución de Termux use:*
```bash 
pm2 start index
```
---- 
### En caso de detenerse
> _Si despues que ya instalastes el bot y termux te salta en blanco, se fue tu internet o reiniciaste tu celular, solo realizaras estos pasos:_
```bash
cd && cd Aiko-Bot && npm start
```
----
### Obtener nuevo código QR 
> *Detén el bot, haz click en el símbolo (ctrl) [default=z] usar la letra "z" + "ENTER" hasta que salga algo verdes similar a: `Aiko-Bot $`*
> **Escribe los siguientes comandos uno x uno :**
```bash 
cd && cd Aiko-Bot && rm -rf sessions/Principal && npm run qr
```
----
### Obtener nuevo código de teléfono 
```bash 
cd && cd Aiko-Bot && rm -rf sessions/Principal && npm run code
```
</details>

<details>
  <summary><b>🌻 Actualizar Aiko-Bot</b></summary>

> **Utiliza esta opción únicamente si deseas actualizar a la última versión de Aiko. Hemos implementado un método ingenioso mediante comandos para realizar la actualización, pero ten en cuenta que al usarla se eliminarán todos los archivos de la versión actual y se reemplazarán con los de la nueva versión. Solo se conservará la base de datos, por lo que será necesario volver a vincular el Bot**  

**Comandos para actualizar Senko-Bot de forma automática**

```bash
grep -q 'bash\|wget' <(dpkg -l) || apt install -y bash wget && wget -O - https://raw.githubusercontent.com/ittschinitaaa/Aiko-Bot/master/termux.sh | bash 
```
**👑 Volverte owner del Bot**

*Si después de instalar el bot e iniciar la sesión (deseas poner tu número es la lista de owner pon este comando:*

```bash
cd && cd Aiko-Bot && nano settings.js
```
#### Para que no pierda su progreso en Senko-abot, estos comandos realizarán un respaldo de su `database.json` y se agregará a la versión más reciente.
> *Estos comandos solo funcionan para TERMUX, REPLIT, LINUX*
</details>

---
### **`🌷 Enlaces útiles`**

<details>
<summary><b> ✰ Contáctos</b></summary>

* WhatsApp: [`Aquí`](https://wa.me/573243768166)
* Correo: [`Aquí`](itts.chinitaaa@gmail.com)
</details>

---


### **`⏤͟͟͞͞Propietaria ★`**
<a
href="https://github.com/ittschinitaaa"><img src="https://github.com/ittschinitaaa.png" width="130" height="130" alt="
𝑪𝑯𝑰𝑵𝑰𝑻𝑨|ᵒᶠᶦᶜᶦᵃˡ"/></a>


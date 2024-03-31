import bot from "@bot-whatsapp/bot";
import flowNombre from "./flowNombre.js";


const copys = [
  {
    texto: "¡Hola !😊 Gracias por escribirnos. ¿Cómo te llamas y cómo te gustaría que te llamemos?  ¡Únete a la Red Ciudadanos en Movimiento en Veracruz! 🍊 #LoNuevoYaViene",
  },
  {
    texto: "¡Buen día!😊  ¿Cuál es tu nombre y cómo prefieres que nos dirijamos a ti?  ¡Construyamos juntos la Red Ciudadanos en Veracruz! 🍊 #LoNuevoYaViene",
  },
  {
    texto: "¡Hola a todos/as!😊  Agradecemos su interés. ¿Cómo te llamas y cómo deseas que te mencionemos?  ¡Súmate a la Red Ciudadanos en Movimiento y hagamos historia en Veracruz! 🍊  #LoNuevoYaViene",
  },
  {
    texto: "¡Saludos!😊   Bienvenido/a a la Red Ciudadanos en Movimiento. ¿Cuál es tu nombre y cómo te gustaría que te llamemos?  ¡Construyamos juntos un Veracruz mejor! 🍊  #LoNuevoYaViene",
  },
  {
    texto: "¡Hola!😊  ¿En qué podemos ayudarte?  ¿Podrías decirnos tu nombre y cómo te gustaría que te llamemos?  ¡Forma parte del cambio que Veracruz necesita! 🍊  #LoNuevoYaViene",
  },
];
function obtenerCopyAleatorio() {
  // Generar un índice aleatorio entre 0 y la longitud del array menos 1
  const indiceAleatorio = Math.floor(Math.random() * (copys.length - 1));

  // Devolver el copy en la posición del índice aleatorio
  return copys[indiceAleatorio];
}

const flowSaludo = bot
    .addKeyword("Hola","hola",{sensitive:false})
    .addAnswer(obtenerCopyAleatorio().texto,
    {capture:false,delay:2000},
    async (ctx, {gotoFlow,provider}) => {
      const notificacion = await provider.getInstance();     
      const telefono = ctx.key.remoteJid;
      await notificacion.sendPresenceUpdate('composing', telefono)
      return await gotoFlow(flowNombre)
    }
    )
    export default flowSaludo





/*       const notificacion = await provider.getInstance();     
      const telefono = ctx.key.remoteJid;
      await notificacion.sendPresenceUpdate('composing', telefono) 
      await state.update({ dato: data[random].dato });
      console.log(data[random].dato,"🍊🧡")

      await notificacion.sendPresenceUpdate('available', telefono) 
 */

/* Update Presence
await sock.sendPresenceUpdate('available', id) 
This lets the person/group with id know whether you're online, offline, typing etc.

presence can be one of the following:

type WAPresence = 'unavailable' | 'available' | 'composing' | 'recording' | 'paused'
The presence expires after about 10 seconds.

Note: In the multi-device version of WhatsApp -- 
if a desktop client is active, WA doesn't send push notifications to the device. If you would like to receive said notifications -- 
mark your Baileys client offline using sock.sendPresenceUpdate('unavailable') */
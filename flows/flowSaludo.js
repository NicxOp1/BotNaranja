import bot from "@bot-whatsapp/bot";
import flowNombre from "./flowNombre.js";

const flowSaludo = bot
    .addKeyword("Hola","hola",{sensitive:false})
    .addAnswer(`¡Hola! 😊 Gracias por escribir a la Red Ciudadanos en Movimiento.\n#LoNuevoYaViene🍊`,
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
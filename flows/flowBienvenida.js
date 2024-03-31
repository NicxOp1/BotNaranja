import bot from "@bot-whatsapp/bot";
import flowAgradecimiento from "./flowAgradecimiento.js";
import flowAgradecimiento24hs from "./flowAgradecimiento24hs.js";

const flowPrincipal = bot
  .addKeyword("bot")
  .addAnswer(`Gracias, queremos escucharte, por favor, elige una opción para continuar:👉

  * 1️⃣ ¿Te interesaría unirte a la comunidad para apoyar en eventos de campaña?  🫂
  * 2️⃣ ¿Te interesa el ser representante de tu casilla o quieres poner una lona en tu casa?🍊
  * 3️⃣ ¿Te interesa crear un grupo de WhatsApp para organizar a tu comunidad?👏🏻 
  * 4️⃣ ¿Quieres hablar con alguien de la Red Ciudadano en Movimiento📞
  
  Para detener la comunicación escribe Cancelar. 
  
  ¡Estoy aquí para ayudarte! 😊`,//  4️⃣🗓️ *Ver turnos disponibles según la fecha*\n //extender el proovedor
    {capture:true, delay : 2000}, 
    async (ctx,{state,gotoFlow,endFlow,flowDynamic,provider})=> {
      const notificacion = await provider.getInstance();
      const telefono = ctx.key.remoteJid;
      await state.update({ Telefono: ctx.from });
      if(parseInt(ctx.body)==1){
        await state.update({ Selec: "ArmarReuniones" });
        await notificacion.sendPresenceUpdate('composing', telefono);
        await gotoFlow(flowAgradecimiento)
      } else if(parseInt(ctx.body)==2){
        await state.update({ Selec: "ReclamarLona" });
        await notificacion.sendPresenceUpdate('composing', telefono);
        await gotoFlow(flowAgradecimiento)
       }else if(parseInt(ctx.body)==3){   
         await state.update({ Selec: "GrupoWhatsapp" });
         await notificacion.sendPresenceUpdate('composing', telefono);
        await gotoFlow(flowAgradecimiento24hs)//flow de crear mi propio grupo
      }else if(parseInt(ctx.body)==4){
        await state.update({ Selec: "ComunicacionDirecta" });
        await notificacion.sendPresenceUpdate('composing', telefono);
        await gotoFlow(flowAgradecimiento24hs)//  flow de sala de prensa
      }else if(ctx.body.toLowerCase()=="cancelar"){
        await notificacion.sendPresenceUpdate('composing', telefono);
        await state.clear();
        return endFlow({body:'👋Nos vemos pronto!, en caso de volver a encenderme escribe *hola*'})
      }else{
        await notificacion.sendPresenceUpdate('composing', telefono);
        await flowDynamic("Lo lamento😔, te has equivocado con el numero ingresado")
        return await gotoFlow(flowPrincipal)
      }
     })
     
     export default flowPrincipal
     
     
     
     
     /*         const telefono= "5491161461034@c.us"//pueden ser un array de numeros
             const mensaje = `el cliente con el numero ${ctx.from} quiere hablar contigo por ${ctx.body} caso `
             const notificacion = await provider.getInstance();      
             await notificacion.sendMessage(telefono,mensaje); */
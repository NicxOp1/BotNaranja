import bot from "@bot-whatsapp/bot";
import flowAgradecimiento from "./flowAgradecimiento.js";
import flowAgradecimiento24hs from "./flowAgradecimiento24hs.js";

const flowPrincipal = bot
  .addKeyword("bot")
  .addAnswer(`Por favor,\nelige una opción para continuar:\n1️⃣📝🍊 *te interesa armar reuniones\no apoyar en eventos de campaña*\n2️⃣❓🍊 *Te interesa el ser representante\nde tu casilla o reclamar una lona*\n3️⃣👏🏻🍊 *Si te interesa crear un grupo de \nWhatsApp para organizar a tu comunidad,\nmarca 3.*\n4️⃣📞🍊 *Si quieres hablar con alguien de\nla Red Ciudadano en Movimiento, marca 4.*\n
  
  Si en algún momento deseas\n
  detener la comunicación con el bot,\n
  simplemente escribe *cancelar*. 
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
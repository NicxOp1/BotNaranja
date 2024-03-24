import bot from "@bot-whatsapp/bot";
import {guardarDataParaComunicar} from "../services/sheets/index.js"

const flowAgradecimiento24hs = bot
.addKeyword('bot')
.addAction(async (ctx, {state,endFlow,provider,flowDynamic }) => {
    const notificacion = await provider.getInstance();
    const telefono = ctx.key.remoteJid;
        const myState = state.getMyState();
        let dato = await guardarDataParaComunicar(
            myState.Telefono,
            myState.Nombre,
            myState.Municipio,
            myState.Seccion,
            myState.Selec,
            myState.Candidato,
      ) 
      console.log("Dato guardado de flowAgradecimiento: ", dato);
      let copy=myState.CopyFederal
      await notificacion.sendPresenceUpdate('composing', telefono);
      if(myState.Selec==="GrupoWhatsapp"){
        await flowDynamic("Gracias por formar parte de la familia naranja. En las próximas 24 horas nos pondremos en contacto contigo para dotarte de las herramientas necesarias para crear y administrar tu grupo de WhatsApp. 🧡 ")
        await state.clear();
        return endFlow({body: copy})
      }else if(myState.Selec==="ComunicacionDirecta"){
        await flowDynamic("Gracias por contactarnos, un operador te contactará en cuanto antes. 🧡 ")
        await state.clear();
        return endFlow({body: copy})
     }
     }
    )
    export default flowAgradecimiento24hs
    
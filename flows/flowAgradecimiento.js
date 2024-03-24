import bot from "@bot-whatsapp/bot";
import {guardarData} from "../services/sheets/index.js"

const flowAgradecimiento = bot
.addKeyword('bot')
.addAction(async (ctx, {state,endFlow ,provider,flowDynamic}) => {
    const notificacion = await provider.getInstance();
    const telefono = ctx.key.remoteJid;
        console.log("llegamos aca")
        const myState = state.getMyState();
        let dato = await guardarData(
            myState.Telefono,
            myState.Nombre,
            myState.Municipio,
            myState.Seccion,
            myState.Selec,
            myState.Candidato
      ) 
      console.log("Dato guardado: ", dato);
      let copy=myState.CopyFederal

      await notificacion.sendPresenceUpdate('composing', telefono);
      if(myState.Selec==="ArmarReuniones"){
        await flowDynamic("Gracias por formar parte de la familia naranja. Pronto nos pondremos en contacto contigo para organizar eventos en conjunto. 🧡 ")
        await state.clear();
        return endFlow({body: copy})
      }else if(myState.Selec==="ReclamarLona"){
        await flowDynamic("Gracias por formar parte de la familia naranja. Pronto nos pondremos en contacto contigo para formar parte de nuestra estructura en defensa del Voto Naranja. 🧡 ")
        await state.clear();
        return endFlow({body: copy})
     }
    }
    )
    export default flowAgradecimiento
    
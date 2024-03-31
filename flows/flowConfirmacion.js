import bot from "@bot-whatsapp/bot";
import flowSeccion from "./flowSeccion.js";
import flowMunicipio from "./flowMunicipio.js";

    const flowConfirmacion = bot
    .addKeyword("bot")
    .addAnswer(("Es ese el municipio que deseas seleccionar? 🍊\n*Si*\n*No*"),
    {capture:true,delay:2000},
        async (ctx, { gotoFlow,flowDynamic,provider }) => {
            if(ctx.body.toLowerCase()=="si"|| ctx.body.toLowerCase()=="sí"){
                const notificacion = await provider.getInstance();
                const telefono = ctx.key.remoteJid;
/*                 await flowDynamic("Estamos cargando tu información, por favor espera un momento... 🍊🧡") */
                await notificacion.sendPresenceUpdate('composing', telefono); 
                return gotoFlow(flowSeccion);
            }else if(ctx.body.toLowerCase()=="no"){
                return gotoFlow(flowMunicipio);
            }else{
                await flowDynamic("Lo lamento😔, te has equivocado con el numero ingresado")
                return gotoFlow(flowConfirmacion);
            }
        }
    );

    export default flowConfirmacion;
    
    
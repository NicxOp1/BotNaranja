import bot from "@bot-whatsapp/bot";
import flowNombre from "./flowNombre.js";

    const flowPrueba = bot
    .addKeyword("asd")
    .addAnswer(("❌ Se ha agotado el tiempo de respuesta, por favor vuelve a intentarlo ❌"),
    {capture:true,delay:1000},
        async (ctx, { gotoFlow }) => {
        console.log("entra")
        startInactividad(ctx, gotoFlow, 10000)
        console.log("pasa")
        return await gotoFlow(flowNombre);
      }
    );

    export default flowPrueba;
    
    
    
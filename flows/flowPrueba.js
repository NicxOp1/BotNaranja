import bot from "@bot-whatsapp/bot";

    const flowPrueba = bot
    .addKeyword("bot")
    .addAnswer(("❌ Se ha agotado el tiempo de respuesta, por favor vuelve a intentarlo ❌"),
    {capture:true,delay:1000},
        async (ctx, { endFlow }) => {
        console.log("entra")
        await state.clear();
        return endFlow();
      }
    );

    export default flowPrueba;
    
    
    
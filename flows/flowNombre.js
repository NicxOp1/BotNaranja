import bot from "@bot-whatsapp/bot";
import flowMunicipio from "./flowMunicipio.js";
import flowPrueba from "./flowPrueba.js";
let error = 0
const validations = [
  {
    condition: (value) => value.length > 50,
    errorMessage: "Ey, el nombre no puede tener más de 50 caracteres.",
  },
  {
    condition: (value) => !/^[a-zA-Z\s]+$/g.test(value),
    errorMessage: "Oops, el nombre solo puede contener letras y espacios.",
  },
];

    const validateInput = (value) => {
      for (const validation of validations) {
        if (validation.condition(value)) {
          return validation.errorMessage;
        }
      }
      return null; // No validation errors
    };

    // TODO ----------------------------------------------------------
    // Objeto para almacenar temporizadores por usuario
    const timers = {};

    const flowNombre = bot
      .addKeyword('bot')
/*       .addAction(async (ctx, {endFlow}) => {
        timers[ctx.from] = setTimeout(() => {
          console.log(`¡Tiempo agotado para el usuario ${ctx.from}!`);
          
          return endFlow({body:"❌ Se ha agotado el tiempo de respuesta, por favor vuelve a intentarlo ❌"});
        }, 1000)
      }) */
      .addAnswer(
        "Cuéntanos ¿Cuál es tu nombre completo? 🍊",
        { capture: true, delay: 2000},
        async (ctx, { state, gotoFlow, provider,flowDynamic }) => {
          const notificacion = await provider.getInstance();
          const telefono = ctx.key.remoteJid; 
          await notificacion.sendPresenceUpdate('composing', telefono);
          const validationError = validateInput(ctx.body);
          if (validationError) {
            await notificacion.sendPresenceUpdate('composing', telefono);
            await flowDynamic(validationError);
            return await gotoFlow(flowNombre);
          }
          await state.update({ Nombre: ctx.body });
          return await gotoFlow(flowMunicipio);
        })

    export default flowNombre;
    
    
    
    
    
    
    
    
    

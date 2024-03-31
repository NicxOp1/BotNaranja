import bot from "@bot-whatsapp/bot";
import flowMunicipio from "./flowMunicipio.js";
import flowPrueba from "./flowPrueba.js";
import { startInactividad } from "./flowInactividad2.js";
let error = 0
const validations = [
  {
    condition: (value) => value.length > 50,
    errorMessage: "Ey, el nombre no puede tener más de 50 caracteres.",
  },
  {
    condition: (value) => !/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜ]+$/g.test(value),
    errorMessage: "Oops, el nombre solo puede contener letras y espacios.",
  },
  {
    condition: (value) => /\d/.test(value),
    errorMessage: "Ups, el nombre no puede contener números.",
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
/*     const timers = {}; */
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
    

    /*       .addKeyword('bot') */
    /*       .addAction(async (ctx, {endFlow}) => {
            timers[ctx.from] = setTimeout(() => {
              console.log(`¡Tiempo agotado para el usuario ${ctx.from}!`);
              
              return endFlow({body:"❌ Se ha agotado el tiempo de respuesta, por favor vuelve a intentarlo ❌"});
            }, 1000)
          }) */
    const flowNombre = bot
      .addKeyword("Hola","hola",{sensitive:false})
      .addAction(async(ctx, {gotoFlow}) => {
        startInactividad(ctx, gotoFlow, 1000);
      }
        )
      .addAnswer(obtenerCopyAleatorio().texto,
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
    
    
    
    
    
    
    
    
    

import bot from '@bot-whatsapp/bot';
// Add the missing import statement for the gotoFlow function
// TODO - ESTE ES EL FLUJO QUE SE ACTIVARÁ SI EL TIEMPO SE CONSUME

const flowInactividad = bot
.addKeyword("bot")
.addAction(async (ctx, { endFlow }) => {
    await state.clear();
    return endFlow({body:"❌ Se ha agotado el tiempo de respuesta, por favor vuelve a intentarlo ❌"});
  }
);
// TODO ----------------------------------------------------------
// Objeto para almacenar temporizadores por usuario
const timers = {};

// Función para iniciar el temporizador
const startInactividad = async (ctx, gotoFlow, tiempo) => {
  timers[ctx.from] = setTimeout(() => {
    console.log(`¡Tiempo agotado para el usuario ${ctx.from}!`);
    return gotoFlow(flowInactividad);
  }, tiempo);
};

// Función para reiniciar el temporizador
const resetInactividad = (ctx, tiempo) => {
  // Si ya hay un temporizador en marcha para el usuario, lo cancelamos
  stopInactividad(ctx);
  if (timers[ctx.from]) {
    console.log(`REINICIAMOS cuenta atrás para el usuario ${ctx.from}!`);
    clearTimeout(timers[ctx.from]);
  }
  // Iniciamos un nuevo temporizador
  startInactividad(ctx, tiempo);
};

// Función para detener el temporizador
const stopInactividad = (ctx) => {
  // Si hay un temporizador en marcha para el usuario, lo cancelamos
  if (timers[ctx.from]) {
    clearTimeout(timers[ctx.from]);
  }
};

export {
  startInactividad,
  resetInactividad,
  stopInactividad,
};

export default flowInactividad;
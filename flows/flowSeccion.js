  import bot from "@bot-whatsapp/bot";
  import { buscarDatoEnSeccion,buscarDatoEnSeccionParaTraer,traerData } from "../services/sheets/index.js";
  import flowBienvenida from "./flowBienvenida.js";

  let error = 0
  function isValidSection(section) {
    // Verifica si 'section' es un número de no más de 4 dígitos y no contiene letras, espacios, acentos o puntuación
    return /^\d{1,4}$/.test(section);
  }

  const flowSeccion = bot
  .addKeyword('bot')
  .addAnswer(
      `¿Cuál es tu sección electoral? 💬 
      Seguramente te interesa apoyar a las y los candidatos de Movimiento Ciudadano. 🍊🧡 
      Para hacerlo es necesario conocer tu sección electoral, esta se encuentra en el anverso de tu credencial para votar, como te mostramos en la foto que ves arriba`
      ,{ capture: true, delay : 2000 , media: "https://i.ibb.co/vmfYXC6/fe1b60c6-062e-4608-8c85-9c2c5f31a914-1-1.jpg"},
      async (ctx, {state,gotoFlow,flowDynamic ,provider}) => {
        const notificacion = await provider.getInstance();
        const telefono = ctx.key.remoteJid;
  /*       await notificacion.sendPresenceUpdate('available', telefono); */
          console.log("entro")    
          let estado=state.getMyState()
          let seccion = ctx.body
           // Usa la función de validación
           if (!isValidSection(seccion)) {
            await notificacion.sendPresenceUpdate('composing', telefono);
            await flowDynamic("Lo siento, pero la sección electoral debe ser un número de no más de 4 dígitos y no debe contener letras, espacios, acentos ni puntuación. Por favor, intenta de nuevo.");
            return await gotoFlow(flowSeccion);
          }

          const resultado= await buscarDatoEnSeccion(seccion,estado.Municipio)
          if (resultado) {
            console.log("entro en buscarDatoEnSeccion")
            await state.update({ Seccion: seccion });
            let info = await traerData(seccion);
            if(info != null){
            console.log(info, "info")
              await state.update({ Link: info[0].Link, Link2: info[0].Link2, Candidato: info[0].Candidato, CopyFederal: info[0].CopyFederal });
              await notificacion.sendPresenceUpdate('composing', telefono);
              await flowDynamic("Aguarda un instante, estamos cargando tu información... 🍊🧡");
              return await gotoFlow(flowBienvenida)//menu
          } else if(info==null){ 
            await notificacion.sendPresenceUpdate('composing', telefono);
            let sugerencias = await buscarDatoEnSeccionParaTraer(estado.Municipio); // Get possible sections based on municipality
          await flowDynamic(`La sección que elegiste no forma parte de tu Municipio, por favor intenta con otra sección. aquí te dejo algunas opciones: ${sugerencias.join(", ")}`);
          return await gotoFlow(flowSeccion);
        }
      }else{
        let sugerencias = await buscarDatoEnSeccionParaTraer(estado.Municipio); // Get possible sections based on municipality
        await notificacion.sendPresenceUpdate('composing', telefono);
        await flowDynamic(`La sección que elegiste no forma parte de tu Municipio, por favor intenta con otra sección. aquí te dejo algunas opciones: ${sugerencias.join(", ")}`);
        return await gotoFlow(flowSeccion);
      }
    })
      export default flowSeccion





    /* POR AHORA NO SE PONE DATO CURIOSO*/
/*       let data = [
    {
      "id": 0,
      "dato": "¿Sabías que el Puerto de Veracruz fue la primera ciudad fundada después del contacto entre América y Europa? Hernán Cortés llegó a Veracruz en 1519 y ahí se asentó por primera vez. 🌎🏝️"
    },
    {
      "id": 1,
      "dato": "¿Sabías que  La Danza de los Voladores de Papantla es una tradición ancestral originaria del estado de Veracruz? Se remonta a tiempos prehispánicos y es una práctica cultural significativa que ha perdurado a lo largo de los siglos y que hoy en día se realiza en todo el país, 💃"
    },
    {
      "id": 2,
      "dato": "¿Sabías que durante el siglo XVII, Veracruz sufrió ataques de piratas? El primer ataque documentado sucedió el 16 de septiembre de 1568 y fue dirigido por el corsarío inglés Sir John Hawkins 🏴‍☠️"
    }
];
  let random = Math.floor(Math.random() * data.length);
  await flowDynamic(`${data[random].dato} 🍊🧡`) */
  
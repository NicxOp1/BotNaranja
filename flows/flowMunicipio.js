import bot from "@bot-whatsapp/bot";
import completion from "../services/openai/chatgpt.js"
import guardarData from "../services/sheets/index.js"
import { GoogleAuth } from "google-auth-library";
import flowSeccion from "./flowSeccion.js";
import levenshtein from "levenshtein";
import flowConfirmacion from "./flowConfirmacion.js";
let error = 0

function encontrarMejorCoincidencia(municipio, municipios) {
  // Convertir el municipio a buscar a minúsculas para comparaciones
  const municipioMinusculas = municipio.toLowerCase();

  // Encontrar la mejor coincidencia
  let mejorCoincidencia = "";
  let mayorDistanciaLevenshtein = 9999; // Valor inicial alto

  for (const nombreMunicipio of municipios) {
    const nombreMinusculas = nombreMunicipio.toLowerCase();

    // Calcular la distancia de Levenshtein entre los dos nombres
    const distanciaLevenshtein = levenshtein(municipioMinusculas, nombreMinusculas);

    // Si la distancia es menor que la actual, actualizar la mejor coincidencia
    if (distanciaLevenshtein < mayorDistanciaLevenshtein) {
      mejorCoincidencia = nombreMunicipio;
      mayorDistanciaLevenshtein = distanciaLevenshtein;
    }
  }

  return mejorCoincidencia;
}

const municipiosVeracruz = ["Acajete",
"Acatlán",
"Acayucan",
"Actopan",
"Acula",
"Acultzingo",
"Agua Dulce",
"Álamo Temapache",
"Alpatláhuac",
"Alto Lucero de Gutiérrez Barrios",
"Altotonga",
"Alvarado",
"Amatitlán",
"Amatlán de los Reyes",
"Angel R. Cabada",
"Apazapan",
"Aquila",
"Astacinga",
"Atlahuilco",
"Atoyac",
"Atzacan",
"Atzalan",
"Ayahualulco",
"Banderilla",
"Benito Juárez",
"Boca del Río",
"Calcahualco",
"Camarón de Tejeda",
"Camerino Z. Mendoza",
"Carlos A. Carrillo",
"Carrillo Puerto",
"Castillo de Teayo",
"Catemaco",
"Cazones de Herrera",
"Cerro Azul",
"Chacaltianguis",
"Chalma",
"Chiconamel",
"Chiconquiaco",
"Chicontepec",
"Chinameca",
"Chinampa de Gorostiza",
"Chocamán",
"Chontla",
"Chumatlán",
"Citlaltépetl",
"Coacoatzintla",
"Coahuitlán",
"Coatepec",
"Coatzacoalcos",
"Coatzintla",
"Coetzala",
"Colipa",
"Comapa",
"Córdoba",
"Cosamaloapan de Carpio",
"Cosautlán de Carvajal",
"Coscomatepec",
"Cosoleacaque",
"Cotaxtla",
"Coxquihui",
"Coyutla",
"Cuichapa",
"Cuitláhuac",
"El Higo",
"Emiliano Zapata",
"Espinal",
"Filomeno Mata",
"Fortín",
"Gutiérrez Zamora",
"Hidalgotitlán",
"Huatusco",
"Huayacocotla",
"Hueyapan de Ocampo",
"Huiloapan de Cuauhtémoc",
"Ignacio de la Llave",
"Ilamatlán",
"Isla",
"Ixcatepec",
"Ixhuacán de los Reyes",
"Ixhuatlán de Madero",
"Ixhuatlán del Café",
"Ixhuatlán del Sureste",
"Ixhuatlancillo",
"Ixmatlahuacan",
"Ixtaczoquitlán",
"Jalacingo",
"Jalcomulco",
"Jáltipan",
"Jamapa",
"Jesús Carranza",
"Jilotepec",
"José Azueta",
"Juan Rodríguez Clara",
"Juchique de Ferrer",
"La Antigua",
"La Perla",
"Landero y Coss",
"Las Choapas",
"Las Minas",
"Las Vigas de Ramírez",
"Lerdo de Tejada",
"Los Reyes",
"Magdalena",
"Maltrata",
"Manlio Fabio Altamirano",
"Mariano Escobedo",
"Martínez de la Torre",
"Mecatlán",
"Mecayapan",
"Medellín de Bravo",
"Miahuatlán",
"Minatitlán",
"Misantla",
"Mixtla de Altamirano",
"Moloacán",
"Nanchital de Lázaro Cárdenas del Río",
"Naolinco",
"Naranjal",
"Naranjos Amatlán",
"Nautla",
"Nogales",
"Oluta",
"Omealca",
"Orizaba",
"Otatitlán",
"Oteapan",
"Ozuluama de Mascareñas",
"Pajapan",
"Pánuco",
"Papantla",
"Paso de Ovejas",
"Paso del Macho",
"Perote",
"Platón Sánchez",
"Playa Vicente",
"Poza Rica de Hidalgo",
"Pueblo Viejo",
"Puente Nacional",
"Rafael Delgado",
"Rafael Lucio",
"Río Blanco",
"Saltabarranca",
"San Andrés Tenejapan",
"San Andrés Tuxtla",
"San Juan Evangelista",
"San Rafael",
"Santiago Sochiapan",
"Santiago Tuxtla",
"Sayula de Alemán",
"Sochiapa",
"Soconusco",
"Soledad Atzompa",
"Soledad de Doblado",
"Soteapan",
"Tamalín",
"Tamiahua",
"Tampico Alto",
"Tancoco",
"Tantima",
"Tantoyuca",
"Tatahuicapan de Juárez",
"Tatatila",
"Tecolutla",
"Tehuipango",
"Tempoal",
"Tenampa",
"Tenochtitlán",
"Teocelo",
"Tepatlaxco",
"Tepetlán",
"Tepetzintla",
"Tequila",
"Texcatepec",
"Texhuacán",
"Texistepec",
"Tezonapa",
"Tierra Blanca",
"Tihuatlán",
"Tlachichilco",
"Tlacojalpan",
"Tlacolulan",
"Tlacotalpan",
"Tlacotepec de Mejía",
"Tlalixcoyan",
"Tlalnelhuayocan",
"Tlaltetela",
"Tlapacoyan",
"Tlaquilpa",
"Tlilapan",
"Tomatlán",
"Tonayán",
"Totutla",
"Tres Valles",
"Tuxpan",
"Tuxtilla",
"Ursulo Galván",
"Uxpanapa",
"Vega de Alatorre",
"Veracruz",
"Villa Aldama",
"Xalapa",
"Xico",
"Xoxocotla",
"Yanga",
"Yecuatla",
"Zacualpan",
"Zaragoza",
"Zentla",
"Zongolica",
"Zontecomatlán de López y Fuentes",
"Zozocolco de Hidalgo"];

const flowMunicipio = bot
    .addKeyword("bot")
    .addAnswer(`Platícanos ¿De qué municipio nos escribes? 🏙️🍊`,
    {capture:true,delay:2000},
      async (ctx, { state, flowDynamic,gotoFlow,provider }) => {
        const notificacion = await provider.getInstance();
        const telefono = ctx.key.remoteJid;
        await notificacion.sendPresenceUpdate('composing', telefono);
        const mejorCoincidencia = encontrarMejorCoincidencia(ctx.body,municipiosVeracruz);
        await flowDynamic(`El municipio que quisiste decir es: ${mejorCoincidencia}?`);
        await state.update({Municipio: mejorCoincidencia});
        return await gotoFlow(flowConfirmacion)
/*         await notificacion.sendPresenceUpdate('composing', telefono);
        await flowDynamic("Estamos cargando tu información, por favor espera un momento... 🍊🧡")
        await notificacion.sendPresenceUpdate('composing', telefono); */
      }
      )




/*         let dato = await guardarData(
          myState.Telefono,
          myState.Nombre,
          myState.Municipio,
        )  *///envia al excel en la hoja 1 x dato
        //************************PROBAR EL BOT COMO VA QUEDANDO */
            //manejo de errores y timeout
        //limpiar el state*******************limpiar el state****************
/*         console.log("Dato guardado: ", dato);
        return endflow({body:"¡Gracias por tu respuesta! 🍊🧡"}) 
         })
        
        */
/*     .addKeyword("si","sí",{sensitive:false,delay:2000})
    .addAction(
      async (ctx, { flowDynamic}) => {
        return await flowDynamic(
          "¡Da clic al enlace para unirte al grupo de WhatsApp de la Red Ciudadano en Movimiento en tu comunidad! 🔗📲")
          //necesito link del grupo de warap

      }
    ) */
/* 
    .addKeyword("no",{sensitive:false,delay:2000})
    .addAction(
      async (ctx, { state, gotoFlow }) => {
        flowDynamic("Ups, creo que tendrás que escribirlo nuevamente 🍊🧡")
        return await gotoFlow(flowMunicipio)
      }) */
export default flowMunicipio
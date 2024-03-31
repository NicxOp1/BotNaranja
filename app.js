import "dotenv/config";
import bot from "@bot-whatsapp/bot";
import QRPortalWeb from "@bot-whatsapp/portal";
import BaileysProvider from "@bot-whatsapp/provider/baileys";
import MockAdapter from "@bot-whatsapp/database/mock";
import flowPrincipal from "./flows/flowBienvenida.js"
import flowMunicipio from "./flows/flowMunicipio.js";
import flowSeccion from "./flows/flowSeccion.js";
import flowNombre from "./flows/flowNombre.js";
import flowAgradecimiento from "./flows/flowAgradecimiento.js"
import flowAgradecimiento24hs from "./flows/flowAgradecimiento24hs.js"
import flowConfirmacion from "./flows/flowConfirmacion.js";
import flowPrueba from "./flows/flowPrueba.js"
/* import flowSaludo from "./flows/flowSaludo.js"; */
import {flowInactividad} from "./flows/flowInactividad2.js";
/*  import flowPrueba from "./flows/flowPrueba.js"; */

const GLOBAL_STATE = [];
export default function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = bot.createFlow([
    flowPrincipal,
    flowMunicipio,
    flowNombre,
    flowSeccion,
    flowAgradecimiento,
    flowAgradecimiento24hs,
    flowConfirmacion,
    flowPrueba,
    flowInactividad, 
    /*     flowSaludo, */
  ]);
  const adapterProvider = bot.createProvider(BaileysProvider);

  bot.createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();

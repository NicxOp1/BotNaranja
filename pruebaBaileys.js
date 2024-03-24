import * as Baileys from '@whiskeysockets/baileys';
import moment from 'moment';
import {consultarTurnos} from './services/sheets/index.js'

const WAConnection = Baileys.WAConnection;

export const checkDates =async ()=> {
  const turnos = await consultarTurnos('5491136763144'); // Reemplaza esto con el número de teléfono que deseas comprobar

  if (turnos.contadorTurnos > 0) {
    const conn = new WAConnection();
    await conn.connect();

    for (let i = 0; i < turnos.turnos.Fecha.length; i++) {
      let fechaTurno = moment(turnos.turnos.Fecha[i], 'DD/MM/YY');
      if (fechaTurno.isAfter(moment())) {
        let message = `Tienes un turno mañana para el servicio de ${turnos.turnos.Servicio[i]} a las ${turnos.turnos.Inicio[i]} hasta las ${turnos.turnos.Finalización[i]}.`;
        let recipient = turnos.turnos.Telefono[i] + '@s.whatsapp.net';

        await conn.sendMessage(recipient, message, 'conversation');
      }
    }
  }
}

checkDates().catch(console.error);

export default checkDates

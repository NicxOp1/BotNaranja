import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import moment from "moment";
import "dotenv/config";

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth);
const rawKey = process.env.PRIVATE_KEY;
const finalKey = rawKey.replace(/\\n/g, "\n");


const CREDENTIALS = {
  type: process.env.TYPE,
  project_id: process.env.PROYECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: finalKey,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};
export const  buscarDatoEnSeccion = async (dato, municipioIngresado) => {
  try {
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo();
    let sheet = doc.sheetsByTitle["Secciones"];
  
    let rows = await sheet.getRows();
    for (let index = 1; index < rows.length; index++) { // Comenzamos en el índice 1 para saltar la primera fila
      const row = rows[index];
      const columnaA = row._rawData[0]; // La columna A es la primera columna, por lo que su índice es 0
      const columnaD = row._rawData[3]; // La columna D es la cuarta columna, por lo que su índice es 3
      
  
      // Convertimos las cadenas a minúsculas y eliminamos los acentos
      const municipioNormalizado = columnaD.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const municipioIngresadoNormalizado = municipioIngresado.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
      if (columnaA === dato && municipioNormalizado === municipioIngresadoNormalizado) {
        console.log(`El dato ${dato} se encontró en la fila ${index + 2}`); // Sumamos 2 al índice porque los índices de los arrays comienzan en 0 y estamos saltando la primera fila
        return true;
      }
    }
    return false; // Si llegamos a este punto, significa que hemos verificado todas las filas y no hemos encontrado una coincidencia
  } catch (error) {
    console.error(
      "Ocurrió un error al buscar el dato en la sección:",
      error
    );
    throw error;
  }
};
export const buscarDatoEnSeccionParaTraer = async (municipioIngresado) => {
  try {
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo();
    let sheet = doc.sheetsByTitle["Secciones"];
    console.log(municipioIngresado, "municipio ingresado ;::SAÑDOSAKDPASOKDPOASKDPOKSA")
    let rows = await sheet.getRows();
    let secciones = [];
    for (let index = 1; index < rows.length; index++) { // Comenzamos en el índice 1 para saltar la primera fila
      const row = rows[index];
      const columnaD = row._rawData[3]; // La columna D es la cuarta columna, por lo que su índice es 3

      // Convertimos las cadenas a minúsculas y eliminamos los acentos
      const municipioNormalizado = columnaD.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const municipioIngresadoNormalizado = municipioIngresado.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      if (municipioNormalizado === municipioIngresadoNormalizado) {
        secciones.push(row._rawData[0]); // Agregamos la sección de la columna A a las secciones
      }
    }
    return secciones;
  } catch (error) {
    console.error(
      "Ocurrió un error al buscar el dato en la sección:",
      error
    );
    throw error;
  }
};  
export const guardarData = async (
  Telefono,
  Nombre,
  Municipio,
  Seccion,
  Selec,
  Candidato
  ) => {
  try {
    console.log(Candidato, "CANDIDATO")
    let votante = {
      Telefono: Telefono,
      Nombre: Nombre,
      Municipio: Municipio,
      Seccion: Seccion,
      Selec: Selec,
      Candidato:Candidato,
    };
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo(); // Asumiendo que 'doc' está definido y representa la hoja de cálculo.
    let sheet = doc.sheetsByTitle["Tabla"];
    await sheet.addRow(votante);
    console.log("Votantes guardados:", votante);
    return votante;
  } catch (error) {
    console.error("Ocurrió un error al consultar los votantes:", error);
    throw error;
  }
};
export const guardarDataParaComunicar = async (
  Telefono,
  Nombre,
  Municipio,
  Seccion,
  Selec,
  Candidato,
  ) => {
  try {
    console.log(Candidato, "CANDIDATO")
    let votante = {
      Telefono: Telefono,
      Nombre: Nombre,
      Municipio: Municipio,
      Seccion: Seccion,
      Selec: Selec,
      Candidato:Candidato,
    };
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo(); // Asumiendo que 'doc' está definido y representa la hoja de cálculo.
    let sheet = doc.sheetsByTitle["TablaComunicar"];
    await sheet.addRow(votante);
    console.log("Votantes guardados:", votante);
    return votante;
  } catch (error) {
    console.error("Ocurrió un error al consultar los votantes:", error);
    throw error;
  }
};
export const traerData = async (dato) => {
  try {
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo();
    let sheet = doc.sheetsByTitle["Secciones"];
    let rows = await sheet.getRows();
    let data = [];
    for (let index = 1; index < rows.length; index++) { // Comenzamos en el índice 1 para saltar la primera fila
      const row = rows[index];
      const columnaA = row._rawData[0]; // La columna A es la primera columna, por lo que su índice es 0
      if (columnaA === dato) {
        let objeto = {
          CopyFederal: row._rawData[4], // Columna E
          Candidato: row._rawData[5], // Columna F
          Link: row._rawData[6], // Columna G
          Link2: row._rawData[7] // Columna H
        };
        data.push(objeto);
      }
    }    
    if (data.length === 0) {
      data = null;
      console.log("no hay nada")
    }
      console.log("Data extraída:", data);
      return data;
  } catch (error) {
    console.error("Ocurrió un error al extraer la data:", error);
    throw error;
  }
};

export default {
  guardarData,
  buscarDatoEnSeccion,
  buscarDatoEnSeccionParaTraer,
  guardarDataParaComunicar,
  traerData,
};


/*     await sheet.setHeaderRow(['Nombre', 'Telefono', 'Municipio', 'Seccion', 'Selec']); */
 /*    let rows = await sheet.getRows();
    for (let index = 1; index < rows.length; index++) {
      const row = rows[index]; */
/*       if (row._rawData[0] != Telefono) { */
/*         votante["Telefono"].push(row._rawData[0]);
        votante["Nombre"].push(row._rawData[1]);
        votante["Municipio"].push(row._rawData[2]);
        votante["Seccion"].push(row._rawData[3]);
        votante["Selec"].push(row._rawData[4]); */
/*       } */
/*     } */
/**
 * Raíz — lista de espera.
 * Recibe los emails que se envían desde la landing y los guarda en la hoja "Lista de espera".
 *
 * Cómo instalarlo: ver la sección "Conectar la lista de espera a Google Sheets" del README.
 */

var NOMBRE_HOJA = 'Lista de espera';
var PATRON_EMAIL = /^[a-z0-9][a-z0-9._%+\-]*@[a-z0-9.\-]+\.[a-z]{2,}$/;

function doPost(e) {
  var parametros = (e && e.parameter) || {};

  // Campo trampa: los humanos no lo ven; si viene completo, es un bot.
  if (parametros.empresa) {
    return responder({ ok: true });
  }

  var email = String(parametros.email || '').trim().toLowerCase();
  if (email.length > 254 || !PATRON_EMAIL.test(email)) {
    return responder({ ok: false, error: 'email_invalido' });
  }

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    return responder({ ok: false, error: 'ocupado' });
  }

  try {
    var hoja = obtenerHoja();
    var yaEsta = hoja.getRange('B:B')
      .createTextFinder(email)
      .matchEntireCell(true)
      .findNext();

    // Si ya estaba anotado respondemos igual, sin revelar quién está en la lista.
    if (!yaEsta) {
      hoja.appendRow([new Date(), email]);
    }
    return responder({ ok: true });
  } catch (err) {
    console.error(err);
    return responder({ ok: false, error: 'error_servidor' });
  } finally {
    lock.releaseLock();
  }
}

// Permite comprobar desde el navegador que la implementación responde.
function doGet() {
  return responder({ ok: true, servicio: 'Raíz — lista de espera' });
}

function obtenerHoja() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName(NOMBRE_HOJA);
  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA);
    hoja.appendRow(['Fecha', 'Email']);
    hoja.setFrozenRows(1);
    hoja.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm');
  }
  return hoja;
}

function responder(datos) {
  return ContentService
    .createTextOutput(JSON.stringify(datos))
    .setMimeType(ContentService.MimeType.JSON);
}

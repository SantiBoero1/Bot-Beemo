function verificarFechas() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Fechas"); // Reemplaza "Nombre de la hoja" con el nombre de tu hoja de cálculo
  var dataRange = sheet.getRange("A2:B8"); // Rango de las columnas de textos y fechas, ajusta según tu configuración
  
  var data = dataRange.getValues();
  var currentDate = new Date();
  
  for (var i = 0; i < data.length; i++) {
    
    var rowText = data[i][0];
    var rowDate = data[i][1];
    var roleId = "822582068549910529"; // Este es el ID que tiene el rol al cual se quiere arrobar en el mensaje por discord

   

    if (rowDate instanceof Date) {
      if (sonTresDiasAntes(rowDate, currentDate)) {
        var fechaFormateada = rowDate.toLocaleDateString("es-ES", { day: "numeric", month: "long" });
        var mensaje = "Buenas! ¿Como estan?" + roleId + " Recuerden que faltan tres días para que se termine " + rowText + " (" + fechaFormateada + ")";
        enviarMensajeDiscord(mensaje);
      } else if (esElMismoDia(rowDate, currentDate)) {
        var fechaFormateada = rowDate.toLocaleDateString("es-ES", { day: "numeric", month: "long" });
        var mensaje = "Buenas! ¿Como estan? " + roleId + " Recuerden que hoy se termina " + rowText + " (" + fechaFormateada + ")";
        enviarMensajeDiscord(mensaje);
      } 
    }
  }
}

function sonTresDiasAntes(date1, date2) {
  var diffInMilliseconds = date1.getTime() - date2.getTime();
  var diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  return diffInDays <= 3 && diffInDays > 0;
}

function esElMismoDia(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

function enviarMensajeDiscord(mensaje) {
  var webhookUrl = "https://discord.com/api/webhooks/1126330525443952740/RsWthgEDr3oefLMfmfWcoQMjBQTwCSvf15Wu24pFClSGOgRhm1gNZKWaire2FL7G5PBJ"; // Reemplaza "URL_DEL_WEBHOOK" con la URL del webhook del canal de Discord donde se quiere mandar el mensaje
  
  var payload = {
    content: mensaje
  };
  
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch(webhookUrl, options);
}
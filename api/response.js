const codes = {
  200: {title: "OK", details: ""},
  250: {title: "Prestación Aprobada", details: ""},
  251: {title: "Prestación Limitada", details: "Monto aprobado inferior al solicitado"},
  // 251: {title: "Venta Solicitada", details: "Esperando confirmación del cliente"},
  252: {title: "Compra Aceptada", details: "Esperando aprobación"},
  253: {title: "Transacción Previamente Aprobada", details: "La transacción fue aprobada en una acción anterior"},
  254: {title: "Usuario Creado Exitosamente", details: ""},
  255: {title: "Compra Reservada", details: "El cliente ha reservado la transacción y se espera su confirmación"},
  400: {title: "Petición Invalida", details: ""},
  401: {title: "Error de Autenticación", details: "Usuario y/o password incorrecto"},
  403: {title: "Petición No Autorizada", details: "No tiene permisos para ejecutar esta acción"},
  404: {title: "Transacción Invalida", details: "Esta compra no existe"},
  450: {title: "Petición Rechazada", details: "El asegurado no cuenta con suficiente cobertura"},
  451: {title: "Petición Rechazada", details: "El contrato se encuentra en mora"},
  // 450: {title: "Transacción Rechazada", details: "Fondos insuficientes"},
  //451: {title: "Transacción Cancelada", details: ""},
  452: {title: "Usuario Conectado", details: "El usuario ya inició sesión con anterioridad"},
  453: {title: "Usuario Desconectado", details: "No se ha establecido sesión o esta ha sido cerrada con anterioridad"},
  454: {title: "Transacción Invalida", details: "Intente nuevamente o comuniquese con un asesor"},
  455: {title: "Acción Incorrecta", details: "La transacción no se encuentra en el estado esperado"},
  500: {title: "Error Interno del Servidor", details: ""},
}

function response(code, data=null, stack=null) {
  return Object.assign(
    { result: code },
    { title, details } = codes[code],
    code === 500
      ? { details: data || '' }
      : { data: data },
    { stack }
  )
}

module.exports = response

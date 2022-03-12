/*
  con Callbacks vamos a generar el codigo necesario para hacer peticiones dentro de un callback,
  y obtener llamados que van a permitir desencadenarse, primero a la API general, despues al
  primer personaje, y al final llamar a la ubicacion que queremos.
  Se necesita instalar la dependencia xmlHttpRequest para trabajar sobre node, permite hacer peticiones a algun servicio en la nube, etc.
  npm install xmlhttprequest --save// se instala como una dependencia de desarollo
*/

let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// no usamos fetch porque este usa promesas, y ahora estamos usando callbacks
// traer data
function fetchData(api_url,callback){
  let xhttp = new XMLHttpRequest();// genera una referencia la obj que necesito
  xhttp.open('GET','api_url',true);// primer referente, metodo de xmlhttprequest. ('peticion-deseada','url-de-data-deseada','true-se maneja de manera asincrona')
  xhttp.onreadystatechange = function(event){// tenemos que escuchar lo que va a generar la conexion de open, si el cambio sucede, ejecutamos una funcion
    // validacion para saber si el estado es satisfactorio

   if (xhttp.readyState === 4){// 4 significa que ha sido completado
    if (xhttp.status === 200){
      /*
        ESTADO 1xx (100 - 199): Indica que la petición esta siendo procesada.
        ESTADO 2xx (200 - 299): Indica que la petición fue recibida, aceptada y procesada correctamente.
        ESTADO 3xx (300 - 399): Indica que hay que tomar acciones adicionales para completar la solicitud. Por lo general indican redireccionamiento.
        ESTADO 4xx (400 - 499): Errores del lado del cliente. Indica se hizo mal la solicitud de datos.
        ESTADO 5xx (500 - 599): Errores del Servidor. Indica que fallo totalmente la ejecución.
      */
     // generalmente callback usa un estandar dentro de node en el que el primer valor que le vamos a pasar es el error, y el segundo es la info que se desencadena, el resultado del llamado a la api
     callback(null, JSON.parse(xhttp.responseText))// como el resultado es un json, debo parsearlo
    }else{
      const error = new Error('Error' + api_url);
      console.log(error);
      return callback(error,null)// primero pasamos el error y despues null porque no estoy mandando ningun resultado que se desencadeno
    }
   }
  }
  xhttp.send();// se envia la solicitud
}



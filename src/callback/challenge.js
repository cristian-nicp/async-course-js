let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;// npm install xmlhttprequest --save
let API = 'https://rickandmortyapi.com/api/character/';// api_url

// no usamos fetch porque este usa promesas, y ahora estamos usando callbacks
// funcion principal, traer data
function fetchData(api_url,callback){
  let xhttp = new XMLHttpRequest();// genera una referencia la obj que necesito
  xhttp.open('GET',api_url,true);// primer referente, metodo de xmlhttprequest. ('peticion-deseada','url-de-data-deseada','true-se maneja de manera asincrona')
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
     console.log(`status code: ${xhttp.status}`);
     // generalmente callback usa un estandar dentro de node en el que el primer valor que le vamos a pasar es el error, y el segundo es la info que se desencadena, el resultado del llamado a la api
     callback(null, JSON.parse(xhttp.responseText))// como el resultado es un json, debo parsearlo
    }else{
      const error = new Error('Error ' + api_url);
      console.log(error);
      return callback(error,null)// primero pasamos el error y despues null porque no estoy mandando ningun resultado que se desencadeno
    }
   }
  }
  xhttp.send();// se envia la solicitud
}

// hacer peticion a la api, obtener cuantos personajes hay, obtener la ubicacion en la que se encuentra ese personaje para despues saber enque dimension se encuentra
// vamos a hacer 3 llamados a la api con callbacks
fetchData(API,function(error1,data1){// api, funcion callback, voy a usar esta funcion varias veces de forma anidada para hacer las 3 peticiones que necesito, por eso error1,data1
    if (error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function (error2,data2){// en caso de que funcione lo anterior, llamo a fetchData again, y paso API, pero quiero el resultado[0] que seria el primer personaje y obtengo su id, luego le paso otro callback
        if (error2) return console.error(error2);// nuevamente tenemos que generar la validacion
        fetchData(data2.origin.url, function(error3,data3){
            if (error3) return console.error(error3);
            //una vez que tengo todo, voy a imprimir esa informacion en la consola para ver que obtuve el primer valor de la primera peticion, el seg y el tercero.
            console.log("count: " + data1.info.count);// 826
            console.log("id: " + data2.id)// 1
            console.log("name: " + data2.name);// Rick Sanchez
            console.log("origin-name: " + data2.origin.name);// earth(c-137)
            console.log("dimension: " + data3.dimension);// c-137
        })// tercer peticion, va a traer el origen de mi personaje, utilizamos otro callback para esta tercer peticion

    })
})


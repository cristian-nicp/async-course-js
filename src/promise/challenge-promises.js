const fetchData = require("../utils/fetchData");// el import antes de ES6
let API = 'https://rickandmortyapi.com/api/character/';// es muy importante el / final

// Tenemos que hacer 3 peticiones para obtener: 
// - count, para ver cuantos personajes hay
// - el llamado del primer elemento, hacia lo que es el nombre del personaje
// - del resutante del personaje, traer la dimension para sacar el nombre de esa dimension a la que pertenece

fetchData(API)
  .then(data => {
    console.log(data.info.count);
    return fetchData(`${API} ${data.results[0].id}`)// return de algo que va a volver a suceder, fetchData, pero ahora con la estructura de mi API, de esta forma, hacemos una peticion de esa estructura. Es muy necesarioponer el .id.; Es como si fuera el url con el slash ej. comida/guarnicion7
  })
  .then(data => {
    console.log(data.name);
    return fetchData(data.origin.url)// nos adentramos en la API
  })// la info que resulta del siguiente llamado
  .then(data => {
    console.log(data.dimension)
  })
  .catch(err => console.error(err));
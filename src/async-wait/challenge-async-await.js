const fetchData = require("../utils/fetchData");
let API = 'https://rickandmortyapi.com/api/character/';

const anotherFunction = async (api_url) => {
  try {
    // trae la primer peticion
    const data = await fetchData(api_url);
    // segunda peticion
    const character = await fetchData(`${API}${data.results[0].id}`)
    // tercer peticion
    const origin = await fetchData(character.origin.url);
    // muestra en consola elresultado de las tres peticiones
    console.log(data.info.count);
    console.log(character.name);
    console.log(origin.dimension);
  } catch {
    console.error(error)
  }
}

console.log("Before");
anotherFunction(API)
console.log("After");
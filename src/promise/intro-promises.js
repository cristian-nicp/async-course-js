/*
  somethingWillHappen lo declaraba como función y retornaba la promesa en lugar de declarar de una vez la promesa en la variable.
  Porque para encapsular la promesa y que no se ejecute hasta que se llame a la función,
  ya que si se declara la promesa directamente en la variable la promesa se ejecutara al cargar la variable.
*/

let somethingWillHappen = () => {
  return new Promise((resolve,reject) => {
    if (true){
      resolve("THIS IS TRUE RESOLVED");// en ternario serie:  true ? resolve("THIS IS TRUE RESOLVED") : reject("THIS IS FALSE, REJECTED")
    }else{
      reject("THIS IS FALSE REJECTED");
    }
  })
};

somethingWillHappen()
  .then(response => console.log(response," NICE :)"))// response va a ser lo que está dentro de resolve o reject dependiendo de cual haya sido el resultado de la promesa
  .catch(response => console.log(response," BAD :("))

let somethingWillHappen2 = () => {
  return new  Promise((resolve,reject) => {
    if (true){
      setTimeout(() => {resolve('true')},3000)
    }else{
      const error = new Error("whoops error, ");
      reject(error + "false");
    }
  })
}

somethingWillHappen2()
  .then(response => console.log(response))
  .then(console.log("soy un .then() encadenado je"))
  .catch(response => console.log(response))

// correr varias promesas al mismo tiempo o encadenadas
Promise.all([somethingWillHappen(),somethingWillHappen2()])
  .then(response => {
    console.log("array de resultados", response);
  })
  .catch(err => {
    console.log(err);
  })
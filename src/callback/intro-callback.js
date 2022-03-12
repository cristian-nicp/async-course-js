function sum(num1,num2){
  return num1 + num2;
}

function calc(num1,num2,callback){// callback seria sinonimo de sum
  // por estandar se pone callback
  return callback(num1,num2)
}

console.log(calc(10,6,sum));// cuando se llama a la funcion sin los () es un callback, de lo contrario sum() es algo que se ejecuta sincrono, al instante

// vamos a trabajar con tiempos
function dateFunction(callback){
  console.log("funcion date1: " + new Date);// se ejecuta al instante
  setTimeout(function(){
    let date = new Date;
    callback(date)// se ejecuta luego de 3s.- callback es un sinonimo de printDate
  },3000)
}

// funcion que va a imprimir los valores de date
function printDate(dateNow){
  console.log("funcion printDate " + dateNow)
}

dateFunction(printDate);
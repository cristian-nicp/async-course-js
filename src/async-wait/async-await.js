function makeRequest(location){
  return new Promise((resolve,reject) => {
    console.log(`Making request to ${location}...`)
    if (location === 'google'){
      resolve('Google says HI')
    }else{
      reject('We can only talk to Google')
    }
  })
}

function processRequest(response){
  return new Promise((resolve,reject) => {
    console.log('Processing Response...');
    resolve(`Extra information ${response}`)
  })
}

// With promise .then(), promise chains
// -------------------------------------
// makeRequest('google')
//   .then(response => {
//     console.log('Response Received')
//     return processRequest(response)
//   })
//   .then(processedResponse => {
//     console.log(processedResponse)
//   })
//   .catch(err => {
//     console.log(err)
//   })

async function doWork(){
  try{
    const response = await makeRequest('google');
    const processedResponse = await processRequest(response);
    console.log('Response Received');
    console.log(processedResponse);
  }catch{
    console.log('You can only make request to Google')
  }
}
doWork()

// if succesful
// ------------
// Making request to google...
// Processing Response...
// Response Received
// Extra information Google says HI

// if failed
// ---------
// Making request to facebook...
// You can only make request to Google

// WEBDEVSIMPLIFIED example
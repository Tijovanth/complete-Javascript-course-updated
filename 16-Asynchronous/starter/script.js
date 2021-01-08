'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/**
 * Async code vs Sync code
 * In sync code program execution will block sometime for some reason eg: alert function "Once the user clicks the ok button then only next line will get execute"
 * In async code program execution will not block for any reason eg: settime out function "set time out function will after given time in between js code will get excuted"
 */

///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest
/**
 * old way to make ajax call "XMLHttpRequest"
 * we need to create XMLHttpRequest object and set url , request method and all
 * after that that ajax will get execute in async way once response came js will trigger load event and we are listening that load event so it will execute that call back function
 * But if we want to two or more ajax call it will execute parallely so order of the response will change every reload.
 * if we want to execute ajax call one by one then we have to create ajax chaining(ajax call inside ajax call) but it will lead to call back hell
 */
const renderCoutry = function(data,className = ''){
    data.forEach(function(country){
        const html = `<article class="country ${className}">
        <img class="country__img" src="${country.flag}" />
        <div class="country__data">
          <h3 class="country__name">${country.name}</h3>
          <h4 class="country__region">${country.region}</h4>
          <p class="country__row"><span>👫</span>${country.population > 1000000 ? (+country.population / 1000000).toFixed(1) : country.population}</p>
          <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
        </div>
      </article>`
      countriesContainer.insertAdjacentHTML('beforeend',html);
    })
}
const renderError = function(err){
    countriesContainer.insertAdjacentHTML('beforeend',err);
}

const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
  };


// const getCountry = function(country){
// let request = new XMLHttpRequest();
// request.open('GET',`https://restcountries.eu/rest/v2/name/${country}`);
// request.send();
// request.addEventListener('load',function(){
//     const data = JSON.parse(request.responseText);
//     console.log(data);
//     renderCoutry(data);
//     const neighbour = data[1].borders[0];
//     request = new XMLHttpRequest();
//     request.open('GET',`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
//     request.send();
//     request.addEventListener('load',function(){
//         const data1 = JSON.parse(request.responseText);
//         console.log(data1)
//         renderCoutry([data1],'neighbour');
//     })
// })
// }

// getCountry('India');

///////////////////////////////////////

/**
 * What is promises?
 * Promises is a place holder object for an asynchoronous task that is running in back ground
 * Promises life cycle 1. Promises will be in pending state in that state asynchoronous task is still running in background, once it done promises will settle in settled state. There are two types of settled states one is fullfiled state and other is rejected state. Fullfiled states means success and rejected state means something in async task.
 * We are using promises using fetch API. First fetch will return promises
 */

// Consuming Promises

// const getCountryUsingPromises = function(country){
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(response => {console.log(response);return response.json()}).then(data => renderCoutry(data));// fetch immediately return promises object in pending state after sometime it will become settled state. Then is the method we can handle response in promises in that we have to pass call back function. In our example first call back function getting response object as an paramter. In that we have response header, response body, etc. But we can't directly read that response body because it will be like readable stream. So we have to call json method every response object will contain this method. That also we will return promises so we have to handle that in another then method.
// }
// getCountryUsingPromises('India');

//Chaining promises
/**
 * Then method always return promises
 * If you return explicitily in then method then that will become fullfilled promises
 */
// const getCountrydata = function(country){
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`).
//     then(response => response.json())
//     .then(data => {
//         console.log(data);
//         renderCoutry(data);
//         const neighbour = data[1].borders[0];
//         return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
//     })
//     .then(response => response.json())
//     .then(data => {
//         renderCoutry([data],'neighbour');
//     });
// }

//Handling Rejection
/**
 * In then method the second parameter for handling rejection 
 * But we can use catch function that is available in promise object 
 * In promise chain if error happened in anywhere it will go to catch function
 * fetch api settled in rejection state only in network disconnected scenario so if any other error like 404 will not catch by catch function
 * finally will always execute in both success and rejection state
 */
// const getCountrydata = function(country){
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`).
//     then(response => response.json())
//     .then(data => {
//         console.log(data);
//         renderCoutry(data);
//         const neighbour = data[1].borders[0];
//         return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
//     })
//     .then(response => response.json())
//     .then(data => {
//         renderCoutry([data],'neighbour');
//     })
//     .catch(err => renderError(err))
//     .finally(() => countriesContainer.style.opacity = 1);
// }
// btn.addEventListener('click',function(e){
//     getCountrydata('India');
// })

// Throwing Errors Manually


// Coding Challenge - 1
// const whereIam = function(lat,log){
//     const reverseGeocoding = fetch(`https://geocode.xyz/${lat},${log}?geoit=json`)
//     .then(res => {
//         if(!res.ok) throw new Error("Something happened in reverseGeoCoding Api")
//         return res.json();
//     }).then(res => {
//         console.log(res);
//         console.log(`You are in ${res.country}, ${res.city}`);
//         return fetch(`https://restcountries.eu/rest/v2/name/${res.country}`)
//     }).then(res => {
//         if(!res.ok) throw new Error("Coutry cannot be found");
//         return res.json();
//     }).then(data => renderCoutry([data[0]]))
//     .catch(err => console.error(`${err.message} 💥`))
//     .finally(() => countriesContainer.style.opacity = 1 );
// }

// whereIam('52.508', '13.381');

//EventLoop
/**
 * In js every async task will execute in web api's environment not in call stack
 * like event handlers, timers are async tasks first it will load image or fetching the data from third party service in web api's environment
 * once the event trigger in js, call backs that are attached in event listerners or timers will put in call back queue, call back queue is like array
 * once all execution context is finished then it will take the call backs from call back queue in call stack and it will execute
 * but promises act differently, call backs attached in promises will put in micro tasks queue and this queue is having priority then callback queue
 * call backs in arrays is not a async code
 */

 // Event Loop in practice
//  console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });

// console.log('Test end');

// Build our own promises
/**
 * We can build our own promises using Promise constructor we should pass one executor funtion with parameter of resolve and reject and inside that function we can handle resolve and reject
 * Promise ifself is not async behaviour inside promise function everything run in synchornous way only. once promise return we are handling that in then or catch that call back function will put in micro task queue
 * Promise itself is not run in web api environment. inside promise if we are using any web api that will run in web api environment
 */
// console.log('start');
// const lotteryTicket = new Promise(function(resolve,reject){
//     console.log('inside promise');
//     if(Math.random() > 0.5){
//         // Web Api
//         setTimeout(() =>{
//             console.log('inside if');
//             resolve("You Win");
//         },5000)
//     }
//     else{
//         // Web Api
//         setTimeout(() =>{
//             console.log('inside else');
//             resolve("You Lost");
//         },5000)
//     }
//     console.log('last statement of promise function');
// })
// console.log('end');

// lotteryTicket.then(res => console.log(res)).catch(err => console.log(err))

// Promisifying setTimeout
// const wait = function(seconds){
//     return new Promise(function(resolve,reject){
//         setTimeout(resolve,seconds * 1000) ; 
//     })
// }

// wait(1).then(res => {
//     console.log('2 seconds passed');
//     return wait(1);
// }).then(res => {
//     console.log('3 seconds passed');
//     return wait(1);
// }).then(res => {
//     console.log('4 seconds passed');
//     return wait(1);
// })

//Promisifying geolocation api
//navigator.geolocation.getCurrentPosition(pos => console.log(pos), err => console.log(err));
const getGeolocationPosition = function(){
    return new Promise(function(resolve,reject){
        navigator.geolocation.getCurrentPosition(resolve,reject);
    })
} 
// getGeolocationPosition().then(res => console.log(res)).catch(err => console.log(err));


// const whereIam = function(){
//     getGeolocationPosition()
//     .then(pos => {
//         const {latitude : lat, longitude : log} = pos.coords;
//         const reverseGeocoding = fetch(`https://geocode.xyz/${lat},${log}?geoit=json`)
//         return reverseGeocoding;
//     })
//     .then(res => {
//         if(!res.ok) throw new Error("Something happened in reverseGeoCoding Api")
//         return res.json();
//     }).then(res => {
//         console.log(res);
//         console.log(`You are in ${res.country}, ${res.city}`);
//         return fetch(`https://restcountries.eu/rest/v2/name/${res.country}`)
//     }).then(res => {
//         if(!res.ok) throw new Error("Coutry cannot be found");
//         return res.json();
//     }).then(data => renderCoutry([data[0]]))
//     .catch(err => console.error(`${err.message} 💥`))
//     .finally(() => countriesContainer.style.opacity = 1 );
// }

// whereIam();

//Coding Challenge - 2

// const imageContainer = document.querySelector('.images');

// const wait = function(seconds){
//     return new Promise(function(resolve, reject){
//         setTimeout(resolve,seconds * 1000);
//     })
// }

// const createImage = function(imagePath){
//     return new Promise(function(resolve,reject){
//         const image = document.createElement('img')
//         image.src = imagePath;
//         image.addEventListener('load',function(e){
//             imageContainer.appendChild(image);
//             resolve(image);
//         })
//         image.addEventListener('error',function(e){
//             reject(new Error("Image cannot be found"));
//         })
//     })
// }

// let currentImage;

// createImage('img/img-1.jpg')
// .then(res => {
//     currentImage = res;
//     console.log("Image 1 Loaded");
//     return wait(2);
// })
// .then(res => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg')
// })
// .then(res => {
//     currentImage = res;
//     console.log("Image 2 loaded");
//     return wait(2);
// })
// .catch(err => {
//     console.error(err);
// })

///////////////////////////////////////
// Consuming Promises with Async/Await
// Error Handling in Async/Await

// const whereIam = async function (){
//     try{
//     const currentPosition = await getGeolocationPosition();
//     const {latitude : lat, longitude : log} = currentPosition.coords;
//     const reverseGeoCoding = await fetch(`https://geocode.xyz/${lat},${log}?geoit=json`);
//     if(!reverseGeoCoding.ok) throw new Error("Something happened in GeoCoding")
//     const data = await reverseGeoCoding.json();
//     const countryData = await fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
//     if(!countryData.ok) throw new Error("Something happened in GettingCountryData")
//     const data2 = await countryData.json();
//     renderCoutry([data2[0]])
//     countriesContainer.style.opacity = 1
//     }catch(err){
//         renderError(`${err.message}`);
//     }
// }

// whereIam();

///////////////////////////////////////
// Returning Values from Async/Await
// const whereIam = async function (){
//     try{
//     const currentPosition = await getGeolocationPosition();
//     const {latitude : lat, longitude : log} = currentPosition.coords;
//     const reverseGeoCoding = await fetch(`https://geocode.xyz/${lat},${log}?geoit=json`);
//     if(!reverseGeoCoding.ok) throw new Error("Something happened in GeoCoding")
//     const data = await reverseGeoCoding.json();
//     const countryData = await fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
//     if(!countryData.ok) throw new Error("Something happened in GettingCountryData")
//     const data2 = await countryData.json();
//     renderCoutry([data2[1]])
//     countriesContainer.style.opacity = 1
//     return `You are in ${data2[1].name}`;
//     }catch(err){
//         renderError(`${err.message}`);
//         countriesContainer.style.opacity = 1
//         return err;
//     }
// };

// we are mixing new async await with old promises because we can use await keyword only inside async function 
//whereIam().then(res => console.log(res)).catch(err => console.err(err));
// but we have another solution using iife
// (async function(){
//     const result = await whereIam();
//     console.log(result);
// })();

///////////////////////////////////////
// Running Promises in Parallel
//Promise.all function will get array of values and it will load all fetch in promises in parallel and it will return array of result values incase any one promise will get reject then whole promise will get reject
const get3Countries = async function (c1, c2, c3) {
    try {
      // const [data1] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c1}`
      // );
      // const [data2] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c2}`
      // );
      // const [data3] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c3}`
      // );
      // console.log([data1.capital, data2.capital, data3.capital]);
  
      const data = await Promise.all([
        getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
      ]);
      console.log(data.map(d => d[0].capital));
    } catch (err) {
      console.error(err);
    }
  };
  get3Countries('portugal', 'canada', 'tanzania');

  // Promise.race
  //Promise.race will run all promise which one will finish first that result only we will get, incase reject happened that one we will get
  (async function () {
    const res = await Promise.race([
      getJSON(`https://restcountries.eu/rest/v2/name/italy`),
      getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
      getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
    ]);
    console.log(res[0]);
  })();
  
  const timeout = function (sec) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error('Request took too long!'));
      }, sec * 1000);
    });
  };

  Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
    timeout(0)
  ]).then(res => console.log(res[0])).catch(err => console.log(err))











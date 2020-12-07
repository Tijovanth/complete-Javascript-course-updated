'use strict';

//Default Parameter
// we can use parameter that is defined in before for dynamically generating parameter
// we can't skip parameter but we can do one trick 
// const bookings = [];

// function createBooking(flightName, num = 1,price = 90 * num){
//     const booking = {
//         flightName,
//         num,
//         price
//     }
//     bookings.push(booking);
// }
// //createBooking("LH13",5);
// //console.log(bookings);
// //createBooking("LH14",undefined,40);

// ///////////////////////////////////////
// // How Passing Arguments Works: Values vs. Reference

// const flightName = "LH13";
// const tijo = {
//     "name" : "tijovanth",
//     "passport" : 2345678
// }

// const checkIn = function(flightNum, passenger){
//     flightNum = "HJ12";
//     passenger.name = 'Mr. '+ passenger.name;
//     passenger.passport === 2345678 ? alert("Checked IN") : alert("Wrong Passport");
// }

// //checkIn(flightName,tijo);
// //console.log(flightName);
// //console.log(tijo);

// const newPassport = function (person) {
//     person.passport = Math.trunc(Math.random() * 100000000000);
//   };

//   //newPassport(tijo);
//   //checkIn(flightName,tijo);

//   //First class Function
//   // In js we can have a function as a value because function is also a object so we can have a object as a value so we can have function also
//   // First call Function is a concept that programming language may or may not have

//   //Higher Order Function
//   // Because of first class function we can achieve higher order function 
//   // Higher Order function is when one function accept or return a function then it is called higher order function.
  
//   // function accepting function as a parameter
//   const oneWord = function(str){
//      return str.replace(/ /g,'').toLowerCase();
//   }

//   const firstUpper = function(str){
//       const [first,...others] = str.split(' ');
//       console.log(first,others);
//       return [first.toUpperCase(),...others].join(' ');
//   }

//   const transformString = function(str, fn){
//       console.log(` Before Transformation ${str}`);
//       console.log(` After Transformation ${fn(str)}`);
//       console.log(` fn name is ${fn.name}`);
//   }

// //   transformString('tijovanth is a good boy',firstUpper);
// //   transformString('tijovanth is a good boy',oneWord);

// // function return another function

// const greet = function(greeting){
//     return function(name){
//         return ` ${greeting} ${name}`;
//     }
// }

// // console.log(greet("Hello")("tijo"));

// const arrowGreet = greeting => name => `${greeting} ${name} `;
    


// // console.log(arrowGreet("Hello")("kamesh"));

// // call  and apply methods 
// // In js we can tell function explicity to which object that this keyword should be pointed out

// const lufthansa = {
//         airline : "Lufthansa",
//         iataCode : "LH",
//         bookings : [],
//         book(flightName, name){
//         console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightName}`);
//         this.bookings.push({flight : `${this.iataCode}${flightName}`,name});
//     }
// }

// const swiss = {
//     airline : "Swiss",
//     iataCode : "Sw",
//     bookings : [],
// }

// // Does not work
// //swiss?.book?.call(lufthansa,"Becho","Tijo");
// // lufthansa?.book?.call(swiss,"Becho","Tijo");
// // const flightBookingDetails = ["Seiss","Kamesh"];
// // lufthansa?.book?.call(lufthansa,...flightBookingDetails);
// // console.log(lufthansa);
// // console.log(swiss);


// //Bind Methods
// // It is used for partial application that means bind function will return new function and it will preset the parameters but call and apply will call that method
// const lufthanseBooking = lufthansa.book.bind(lufthansa);
// const swissBooking = lufthansa.book.bind(swiss);
// lufthanseBooking("Becho","Tijo");

// //With Event Listerners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };

// // Does not work because in event listener this keyword always points to that html element
// //document.querySelector("body > button.buy").addEventListener('click',lufthansa.buyPlane);

// document.querySelector("body > button.buy").addEventListener('click',lufthansa.buyPlane.bind(lufthansa));

// // Preseting the parameter
// const lufthansaMacho = lufthansa.book.bind(lufthansa,"Macho");
// lufthansaMacho("ajay");

// const addTax = (rate,value) =>  value + value * rate;
// const addVat = addTax.bind(null,0.23);
// console.log(addVat(100));
// console.log(addVat(30));

// //without using bind with using Higher Order Function
// function addTax1 (rate){
//     return function(value){
//         return value + value * rate;
//     };
// };

// console.log(addTax1(0.23)(100));

//Coding challenge - 1
// const poll = {
//     question: 'What is your favourite programming language?',
//     options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//     // This generates [0, 0, 0, 0]. More in the next section 😃
//     answers: new Array(4).fill(0),
//     registeredAnswer(){
//         const answer = prompt(`${this.question}\n${this.options.join('\n')}`)
//         answer > -1 && answer < 4 ? this.answers[answer]++ : console.log(`wrong option`);
//         this.displayResults('string')
//     },
//     displayResults(type = 'array'){
//         if(type === 'string')
//          console.log(`Poll results are ${this.answers}.`)
//         else
//          console.log(this.answers);
//     }
// }

// document.querySelector('.poll').addEventListener('click',poll.registeredAnswer.bind(poll));

// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

//IIEF
// It is a pattern not a feature
// It is followed for data astraction
// (function display(){
//     console.log("Hi Iam tijo");
// })();

// (() => console.log("Iam in arrow"))();

//In ES6 block also create scope 
// scopes are used to hide data

//Closures


//Coding Challenge - 2
// (function () {
//     const header = document.querySelector('h1');
//     header.style.color = 'red';
//     document.querySelector('body').addEventListener('click',function(){
//         header.style.color = 'blue';
//     })
// })();
// Why this is happening is we are creating a callback function in the iief in that call back function we are using outer scope variable.
// once the iief is executed when the click event is happening that call back function is called in that header is still available.














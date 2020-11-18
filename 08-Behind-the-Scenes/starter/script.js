'use strict';
// function calAge(birthYear) {
//   const age = 2020 - birthYear;
//   function printAge() {
//     let output = `${firstName}, you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1986 && birthYear <= 2000) {
//       var millenial = true;
//       output = 'NEW OUTPUT!';
//       const firstName = 'Steven';
//       function add(a, b) {
//         return a + b;
//       }
//       const str = `Oh, you are millienal, ${firstName}`;
//       console.log(str);
//     }
//     //console.log(add(2, 3));
//     console.log(output);
//     console.log(millenial);
//   }
//   printAge();
//   return age;
// }
// const firstName = `tijo`;
// calAge(1998);

///////////////////////////////////////
// Hoisting and TDZ in Practice

// console.log(firstname);
//console.log(job);
//console.log(age);

// display();
// //display2();
// //display3();

// var firstname = 'tijo';
// let job = 'developer';
// const age = 21;

// function display() {
//   console.log('This is a display Function declaration');
// }

// let display2 = function () {
//   console.log('This is a function expression of display 2 function');
// };

// const display3 = () => console.log(1 + 2);

// // Real time Example of why in most cases we should not use var
// console.log(undefined);
// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted!');
// }

// In non-strict mode we can use variable without declaring. It will add to window object. But is not true in strict mode it will throw an error
//x = 12;
//z = 13;

//This keyword for normal Function
//1.For  Function declaration and function expression this keyword refers to window object in sloppy mode but in strict mode this refers to undefined
//2.For global scope this keyword refers to window object both in sloppy mode and strict mode
//3.For methods this refers to who calls that method
// console.log(this);
// function calAge(birthYear) {
//   console.log(this);
//   return 2020 - birthYear;
// }

// calAge(1998);

// var tijo = {
//   firstName: 'tijo',
//   lastName: 'vanth',
//   display: function () {
//     console.log(`${this.firstName}${this.lastName}`);
//   },
// };

// tijo.display();

// var someone = {
//   firstName: 'ali',
//   lastName: 'khan',
// };
// someone.display = tijo.display;
// someone.display();

// //this keyword in arrow function
// //1. For arrow function this refers to its parents scope that is called lexical scope
// // In this example this refers to parent scope that is global object
// var mom = {
//   firstName: 'Shantha',
//   lastName: 'latha',
//   displayMomName: () => console.log(`${this.firstName}${this.lastName}`),
// };
// mom.displayMomName();

// //when should not use arrow function
// // if we use var for creating variable in global scope it will add that variable as a property in windows object
// // if at that time if arrow function parent scope is globel then it will create some problem
// var firstName = 'Someone';
// var dad = {
//   firstName: 'Ranga',
//   displayDadName: () => console.log(`${this.firstName}`),
//   Solution: function () {
//     console.log(`${this.firstName}`);
//   },
// };
// dad.displayDadName();
// dad.Solution();

// When can we use arrow function
// in function inside method. That function this key refers to undefined when you are in strict mode.
// so it will create some problem
// so we can use arrow function for that as i said earlier arrow don't have specific this keyword so it refers its parent scope
var tijo = {
  firstName: 'tijo',
  year: 1998,
  calAge: function () {
    console.log(2020 - this.year);
    function isMillenial() {
      if (this.year >= 1986 && this.year <= 1999) {
        console.log(`${this.firstName} ya you are millenial`);
      } else {
        console.log(`you are not`);
      }
    }
    // const isMillenial = () => {
    //   if (this.year >= 1986 && this.year <= 1999) {
    //     console.log(`${this.firstName} ya you are millenial`);
    //   } else {
    //     console.log(`you are not`);
    //   }
    // };
    isMillenial();
  },
};

// tijo.calAge();

// arguments keyword
// for arrow function arguments keyword is not available
const add = function (a, b) {
  console.log(arguments);
  console.log(arguments[0] + arguments[2]);
};
//add(1, 2, 3, 4);

const sub = (a, b) => {
  console.log(arguments);
};
//sub();
///////////////////////////////////////
// Primitives vs. Objects in Practice
//Primitives
let age = 30;
let oldAge = age;
age = 31;
// console.log(age);
// console.log(oldAge);
//Reference
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
// console.log('Before marriage:', jessica);
// console.log('After marriage: ', marriedJessica);
//marriedJessica = {};

// Copying objects
// Object.assign will do shallow copy so first level of properties will be preserved
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log('Before marriage:', jessica2);
console.log('After marriage: ', jessicaCopy);

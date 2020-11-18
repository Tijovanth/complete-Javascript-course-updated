'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starerIndex, mainIndex, mainIndex1) {
    return [
      this.starterMenu[starerIndex],
      this.mainMenu[mainIndex],
      this.mainMenu[mainIndex1],
    ];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 1,
    time = '20:30',
    address,
  }) {
    console.log(
      this.starterMenu[starterIndex],
      this.mainMenu[mainIndex],
      time,
      address
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

///////////////////////////////////////
// Destructuring Arrays
// let arr = [1, 2];
// let [x, y] = arr;
// console.log(x, y);

// //Skipping values
// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// //Swaping Values
// [secondary, main] = [main, secondary];
// console.log(main, secondary);

// //Receive more than one value from function
// let [starter, Main, Main1] = restaurant.order(2, 1, 2);
// console.log(starter, Main, Main1);

// //Nester destructing
// let nested = [1, 2, 3, [4, 5]];
// let [one, , three, [four, five]] = nested;
// console.log(one, three, four, five);

// //Default Values
// let arr1 = [1, 2];
// let [p, , r = 1] = arr1;
// console.log(p, r);

///////////////////////////////////////
// Destructuring Objects

// Default Values
// let {
//   name,
//   location: a = 1,
//   categories: b = 2,
//   openingHours: c = 3,
// } = restaurant;
// console.log(name, a, b, c);

// // Mutating Values
// let x = 12;
// let y = 13;
// const obj = { x: 23, y: 7, z: 14 };
// ({ x = 1, y = 2 } = obj);
// console.log(x, y);

// //Nested Objects
// const {
//   fri: { open: op = 1, close: cl = 2 },
// } = c;
// console.log(op, cl);

// // Passing object has an function parameter and their receiving destructing is happening
// const order = {
//   address: '172/83',
// };
// restaurant.orderDelivery(order);

///////////////////////////////////////
// The Spread Operator (...)

const arr = [1, 2, 3];
const newarr = [...arr, 4, 5];
console.log(...newarr);

// Copy array
const arr1 = [12, 2, 3, 4, 5];
const arr2 = [...arr1];
arr1[0] = 1;
console.log(arr1, arr2);

//join 2 arrays
const arr3 = [...arr1, ...arr2];
console.log(arr3);

// Iterables: arrays, strings, maps, sets. NOT objects but after es2018 we can use spread operator in objects also
const str = 'tijovanth';
console.log(...str);

// using spread operator for function arguments
const ingrediants = ['pepper', 'macroni', 'salt'];
restaurant.orderPasta(...ingrediants);

//using objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

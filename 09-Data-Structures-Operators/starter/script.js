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

//Nester destructing
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

// const arr = [1, 2, 3];
// const newarr = [...arr, 4, 5];
// console.log(...newarr);

// Copy array
// const arr1 = [12, 2, 3, 4, 5];
// const arr2 = [...arr1];
// arr1[0] = 1;
// console.log(arr1, arr2);

//join 2 arrays
// const arr3 = [...arr1, ...arr2];
// console.log(arr3);

// Iterables: arrays, strings, maps, sets. NOT objects but after es2018 we can use spread operator in objects also
// const str = 'tijovanth';
// console.log(...str);

// using spread operator for function arguments
// const ingrediants = ['pepper', 'macroni', 'salt'];
// restaurant.orderPasta(...ingrediants);

//using objects
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);
// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

//SPREAD because it is on right. REST because it is on left.
// const [a,b,...others] = [1,2,3,4,5];
// console.log(a,b,others);

// const [pizza,,Risotto,...otherFoods] = [...restaurant.mainMenu,...restaurant.starterMenu];
// console.log(pizza,Risotto,otherFoods);

//Using in Objects
// const {fri,...restofthedays} = restaurant.openingHours;
// console.log(restofthedays);

//Using in Functions
function add(...numbers){
  let sum = 0;
  for(let i = 0; i < numbers.length; i++)
    sum += numbers[i];
  console.log(sum);
} 

// add(1,2);
// add(1,2,3);
// const x = [1,2,1,2];
// add(...x);

//Short Circuiting (&& and ||)
// console.log('---- OR ----');
// // Use ANY data type, return ANY data type, short-circuiting
// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// restaurant.numGuests = 0;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log('---- AND ----');
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// console.log('Hello' && 23 && null && 'jonas');

// // Practical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// for of loop
const menu = [...restaurant.mainMenu,...restaurant.starterMenu];
// for(let item of menu)
//  console.log(item);

//  for(let item of menu.entries())
//   console.log(item);

 // console.log(menu.entries());

// for(let [index,item] of menu.entries())
//    console.log(index,item);

//Optional Chaining
//Objects
// console.log(restaurant?.openingHours?.mon?.open);
// console.log(restaurant?.categories?.[0]);

// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for(const day of days){
//   console.log(restaurant?.openingHours[day]?.open ?? `We closed on ${day}`);
// }

// //Methods
// restaurant?.orderPasta?.('pepper','salt','chillypowder');
// console.log(restaurant?.tijo?.() ?? 'Method does not exist');

// //Arrays
// const users = [{name:'tijovanth',email:'tijo@gmail.com'}];
// console.log(users?.[0]?.name);

///////////////////////////////////////
// Looping Objects: Object Keys, Values, and Entries

//Object.keys will return only keys as a array
// const [...variables] = Object.keys(restaurant.openingHours);
// console.log(...variables);

//Object.values will return only values as Array
// console.log(...Object.values(restaurant.openingHours));

//Object.entries will return both as an array. first index is key and second index is value
// console.log(...Object.entries(restaurant.openingHours));

//SETS
//Set will have one only unique values:
// const orderSet = new Set([1,true,null,undefined,"tijo","tijo"]);
// console.log(orderSet);
// console.log(orderSet.size);
// console.log(orderSet.has("tijo"),orderSet.has("vath"));
// console.log(orderSet.add("vanth"));
// console.log(orderSet.delete("vanth"))
// //console.log(orderSet.clear());

// const friends = [...new Set(["tijovanth","kama","tijovanth"])];
// console.log(friends);

///////////////////////////////////////
// Maps: Fundamentals
// In map if key is same value and same type then it will override to new value
// If we want to set array, object, function and set as key in map make sure same object should be set as key
// At the time of retrivement key should be same data type
// In Map this keyword will not refer to that map itself instead it refers to global in nonstrict mode
const rest = new Map();
rest.set("name","tijovanth")
rest.set(21,"age");
rest.set(true,"he is a man")
rest.set(false,"he is not she");

// const newMap = new Map();
// newMap.set(21,"age")
// .set(21,22);
// console.log(newMap);

// console.log(rest.get(21));

// const map = new Map();
// map.set("name","tijo")
// map.set('a', function() { console.log('Hello') });
// let fuc = function(){};
// map.set(fuc, 'Hi');
 
// map.get('a')();
// console.log(map.get(fuc));
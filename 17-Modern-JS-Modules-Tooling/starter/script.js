// importing Module 
//import { addToCart } from './shoppingCart.js'
// import * from './shoppingCart.js'
//import * as ShoppingCart from './shoppingCart.js';

/**
 * ------- Some points for import and export module ---------
 * 1. In Module top level variables are always private we can't access outside of the module
 * 2. Module will always be executed in strict mode
 * 3. Import statements are always hoisted
 * 4. We have two types of import and export one is named import and export and other one is default import and export
 * 5. Import statements are always should be has a top level statement it should not inside any if block or function
 * 6. We can change the name what we are importing or exporting in both import and export statement
 * 7. Both import and export statement have live connection that means what we are exporting in one module same we are importing in another module that two have line if we change one thing using import variable same will reflect in export module
 * 8. We can use any number of different import statement for same module
 * 9. First Exporting module will parsed and execute first and after that only importing module will get parsed and execute
 * 10. There can be only one default export per module.
 */
// console.log('Importing Module');
// addToCart("bread",5);

// ShoppingCart.addToCart("bread",5);
// console.log(ShoppingCart.totalPrice);
// console.log(ShoppingCart.tq);

import add, {cart} from './shoppingCart.js';
add("bread",5);
console.log(cart);

////////////////////////////
// Introduction to NPM

//import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';
const state = {
    cart: [
      { product: 'bread', quantity: 5 },
      { product: 'pizza', quantity: 5 },
    ],
    user: { loggedIn: true },
  };

const state2 = Object.assign({},state);
const stateUsingCloneDeep = cloneDeep(state);

state.user.loggedIn = false;
console.log(state2);
console.log(stateUsingCloneDeep);

if(module.hot){
  module.hot.accept()
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

//Polyfilling es6 features like promises, new array methods etc
import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polifilling async functions
import 'regenerator-runtime/runtime';
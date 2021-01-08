'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements,sort = false){
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements.slice();
  movs.forEach(function(mov,index,arr){
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
    <div class="movements__value">${mov} €</div>
  </div>`
  containerMovements.insertAdjacentHTML('afterbegin',html);
  })
}

const calcDisplayBalance = function(account){
  account.balance = account.movements.reduce((acc,mov,i,arr) => acc + mov,0);
  labelBalance.textContent = `${account.balance} €`;
}

const calcDisplaySummary = function(account){
  labelSumIn.textContent = account.movements.filter((mov) => mov >= 0)
  .reduce((acc,mov) => acc+= mov) + '€'

  labelSumOut.textContent = account.movements.filter((mov) => mov < 0)
  .reduce((acc,mov) => acc+= Math.abs(mov),0)  + '€'

  labelSumInterest.textContent =  account.movements.filter((mov) => mov >= 0)
  .map(deposit => (deposit * account.interestRate)/100)
  .filter(interest => interest >= 1)
  .reduce((acc,mov) => acc += mov) + '€';
}

const createUserName = function(accs){
  accs.forEach(function(acc){
    acc.userName = acc.owner.toLowerCase().split(' ').map((name) => name[0]).join('');
  })
}
createUserName(accounts);

let currentUser;
btnLogin.addEventListener('click',function(e){
  //Preventing form from submitting
  e.preventDefault()
  //take username and password
  currentUser = accounts.find(acc => acc.userName === inputLoginUsername.value);
  // check username and password
  if(currentUser?.pin === Number(inputLoginPin.value)){
    //Display Welcome message
    labelWelcome.textContent = `Welcome ${currentUser.owner.split(' ')[0]}`;
    updateUI();
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  }
})

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if(amount && amount >= 0 && receiverAcc && currentUser.balance >= amount && receiverAcc.userName !== currentUser.userName){
    receiverAcc.movements.push(amount);
    currentUser.movements.push(-amount);
    updateUI();
  }
})

function updateUI(){
  //Display Balance
  calcDisplayBalance(currentUser)
    //Display Movements
    displayMovements(currentUser.movements);
    //Display Summary
    calcDisplaySummary(currentUser);
}

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentUser.userName && Number(inputClosePin.value) === currentUser.pin){
      const index = accounts.findIndex(acc => acc.userName === inputCloseUsername.value)
      accounts.splice(index,1);
      containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
})

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount > 0 && movements.some(mov => mov >= amount * 0.1)){
    currentUser.movements.push(amount);
    updateUI();
  }
  inputLoanAmount.value = '';
})

let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentUser.movements,!sorted);
  sorted = !sorted;
})




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//Simple Array Methods
let arr = ['a', 'b', 'c', 'd', 'e'];
//SLICE
/*
1.It will return new array
2.first parameter is from where it is going to cut the array
3.second parameter is the point till it will cut the array and that index is excluded
4.both parameter takes negative index. it will consider from the last
5.It will not mutate the original array
*/
// console.log(arr.slice());
// console.log(arr.slice(2));
// console.log(arr.slice(2,-1));

//SPLICE
/*
1.It will return new array
2.It will mutate the original array
3.second parameter is how many number it should delete
*/ 
// const arr2 = arr.splice(2);
// console.log(arr2);
// console.log(arr.splice(0,2));
// console.log(arr);

// REVERSE
/*
1.It will mutate the original array
2.It will return the new array
*/
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// const arr3 = arr2.reverse();
// console.log(arr2,arr3);

//CONCAT
/*
It will not mutate the original array
 */
// const arr2 = ['j', 'i', 'h', 'g', 'f']
// const letters = arr.concat(arr2);
// console.log(letters,arr,arr2);

//JOIN
//It will return string
//It will not mutate the original array
// console.log(arr.join("^"));

///////////////////////////////////////
// Looping Arrays: forEach
/**
 * We should pass callback function that will execute for each iteration
 * We cannot break or skip the loop inbetween
 * first paramter is current element, second is index and third is entire array
 * inside call back function we can push or pop the array but when popping the array it will reduce the iteration while push it will not increase the iteration
 */
// movements.forEach(function(mov,index,movements){
//   // if(mov > 0){
//   //   console.log(`Movement ${index + 1} : You deposited ${mov}`);
//   // }else{
//   //   console.log(`Movement ${index + 1} : You Withdraw ${mov}`);
//   // }
//   movements.pop();
//   console.log(mov);
// })

///////////////////////////////////////
// forEach With Maps and Sets
// Map

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// Set
/**
 * for set both first and second is same
 */
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

//Coding Challenge - 1
// const checkDogs = function(dogsJulie,dogsKate){
//   let correctedJuileDogs = [...dogsJulie];
//   correctedJuileDogs.splice(0,1);
//   correctedJuileDogs.splice(-2);
//   dogsKate = dogsKate.concat(correctedJuileDogs);
//   dogsKate.forEach(function(age){
//     age >= 3 ? console.log(`Adult`) : console.log(`Puppy`);
//   })
// }

// checkDogs([3, 5, 2, 12, 7],[4, 1, 15, 8, 3]);

/////////////////////////////////////////
// The map Method
// Same as for each method but it will brand new array
// So it will not create any sideeffects for that array
const eurToUsd = 1.1;

const movementsUSD = movements.map(function(mov){
    return mov * eurToUsd;
})
// console.log(movementsUSD);
// console.log(movements);

//Samething using for for of loop
const movementsarr = [];
for(const mov of movements){
  movementsarr.push(mov * eurToUsd);
}
// console.log(movementsarr);

//Samething using arrow function
const movementsarrow = movements.map((mov) => mov * eurToUsd);
// console.log(movementsarrow);

const movementsDescription = movements.map((mov,index) =>
  `Movement ${index + 1} : ${mov < 0 ? `You Withdrew` : `You Deposited`} ${Math.abs(mov)}.`
)
// console.log(movementsDescription);

// const suma = movements.map((mov) => movements.push(mov))
// console.log(movements);
// console.log(suma);

////////////////////////////
//Filter Method
// const withdrew = movements.filter((mov) => mov < 0);
// console.log(withdrew);

///////////////////////////
//Reduce Method
// First parameter is accumulator
// It will return one single value

// const Minimum = movements.reduce((acc,mov) => {
//   if(acc <= mov)
//     return acc;
//   else
//     return mov;
// },movements[0])
// console.log(Minimum);

//Coding Challenge - 2

// const calcAverageHumanAge = function(dogsAge){
//   const humanAges = dogsAge.map((age) => age <= 2 ?  2 * age :  16 + age * 4)
//   const adults = humanAges.filter((age) => age >= 18);
//   const average = adults.reduce((acc,age) => {
//     acc += age;
//     return acc;
//   },0)
//   console.log(average/adults.length);
// }

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

//Coding Challenge - 3

// const calcAverageHumanAge = function(dogsAge){
//   const average = dogsAge.map(age => age <= 2 ?  2 * age :  16 + age * 4).
//   filter((age,i,arr) => {
//     return age >= 18}).
//   reduce((acc,age,i,arr) => acc + age / arr.length,0); 
//   console.log(average);
// }

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

//////////////////////////////
// find Method
// It is similar to filter method but the difference is find method will return first element that satisfies condition
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// let acc = undefined;
// for(let account of accounts){
//   if(account.owner ==='Jessica Davis'){
//     acc = account;
//     break;
//   }
// }
// console.log(acc);

//////////////////////////////
// some Method

//////////////////////////////
// every Method


//////////////////////////////
// flat Method

//////////////////////////////
// flatMap Method









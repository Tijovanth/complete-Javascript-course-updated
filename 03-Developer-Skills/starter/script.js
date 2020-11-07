// Remember, we're gonna use strict mode in all scripts now!
'use strict';
const calcAge = birthYear => 2020 - birthYear;
console.log(12);
console.log('tijovanth');

function multiply(a, b) {
  return a * b;
}
const result = multiply(1, 2);
console.log(result);

//Coding Challenge

var printForecast = function (arr) {
  let result = '...';
  for (let i = 0; i < arr.length; i++) {
    result += `${arr[i]}ºC in ${i + 1} days ... `;
  }
  return result;
};

console.log(printForecast([17, 21, 23]));
console.log(printForecast([12, 5, -5, 0, 4]));

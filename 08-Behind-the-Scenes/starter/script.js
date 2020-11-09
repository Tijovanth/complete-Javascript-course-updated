'use strict';
function calAge(birthYear) {
  const age = 2020 - birthYear;
  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1986 && birthYear <= 2000) {
      var millenial = true;
      output = 'NEW OUTPUT!';
      const firstName = 'Steven';
      function add(a, b) {
        return a + b;
      }
      const str = `Oh, you are millienal, ${firstName}`;
      console.log(str);
    }
    //console.log(add(2, 3));
    console.log(output);
    console.log(millenial);
  }
  printAge();
  return age;
}
const firstName = `tijo`;
calAge(1998);

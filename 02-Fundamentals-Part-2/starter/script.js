//'use strict';
const interface = "tijovanth";


const yearsUntilRetirement = (firstName,birthYear) => {
    const age = 2020 -birthYear;
    const retirement = 59 - age;
    return `Name is ${firstName} and his retirement is ${retirement}`;
}

console.log(yearsUntilRetirement("tijo",1998));

///////////////////////////////////////
// Object Methods

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,
    calcAge : function(){
        this.age = 2020 - this.birthYear;
        return this.age;
    },
    getSummary : function(){
        return `${this.firstName} is  a ${this.calcAge()} old ${this.job} and he has ${this.hasDriversLicense ? 'a' : 'no'} driving license`;
    }
}

console.log(jonas.getSummary());

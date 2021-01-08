'use strict';
///////////////////////////////////////
// Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;
  
    // Never to this!
    // this.calcAge = function () {
    //   console.log(2037 - this.birthYear);
    // };
};
  
const jonas = new Person('Jonas', 1991);
// console.log(jonas);
  
  // 1. New {} is created
  // 2. function is called, this = {}
  // 3. {} linked to prototype
  // 4. function automatically return {}
  
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
  
// console.log(jonas instanceof Person);
  
///////////////////////////////////////
// Prototypes
/**
 * If one method is common for all inherited objects then we should not create that method in object itself. we can set that method in prototype
 */
// console.log(Person.prototype);
Person.prototype.calcAge = function(){
 console.log(2037 - this.birthYear);
}

// jack.calcAge();
// matilda.calcAge();

// console.log(jonas.__proto__);
//Person.prototype is not a prototype of person indeed it is a prototype of objects which is created by Person Constructor function
// console.log(jonas.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

// We can also set properties in prototype object
Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species);

//Jonas Object does not contain hasOwnProperty so it will move upwards and in there person object is also not contain that method so it will move upwards again in there Object.Prototype is contain hasOwnProperty so it will use that
// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('species'));

///////////////////////////////////////
// Prototype Inheritance and Prototype chain
/**
 * Person.Prototype is an Object, that is not a prototype of person object but all the objects that are created through person object
 * Person.Prototype.constructor has a reference to person object itself in prototype object
 * Whenever we are creating object through function contructor , a new empty object is created and then this keyword is set for newly created object. The new object is linked to contructor function prototype through "--proto__" property
 * New Object is returned from function constructor
 * One object is created through function constructor that object is linked to prototype of function constructor and whenever we are calling method by using newly created object first it will check in that object itself if it is not found then it will move upwards to prototype object and  if it is found then it will execute and basically all objects have this prototype chain because in js every object is created via Object.constructor function and it has Object.prototype
 * Whenever we are using curly braces for creating object internally Object constructor function is being called.
 */

///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects
/**
 * Every Objects Arrays Functions also objects in js so that also have prototype. In that prototype object we have lot of methods that we used so far so because of that prototype chain every array objects functions we are created can be used those methods
 */
// console.log(jonas.__proto__);
// // Object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// console.log(arr.__proto__.__proto__);

// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.dir(h1);
// console.dir(x => x + 1); 

///////////////////////////////////////
// ES6 Classes
/**
 * Like Functions we have class declarations and class expression
 * Whatever method we are adding inside class block it will directly add it into prototype object 
 * 1. Classes are NOT hoisted
 * 2. Classes are first-class citizes
 * 3. Classes are executed in strict mode
 */

///////////////////////////////////////
// Setters and Getters
/**
 * We can use getter and setters in js 
 * any one enough that means its not mandatory if getter is present setter should present
 * if we want to set any property value but that need some calculations then getter and setter will be very useful
 * if we are accessing already existing property in getter and setter then it will throw maximum call stack exceed error because "this.firstname = name" whenever this code is getting executed automatically set method will be called for that property if it is exist.
 * so we can create new property in setter or getter
 */

 class PersonCl{
     constructor(firstName,birthYear){
         this.firstName = firstName;
         this.birthYear = birthYear;
     }
     // Instance methods
    // Methods will be added to .prototype property
     calcAge(){
        console.log(2037 - this.birthYear);
     }

     greet(){
         console.log('Hey tijo');
     }

     get firstName(){
         return this._firstName;
     }
     
     set firstName(name){
        this._firstName = name;
     }

     //Static methods
     static hey(){
        console.log("hey tijo");
     }
 }

 PersonCl.prototype.greet = function(){
    console.log(`Hey ${this.firstName}`);
 }

 const jessica = new PersonCl('jessica',1998);
//  console.log(jessica);
//  jessica.calcAge();
//  jessica.greet();
//  console.log(jessica._firstName);
//  PersonCl.hey();
 // jessica.hey(); hey function is not available in jessica object


///////////////////////////////////////
// Object.create
/**
 * It will create new Object and set its prototype what object we passed in parameter
 * If we passed null then it will create fully empty object with no prototype link
 */

// const PersonProto = {
//     calcAge(){
//         console.log(2020 - this.birthYear);
//     },
//     init(firstName,birthYear){
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     }
// }

// const tijo = Object.create(PersonProto);
// tijo.init('tijo',1998);
// tijo.calcAge();

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const Animal = function(name,age){
    this.name = name;
    this.age = age;
}

Animal.prototype.eat = function(){
    console.log(this.name + " is eating");
}

// const Dog = function(name,age,type){
//     Animal.call(this,name,age);
//     this.type = type;
// }

// Dog.prototype = Object.create(Animal.prototype);
// Dog.prototype.constructor = Dog;
// Dog.prototype.bark = function(){
//     console.log(this.name + " is barking");
// }

// const jonny = new Dog("Jonny",9,"BullDog");
// jonny.bark();
// jonny.eat();

// console.log(jonny);
// console.log(jonny.__proto__);
// console.log(jonny.__proto__.__proto__)

// console.log(jonny instanceof Animal);
// console.log(jonny instanceof Dog);
// console.log(jonny instanceof Object);

///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

class StudentCl extends PersonCl{
    constructor(firstName,birthYear,course){
        super(firstName,birthYear)
        this.course = course
    }
    calcAge(){
        console.log(2020 - this.birthYear);
    }
}

const tijo_1 = new StudentCl('Tijo',1998,'Computer');
// tijo_1.calcAge();
// tijo_1.greet();


// Inteheritance between Function constructor and ES6 classes also possible
// class Student extends Animal{
//     constructor(name,age,course){
//         super(name,age);
//         this.course = course;
//     }
//     sleeping(){
//         console.log(this.name + ' is sleeping');
//     }
// }

// const tijo_1 = new Student("tijo",22,'computer');
// tijo_1.eat();
// tijo_1.sleeping();

///////////////////////////////////////
// Inheritance Between "Classes": Object.create

const PersonProto = {
    calcAge() {
      console.log(2037 - this.birthYear);
    },
  
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };
  
  const steven = Object.create(PersonProto);
  
  const StudentProto = Object.create(PersonProto);
  StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
  };
  
  StudentProto.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  };
  
  const jay = Object.create(StudentProto);
  jay.init('Jay', 2010, 'Compuetr Science');
  jay.introduce();
  jay.calcAge();


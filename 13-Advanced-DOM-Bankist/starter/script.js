'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav__link = document.querySelector('.nav__links');
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const openModal = function (e) {
  // href = "#" will make page jump to top
  // submit will make the page reload. it is a default behaviour
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scrolling
////////////////////////////////
btnScrollTo.addEventListener('click',function(e){
  section1.scrollIntoView({ behavior: 'smooth' });
})

// Page Navigation
////////////////////////////////
//Event Delegation
/**
 * Event Delegation is basically we are setting event handlers in common elements we are focusing on and in bubbling phase that event handler will get execute. By target we can find out in which place the event is getting triggered  
 */

nav__link.addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior : 'smooth'});
  }
})

///////////////////////////////////////
// Tabbed component

tabContainer.addEventListener('click',function(e){
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  if(!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

// Passing "argument" into handler
 const hoverHandler = function(e){
  if(e.target.classList.contains('nav__link')){
    const siblings = e.target.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');
    siblings.forEach((el) => {
      if (el !== e.target) el.style.opacity = this
    });
    logo.style.opacity = this
  }
 }

 //better way to pass arguments in event Handlers
 // event handler function can take only one argument
 nav.addEventListener('mouseover',hoverHandler.bind(0.5));
 nav.addEventListener('mouseout',hoverHandler.bind(1));

 //old way to pass agruments in event handlers
//  nav.addEventListener('mouseover',function(e){
//   hoverHandler(e,0.5);
//  });
//  nav.addEventListener('mouseout',function(e){
//   hoverHandler(e,1);
//  });


// Sticky Navigation with IntersectionObserverApi
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries){
  
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
const observer = new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin : `-${navHeight}px`
});
observer.observe(header);

 // Sticky Navigation in an old school way

//  const intialBoundry = section1.getBoundingClientRect();
//  window.addEventListener('scroll',function(e){
//   if(window.scrollY > intialBoundry.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky');
//  })

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');
const sectionObserver = function(entries,observer){
  const[entry] = entries;
  if(!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target);
}
const allSectionObserver = new IntersectionObserver(sectionObserver,{
  root:null,
  threshold:0.15
});
allSections.forEach((section) => {
  allSectionObserver.observe(section);
  section.classList.add('section--hidden');
})

////////////////////////////////
//Lazy Loading Images

const lazyLoadingImages = document.querySelectorAll('img[data-src]');
const lazyLoading = function(entries,observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target);
}
const imageObserver = new IntersectionObserver(lazyLoading,{
  root : null,
  threshold : 0,
  rootMargin : '200px'
});
lazyLoadingImages.forEach(img => imageObserver.observe(img));

////////////////////////////////
// Slider
const slider = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
let maxSlide = slider.length;

// Functions
const createDots = function(){
  slider.forEach((s,i) => {
      dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
  })
}

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

const goToSlide = function(currentSlide){slider.forEach((slide,i) => {
  slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`
})}

const nextSlide = function(){
  if(currentSlide === maxSlide - 1){
    currentSlide = 0;
  }else{
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
}

const preSlide = function(){
  if(currentSlide === 0){
    currentSlide = maxSlide - 1;
  }else{
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
}

const keyArrowFunction = function(){
  document.addEventListener('keydown',function(e){
    e.preventDefault();
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && preSlide();
  })
}

createDots();
activateDot(0);
goToSlide(0);
keyArrowFunction();

//Event Handlers
btnRight.addEventListener('click',nextSlide)    
btnLeft.addEventListener('click',preSlide)  


dotContainer.addEventListener('click',function(e){
  e.preventDefault();
  const {slide} = e.target.dataset;
  activateDot(slide);
  goToSlide(slide);
})








////////////////////////////////
////////////////////////////////
////////////////////////////////
// //Selecing Elements
// console.log(document.documentElement); //It will return html document
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header'); // It will return first html element that matches the given selector
// const allSections = document.querySelectorAll('.section'); // It will return all html element that matches the given selector
// console.log(allSections);

// console.log(document.getElementById('section--1'));

// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// // Difference Between Node List and Html Collection is
// // Html Collection will get updated if elements is changed for example now allButtons have 9 buttons if we delete one button then allButtons will become 8 buttons rather NodeList does not change like that

// console.log(document.getElementsByClassName('btn'));


// // Creating and Inserting Elements
// const message = document.createElement('div'); // It will create one Html Element and return that
// message.classList.add('cookie-message');
// //message.textContent = `We use Cookie `;
// message.innerHTML = `We use Cookie <button class="btn btn--close-cookie">Got it</button>`
// //message.textContent = `We use Cookie `;
// //header.prepend(message); // It will add given element as the first child
// header.append(message);// It will add given element as the last child 
// //header.prepend(message.cloneNode(true))// We cannot insert one element in multiple places in dom because all dom objects are unique but we can achieve that by using clone Node method. and if we pass true all child elements will get cloned
// //header.before(message); // It will add given element before this element as a sibling
// //header.after(message);// It will add given element after this element as a sibling

// // Deleting Elements
// // message.addEventListener('click', function(){
// //   message.remove();
// // })


// //Styles
// // we can set styles for the element in js.
// // it will set the style as a inline style
// // we can read inline style but not external style
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.color);
// console.log(message.style.width);

// // for accessing external css we can use getComputedStyle
// console.log(getComputedStyle(message).height);
// console.log(getComputedStyle(message).color);

// //In css CSS Property is available. We can set property by using setProperty method
// document.documentElement.style.setProperty('--color-primary','red');

// //Attributes
// const logo = document.querySelector('.nav__logo');
// //these are standard attributes in html so we can access those properties directly
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// // but for non stardard properties we can't directly access those properties
// console.log(logo.author);
// // but we can accesss those properties in js by using getAttributes
// console.log(logo.getAttribute('author'));
// // we can set properties by using set attribute
// logo.setAttribute('company','Bankist');

// //difference between these two is 
// console.log(logo.src);// it will give absolute url
// console.log(logo.getAttribute('src')); // It will give relative url

// //Data Attributes
// // for getting data attributes we have to use dataset object because all data attributes are stored in dataset object 
// console.log(logo.dataset.versionNumber);

// //Class Attributes
// // we can add or remove any number of class and it will not override existing class
// // logo.classList.add();
// // logo.classList.remove();
// // logo.classList.toggle();
// // logo.classList.contains();

// //Don't use this
// // because we can only set one class and it will override existing classes
// logo.className 

//getBoundingClientRect
/**
 * It will DomRect Object
 * It will contains the details of height, width, top, left, right, bottom, x ,y 
 * It will take measurement from the current viewport
 * width and height includes padding and border width not only content height and width
 */

 //window.pageXandYOffset
 /**
  * it will returns the x and y coordinates like how much you scroll vertically and horizontally
  */

// const btnScroll = document.querySelector('.btn--scroll-to')

// const section1Records = document.querySelector('#section--1')

// console.log(section1Records.getBoundingClientRect());

// console.log("Current Scroll x and y " + window.pageXOffset,window.pageYOffset);

// console.log(
//   'height/width viewport',
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );


//Scrolling

// btnScroll.addEventListener('click',function(e){
//   //   window.scrollTo({
//   //   left: section1Records.getBoundingClientRect().left + window.pageXOffset,
//   //   top: section1Records.getBoundingClientRect().top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });
//   section1Records.scrollIntoView({ behavior: 'smooth' }); // behaviour defines the transition animation
//   //section1Records.scrollIntoView(); default value is true which is it will scroll up to top of the element
//    //section1Records.scrollIntoView(false); // it will scroll up to bottom of the element
//   //section1Records.scrollIntoView({block: "center"}); // block defines the vertical allignment default is start
//   // section1Records.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"}); // inline defines the horizontal alignment default is nearest
// })

///////////////////////////////////////
// Types of Events and Event Handlers
/**
 * In three ways we can handle events one is addEvent Listener second is for every we have onEventMethod and third is we can have events specified in html document
 * don't use the third way it is very old school way
 * difference between add event handler and onEvent method is we can add any number of events for same element by using addEventListerner but by OnEvent we can have only one event for one element and it will override the previous element
 */
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

//EventPropagation
/**
 * In Js event is always happening whether we are listening that event or not
 * Event is always started from document and it propagetes that event to every parent element of element that event is attatched this phase is called capturing pharse
 * Once event is reached to eventhandler it will execute that call back function this phase execution phase
 * After that event bubbles through every parent element this phase is called bubbling phasae
 * In Bubbling phase if same event handled in any parent element then that call back function also gets executed
 * By default in Bubbling phase only parents elements events will get execute but we can change that to capture phase by giving third parameter as true in add event listener method
 */
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget); //Event.target is represent where the event is happened
//   console.log(e.currentTarget === this);// Event.currentTarget is represent on which element event handler function is handled

//   // Stop propagation  
//   // e.stopPropagation();  It will stop the propagation
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
//   //e.stopPropagation();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

//Dom Traversing Methods
// const h1 = document.querySelector('h1');
// Going downwards: child
/**
 * query selector and query selector all will go deeper in dom tree
 */
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // It returns Node list and it returns all forms of nodes example text, comment etc
// console.log(h1.children); // It returns only elements in html collection
// h1.firstElementChild.style.color = 'white'; //It returns first child element
// h1.lastElementChild.style.color = 'orangered';//It returns last child element

// Going upwards: parents
// console.log(h1.parentNode); // It returns direct parent node. It may Element node, a Document node, or a DocumentFragment
// console.log(h1.parentElement); // It returns direct parent element

// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // It can go upper how far the dom tree is it is exactly opposite behaviour of query selector

// h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

//IntersectionObserver Api
/**
 * 
 */
// const obsCallback = function(entries,observer){
//   entries.forEach( entry => console.log(entry))
// }
// const obsOptions = {
//   root: null,
//   threshold : 0.1
// }
// const observer = new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);

// Dom Life Cycle events
/**
 * DOMContentLoaded is one which is triggered as soon as html is parsed and dom tree built
 * Load event is triggered after css and images files are loaded
 * BeforeUnload is triggered when user is clicking the close button of the browser or tab
 */
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });


// Exporting Module
console.log('Exporting Module');

const shippingCost = 10
export const cart = [];

export const addToCart = function(pro,quantity){
    cart.push([pro,quantity]);
    console.log(`${pro},${quantity}`);
}

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

// export default function (){
//   console.log('second default export');
// }
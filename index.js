import { ShoppingCart } from './classes/ShoppingCart.js';
import { Item } from './classes/Item.js';
import { Promo } from './classes/Promo.js';

console.log('Testing shopping cart app');

const cart = new ShoppingCart();

// Scenario 1
cart.addItem(new Item('ult_small', 'Unlimited 1GB', 24.90));
cart.addItem(new Item('ult_small', 'Unlimited 1GB', 24.90));
cart.addItem(new Item('ult_small', 'Unlimited 1GB', 24.90));
cart.addItem(new Item('ult_large', 'Unlimited 5GB', 44.90));

// Scenario 2
// cart.addItem(new Item('ult_small', 'Unlimited 1GB', 24.90));
// cart.addItem(new Item('ult_small', 'Unlimited 1GB', 24.90));    
// cart.addItem(new Item('ult_large', 'Unlimited 5GB', 44.90));
// cart.addItem(new Item('ult_large', 'Unlimited 5GB', 44.90));
// cart.addItem(new Item('ult_large', 'Unlimited 5GB', 44.90));
// cart.addItem(new Item('ult_large', 'Unlimited 5GB', 44.90));

// Scenario 3
// cart.addItem(new Item('ult_small', 'Unlimited 1GB', 24.90));
// cart.addItem(new Item('ult_medium', 'Unlimited 2GB', 29.90));
// cart.addItem(new Item('ult_medium', 'Unlimited 2GB', 29.90));

// Scenario 4
// cart.addItem(new Item('ult_small', 'Unlimited 1GB', 24.90));
// cart.addItem(new Item('1gb', '1 GB Data-pack', 9.90));
// cart.applyPromoCode('I<3AMAYSIM')


// Buy 2 for 3
cart.addPromo(new Promo({ quantity: 3, product: 'ult_small'}, { type: 'extra', quantity: 1}))
// Buy 2GB get 1GB Free
cart.addPromo(new Promo({ quantity: 1, product: 'ult_medium'}, { type: 'bundle', quantity: 1, freebie: '1gb'}))
// Buy 4 5GB -> 39.9 each 
cart.addPromo(new Promo({ quantity: 4, product: 'ult_large'}, { type: 'discount', price: 39.9}))

cart.checkout();


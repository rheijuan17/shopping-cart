import { ShoppingCart } from './classes/ShoppingCart.js';
import { Item } from './classes/Item.js';
import { Promo } from './classes/Promo.js';

console.log('Testing shopping cart app');

const cart = new ShoppingCart();

const ult_small = new Item('ult_small', 'Unlimited 1GB', 24.90);
const ult_medium = new Item('ult_medium', 'Unlimited 2GB', 29.90);
const ult_large = new Item('ult_large', 'Unlimited 5GB', 44.90);
const gbPack = new Item('1gb', '1 GB Data-pack', 9.90);

const promo1 = new Promo({ quantity: 3, product: 'ult_small'}, { type: 'extra', quantity: 1});
const promo2 = new Promo({ quantity: 1, product: 'ult_medium'}, { type: 'bundle', quantity: 1, freebie: '1gb'});
const promo3 = new Promo({ quantity: 4, product: 'ult_large'}, { type: 'discount', price: 39.9});

// Buy 2 for 3
cart.addPromo(promo1);
// Buy 2GB get 1GB Free
cart.addPromo(promo2);
// Buy 4 5GB -> 39.9 each 
cart.addPromo(promo3);

function scenario1() {
    console.log('Running Scenario 1');
    cart.addItem(ult_small);
    cart.addItem(ult_small);
    cart.addItem(ult_small);
    cart.addItem(ult_large);
    cart.checkout();
    console.log('-------');
}

function scenario2() {
    console.log('Running Scenario 2');
    cart.addItem(ult_small);
    cart.addItem(ult_small);
    cart.addItem(ult_large);
    cart.addItem(ult_large);
    cart.addItem(ult_large);
    cart.addItem(ult_large);
    cart.checkout();
    console.log('-------');
}

function scenario3() {
    console.log('Running Scenario 3');
    cart.addItem(ult_small);
    cart.addItem(ult_medium);
    cart.addItem(ult_medium);
    cart.checkout();
    console.log('-------');
}

function scenario4() {
    console.log('Running Scenario 4');
    cart.addItem(ult_small);
    cart.addItem(gbPack);
    cart.applyPromoCode('I<3AMAYSIM');
    cart.checkout();
    console.log('-------');
}


function main() {
    scenario1();
    scenario2();
    scenario3();
    scenario4();
}

main();
import { expect } from 'chai';
import { ShoppingCart } from '../classes/ShoppingCart.js';
import { Promo } from '../classes/Promo.js';
import { Item } from '../classes/Item.js';

describe('Shopping Cart Class', function() {

    let cart;
    let promo1, promo2, promo3;
    let ult_small ,ult_medium ,ult_large ,gbPack;

    function addItem(count, item) {
        for (let i = 0; i < count; i++) {
            cart.addItem(item); // Add a copy of the item to the cart
        }
    }

    beforeEach(() => {
        cart = new ShoppingCart();

        ult_small = new Item('ult_small', 'Unlimited 1GB', 24.90);
        ult_medium = new Item('ult_medium', 'Unlimited 2GB', 29.90);
        ult_large = new Item('ult_large', 'Unlimited 5GB', 44.90);
        gbPack = new Item('1gb', '1 GB Data-pack', 9.90);

        promo1 = new Promo({ quantity: 3, product: 'ult_small'}, { type: 'extra', quantity: 1});
        promo2 = new Promo({ quantity: 1, product: 'ult_medium'}, { type: 'bundle', quantity: 1, freebie: '1gb'});
        promo3 = new Promo({ quantity: 4, product: 'ult_large'}, { type: 'discount', price: 39.9});
    });

    it('should initialize a shopping cart object', () => {
        expect(cart.items).to.deep.equal([]);
        expect(cart.promos).to.deep.equal([]);
        expect(cart.promoCode).to.deep.equal('');
        expect(Number(cart.total)).to.deep.equal(0);
    });

    describe('clearState', () => {
        it('should empty cart and set promo code to empty string', () => {
            cart.addPromo(promo1);
            cart.addItem(ult_small); 
            cart.applyPromoCode('I<3AMAYSIM');
            cart.clearState();

            expect(cart.items).to.deep.equal([]);
            expect(cart.promoCode).to.deep.equal('');
        });

    });

    describe('addItem', () => {
        it('should add the item to the current list', () => {
            cart.addItem(ult_small); 

            expect(cart.items).to.deep.equal([ult_small]);
        });
    });

    describe('addPromo', () => {
        it('should add the promo to the current promo list', () => {
            cart.addPromo(promo1);

            expect(cart.promos).to.deep.equal([promo1]);
        });
    });

    describe('applyPromoCode', () => {
        it('should not add an invalid promoCode', () => {
            cart.applyPromoCode('InvalidPromoCode');

            expect(cart.promoCode).to.deep.equal('');
        });

        it('should add a promoCode', () => {
            cart.applyPromoCode('I<3AMAYSIM');

            expect(cart.promoCode).to.deep.equal('I<3AMAYSIM');
        });
    });

    describe('checkout', () => {

        it('Scenario 1: 3 for 2 promo', () => {
            cart.addPromo(promo1);

            addItem(3, ult_small);
            cart.addItem(ult_large);

            expect(cart.items).to.deep.equal([ult_small, ult_small, ult_small, ult_large]);
            expect(cart.promos).to.deep.equal([promo1]);
            expect(cart.promoCode).to.deep.equal('');

            cart.checkout();
            expect(Number(cart.total)).to.deep.equal(94.7);
        });
        
        it('Scenario 2: Buy 4 5GB -> 39.9 each', () => {
            cart.addPromo(promo3);

            addItem(2, ult_small);
            addItem(4, ult_large);

            expect(cart.items).to.deep.equal([ult_small, ult_small, ult_large, ult_large, ult_large, ult_large]);
            expect(cart.promos).to.deep.equal([promo3]);
            expect(cart.promoCode).to.deep.equal('');

            cart.checkout();
            expect(Number(cart.total)).to.deep.equal(209.40);
        });

        it('Scenario 3: free 1 GB Data-pack with every Unlimited 2GB sold.', () => {
            cart.addPromo(promo2);

            cart.addItem(ult_small);
            addItem(2, ult_medium);

            expect(cart.items).to.deep.equal([ult_small, ult_medium, ult_medium]);
            expect(cart.promos).to.deep.equal([promo2]);
            expect(cart.promoCode).to.deep.equal('');
            
            cart.checkout();
            expect(Number(cart.total)).to.deep.equal(84.70);
        });

        it('Scenario 4: I<3AMAYSIM Promo Applied', () => {
            cart.addItem(ult_small);
            cart.addItem(gbPack);
            cart.applyPromoCode('I<3AMAYSIM');

            expect(cart.items).to.deep.equal([ult_small, gbPack]);
            expect(cart.promos).to.deep.equal([]);
            expect(cart.promoCode).to.deep.equal('I<3AMAYSIM');

            cart.checkout();
            expect(Number(cart.total)).to.deep.equal(31.32);
        });

        it('Scenario 5: Creating a custom promo (Buy 6 for the price of 4 ult_small)', () => {
            const customPromo = new Promo({ quantity: 6, product: 'ult_small'}, { type: 'extra', quantity: 2});

            cart.addPromo(customPromo);

            addItem(6, ult_small);

            expect(cart.items).to.deep.equal([ult_small, ult_small, ult_small, ult_small, ult_small, ult_small]);
            expect(cart.promos).to.deep.equal([customPromo]);
            expect(cart.promoCode).to.deep.equal('');

            cart.checkout();
            expect(Number(cart.total)).to.deep.equal(99.6);
        });

        it('Scenario 5: 3 for 2 promo but buying 7', () => {
            cart.addPromo(promo1);

            addItem(7, ult_small);

            expect(cart.items).to.deep.equal([ult_small, ult_small, ult_small, ult_small, ult_small, ult_small, ult_small]);
            expect(cart.promos).to.deep.equal([promo1]);
            expect(cart.promoCode).to.deep.equal('');

            cart.checkout();
            expect(Number(cart.total)).to.deep.equal(124.5);
        });

        it('Scenario 6: 2 promos combined', () => {
            cart.addPromo(promo1);
            cart.addPromo(promo3);

            addItem(3, ult_small);
            addItem(4, ult_large);

            expect(cart.items).to.deep.equal([ult_small, ult_small, ult_small, ult_large, ult_large, ult_large, ult_large]);
            expect(cart.promos).to.deep.equal([promo1, promo3]);
            expect(cart.promoCode).to.deep.equal('');

            cart.checkout();
            expect(Number(cart.total)).to.deep.equal(209.4);
        });

        it('Scenario 7: 4 promos and discount code', () => {
            const promoA = new Promo({ quantity: 4, product: 'ult_small'}, { type: 'extra', quantity: 2});
            const promoB = new Promo({ quantity: 2, product: 'ult_medium'}, { type: 'bundle', quantity: 5, freebie: '1gb'});
            const promoC = new Promo({ quantity: 7, product: 'ult_large'}, { type: 'discount', price: 30.0})
            
            cart.addPromo(promoA);
            cart.addPromo(promoB);
            cart.addPromo(promoC);
            cart.applyPromoCode('I<3AMAYSIM');

            addItem(8, ult_small);
            addItem(5, ult_medium);
            addItem(8, ult_large);

            expect(cart.items).to.deep.equal([
                ult_small, ult_small, ult_small, ult_small, ult_small, ult_small, ult_small, ult_small,
                ult_medium, ult_medium, ult_medium, ult_medium, ult_medium,
                ult_large, ult_large, ult_large, ult_large, ult_large, ult_large, ult_large, ult_large
            ]);
            expect(cart.promos).to.deep.equal([promoA, promoB, promoC]);
            expect(cart.promoCode).to.deep.equal('I<3AMAYSIM');

            cart.checkout();
            expect(Number(cart.total)).to.deep.equal(440.19);
        });
    });
    
});
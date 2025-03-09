import { expect } from 'chai';
import { Promo } from '../classes/Promo.js';

describe('Promo Class', function () {

    it('should create a promo with valid target and reward', function () {
        const promo = new Promo(
            { quantity: 2, product: 'ult_small' },
            { type: 'extra', quantity: 1 }
        );
        expect(promo.target).to.deep.equal({ quantity: 2, product: 'ult_small' });
        expect(promo.reward).to.deep.equal({ type: 'extra', quantity: 1 });
    });

    it('should throw an error if target is not a valid object', function () {
        expect(() => new Promo(null, { type: 'extra', quantity: 1 })).to.throw("Target should be a valid object");
    });

    it('should throw an error if target is missing quantity and product', function () {
        expect(() => new Promo({}, { type: 'extra', quantity: 1 })).to.throw("Target should have quantity and product");
    });

    it('should throw an error if target quantity is invalid', function () {
        expect(() => new Promo({ quantity: -1, product: 'ult_small' }, { type: 'extra', quantity: 1 })).to.throw("Quantity must be a non-negative integer.");
    });

    it('should throw an error if target product is not in productList', function () {
        expect(() => new Promo({ quantity: 2, product: 'non_existent_product' }, { type: 'extra', quantity: 1 })).to.throw("Target product must be an existing product.");
    });

    it('should throw an error if reward is not a valid object', function () {
        expect(() => new Promo({ quantity: 2, product: 'ult_small' }, null)).to.throw("Reward should be a valid object");
    });

    it('should throw an error if reward type is invalid', function () {
        expect(() => new Promo({ quantity: 2, product: 'ult_small' }, { type: 'invalid_type' })).to.throw("Reward type should be a string/ be a valid reward type");
    });

    it('should throw an error if reward type is extra but missing quantity', function () {
        expect(() => new Promo({ quantity: 2, product: 'ult_small' }, { type: 'extra' })).to.throw("Reward with type extra should have a quantity.");
    });

    it('should throw an error if reward type is discount but missing price', function () {
        expect(() => new Promo({ quantity: 2, product: 'ult_small' }, { type: 'discount' })).to.throw("Reward with type discount should have updated price.");
    });

    it('should throw an error if reward type is bundle but missing quantity', function () {
        expect(() => new Promo({ quantity: 2, product: 'ult_small' }, { type: 'bundle', freebie: 'ult_medium' })).to.throw("Reward with type bundle should have a quantity.");
    });

    it('should throw an error if reward type is bundle but missing freebie', function () {
        expect(() => new Promo({ quantity: 2, product: 'ult_small' }, { type: 'bundle', quantity: 1 })).to.throw("Reward with type bundle should have a freebie.");
    });

});

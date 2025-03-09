import { expect } from 'chai';
import { Item } from '../classes/Item.js';

describe('Item Class', function () {
    
    it('should create an item with valid properties', function () {
        const item = new Item('ult_small', 'Unlimited 1GB', 24.9);
        expect(item.code).to.equal('ult_small');
        expect(item.name).to.equal('Unlimited 1GB');
        expect(item.price).to.equal(24.9);
    });

    it('should throw an error if code is invalid', function () {
        expect(() => new Item('', 'Unlimited 1GB', 24.9)).to.throw('Code must be a non-empty string.');
    });

    it('should throw an error if name is invalid', function () {
        expect(() => new Item('ult_small', '', 24.9)).to.throw('Name must be a non-empty string.');
    });

    it('should throw an error if price is invalid', function () {
        expect(() => new Item('ult_small', 'Unlimited 1GB', -5)).to.throw('Price must be a non-negative float.');
    });

});

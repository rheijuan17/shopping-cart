import promoCodes from "../constants/promoCodes.js";
import productList  from "../constants/productList.js";

export class ShoppingCart {
    constructor() {
        this.items = [];
        this.promos = [];
        this.promoCode = '';
    }

    clearState() {
        this.items = [];
        this.promoCode = '';
    }

    addItem(item) {
        this.items.push(item);
    }

    addPromo(promos) {
        this.promos.push(promos);
    }

    applyPromoCode(promoCode) {
        if(Object.keys(promoCodes).includes(promoCode))
            this.promoCode = promoCode;
        else
            console.log('Promo code is invalid');
    }

    checkout() {
        // Initialize a map for a counter of free items and for free items
        const itemCount = this.createItemCount();
        const free = new Map();
    
        // Apply promos to items
        this.promos.forEach((promo) => {
            this.applyPromo(promo, itemCount, free);
        });

        // Compute the total amount to pay for the user
        let total = Array.from(itemCount.values()).reduce((acc, item) => acc + (item.qty * item.price), 0);

        // Apply discount if promo code is provided
        if (this.promoCode) total *= (1- promoCodes[this.promoCode].value);

        const mergedMap = new Map(itemCount);

        free.forEach(({ qty }, key) => {
            mergedMap.set(key, { qty: (mergedMap.get(key)?.qty || 0) + qty });
        });

        console.log('Displaying list of items for user');

        mergedMap.forEach(({ qty }, key) => {
            console.log(`${qty}x ${productList[key].name}`);
        });
        
        console.log(`Total is ${total.toFixed(2)}`);

        // Empty the cart 
        this.clearState();
    }

    createItemCount() {
        return this.items.reduce((acc, item) => {
            if (!acc.has(item.code)) {
                acc.set(item.code, { qty: 0, price: item.price });
            }
            acc.get(item.code).qty += 1;
            return acc;
        }, new Map());
    }

    applyPromo(promo, itemCount, free) {
        const { target: { quantity, product }, reward } = promo;
    
        if (!itemCount.has(product) || itemCount.get(product).qty < quantity) {
            return;
        }
    
        const count = itemCount.get(product).qty;
        const awardQty = Math.floor(count / quantity);
    
        switch (reward.type) {
            case 'extra':
                itemCount.get(product).qty -= awardQty;
                this.updateFreeItems(free, product, awardQty, itemCount.get(product).price);
                break;
    
            case 'bundle':
                this.updateFreeItems(free, reward.freebie, awardQty);
                break;
    
            case 'discount':
                itemCount.get(product).price = reward.price;
                break;
        }
    }

    updateFreeItems(free, product, qty, price = null) {
        if (!free.has(product)) {
            free.set(product, { qty, price });
        } else {
            free.get(product).qty += qty;
        }
    }
}
/**
 * Assumptions
 * 1. Promotions are specific to one item at a time
 * 2.   
 */

const rewardTypes = ['extra', 'bundle', 'discount'];
const productList = ['ult_small', 'ult_medium', 'ult_large', '1gb'];

const shoppingCartItems = [];
const promos = [];

class Item {
    constructor(code, name, price) {
        this.setCode(code);
        this.setName(name);
        this.setPrice(price);

        // console.log('Item is valid')
    }

    setCode(code) {
        if (typeof code !== "string" || code.trim().length === 0) {
          throw new Error("Code must be a non-empty string.");
        }
        this.code = code;
    }

    setName(name) {
        if (typeof name !== "string" || name.trim().length === 0) {
          throw new Error("Name must be a non-empty string.");
        }
        this.name = name;
    }
    
    setPrice(price) {
      if (typeof price !== "number" || price < 0 || isNaN(price)) {
        throw new Error("Price must be a non-negative integer.");
      }
      this.price = price;
    }
}

class Promo {
    constructor(target, reward) {
        this.setTarget(target);
        this.setReward(reward);

        // console.log('Promo is valid')
    }

    setTarget(target) {
        if(typeof target !== "object" && target === null) {
            throw new Error("Target should be a valid object");
        }

        
        if(!target.quantity && !target.product) {
            throw new Error("Target should have quantity and product");
        }

        const { quantity, product } = target;

        // Check quantity of target
        if (typeof quantity !== "number" || quantity < 0 || !Number.isInteger(quantity)) {
            throw new Error("Quantity must be a non-negative integer.");
        }

        if (!productList.includes(product)) {
            throw new Error("Target product must be an existing product.");
        }

        this.target = target;
    }

    setReward(reward) {

        // Check if reward is valid object
        if(typeof reward !== "object" && reward === null) {
            throw new Error("Reward should be a valid object");
        }

        const { type } = reward;

        // Check if reward type is valid
        if(typeof type !== "string" && !rewardTypes.includes(type)) {
            throw new Error("Reward type should be a string/ be a valid reward type");
        }

        /**
         * If reward type is extra, item should have quantity attribute
         */
        if(type === 'extra' && !reward.quantity) {
            throw new Error("Reward with type extra should have a quantity.");
        }

        // Reward type is discount
        if(type === 'discount' && !reward.price) {
            throw new Error("Reward with type discount should have updated price.");
        }

        // Reward type is bundle
        if(type === 'bundle') {
            if(!reward.quantity) {
                throw new Error("Reward with type bundle should have a quantity.");
            }

            if(!reward.freebie) {
                throw new Error("Reward with type bundle should have a freebie.");
            }
        }

        this.reward = reward;
    }
}

console.log('Testing shopping cart app');

console.log('Creating items');

const item1 = new Item('ult_small', 'Unlimited 1GB', 24.90);
const item2 = new Item('ult_small', 'Unlimited 1GB', 24.90);

// const item2 = n;
// const item3 = 
// const item4 = new Item('1gb', '1 GB Data-pack', 9.90);
shoppingCartItems.push(
    new Item('ult_small', 'Unlimited 1GB', 24.90), 
    new Item('ult_small', 'Unlimited 1GB', 24.90),
    new Item('ult_small', 'Unlimited 1GB', 24.90),
    // new Item('ult_small', 'Unlimited 1GB', 24.90),
    // new Item('ult_small', 'Unlimited 1GB', 24.90),
    // new Item('ult_small', 'Unlimited 1GB', 24.90),
    // new Item('ult_medium', 'Unlimited 2GB', 29.90),
    // new Item('ult_medium', 'Unlimited 2GB', 29.90),
    // new Item('ult_medium', 'Unlimited 2GB', 29.90),
    // new Item('ult_medium', 'Unlimited 2GB', 29.90),
    // new Item('ult_medium', 'Unlimited 2GB', 29.90),
    // new Item('ult_medium', 'Unlimited 2GB', 29.90),
    // new Item('ult_medium', 'Unlimited 2GB', 29.90),
    // new Item('ult_medium', 'Unlimited 2GB', 29.90),
    // new Item('ult_medium', 'Unlimited 2GB', 29.90)
    new Item('ult_large', 'Unlimited 5GB', 44.90),
    // new Item('ult_large', 'Unlimited 5GB', 44.90),
    // new Item('ult_large', 'Unlimited 5GB', 44.90),
    // new Item('ult_large', 'Unlimited 5GB', 44.90)
)
;

console.log('Creating promos');

promos.push(
    // Buy 2 for 3
    new Promo({ quantity: 3, product: 'ult_small'}, { type: 'extra', quantity: 1}),
    // Buy 2GB get 1GB Free
    new Promo({ quantity: 1, product: 'ult_medium'}, { type: 'bundle', quantity: 1, freebie: '1gb'}),
    // Buy 4 5GB -> 39.9 each 
    new Promo({ quantity: 4, product: 'ult_large'}, { type: 'discount', price: 39.9})
);

// Create a list of quantity per item
const a = shoppingCartItems.reduce((acc, item) => {
    acc[item.code] = { qty: (acc[item.code]?.qty || 0) + 1, price: item.price };
    return acc;
}, {});

const free = [];

console.log('Shopping cart of user', a)

// Checking eligibility
promos.forEach((promo) => {

    const { 
        target: { quantity, product },
        reward
    } = promo;


    // Check if list has a promo item otherwise skip
    if(!Object.keys(a).includes(product)) {
        return;
    }

    if(!a[product].qty >= quantity) {
        return;
    }

    console.log(`User has bought enough ${product} for promo`);
    
    // Award the user
    const count = a[product].qty;

    if(reward.type === 'extra') {
        console.log('Awarding reduced price on items')

        const toAward = Math.floor(count/quantity);

        // Reduce items to pay
        a[product].qty -= toAward;
        
        // Add items to free
        if(!free[product]) {
            free[product] = {qty: toAward, price: a[product].price};
        } else {
            free[product].qty += toAward;
        }

    } else if(reward.type === 'bundle') {
        console.log('Awarding a freebie', reward)
        const toAward = Math.floor(count/ quantity);

        if(free[product]) {
            free[product] += toAward
        } else {
            free[product] = toAward
        }

        console.log(`Awarding ${toAward} ${reward.freebie} freebies`);
    } else if(reward.type === 'discount') {
        console.log('Awarding a discount')
        // Change price
        a[product].price = reward.price;
    }
});

// // Compute the eme
console.log('Computing', a)
console.log('Freebies are', free)

console.log(Object.values(a))

const total = Object.values(a).reduce((acc, item) => acc += (item.qty * item.price), 0).toFixed(2);
console.log('total is', total)



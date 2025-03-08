const productList = ['ult_small', 'ult_medium', 'ult_large', '1gb'];

class ShoppingCart {
    constructor(items =[], promos = {}) {
        this.setItems(items);
        this.setPromos(promos)
        console.log('Shopping Cart Initialized');
    }

    validateItem(item) {
        return productList.includes(item);
    }

    setItems(items) {
        if (!Array.isArray(items)) {
            throw new Error("Items must be an array.");
        }

        this.items = items.filter((item) => {

        });
    }
}
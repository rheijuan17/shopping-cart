const productList = ['ult_small', 'ult_medium', 'ult_large', '1gb'];
import { isValidString } from './utils/utils';


export class Item {
    constructor(code, name, price, promo) {
        this.setCode(code);
        this.setName(name);
        this.setPrice(price);

        console.log('Item is valid');
    }

    setCode(code) {
        if (!isValidString(code)) {
          throw new Error("Code must be a non-empty string.");
        }
        this.code = code;
    }

    setName(name) {
        if (!isValidString(name)) {
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
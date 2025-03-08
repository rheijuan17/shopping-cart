import { isInValidString, isInvalidFloat } from '../utils/utils.js';

export class Item {
    constructor(code, name, price) {
        this.setCode(code);
        this.setName(name);
        this.setPrice(price);
    }

    setCode(code) {
        if (isInValidString(code)) {
          throw new Error("Code must be a non-empty string.");
        }
        this.code = code;
    }

    setName(name) {
        if (isInValidString(name)) {
          throw new Error("Name must be a non-empty string.");
        }
        this.name = name;
    }
    
    setPrice(price) {
      if (isInvalidFloat(price)) {
        throw new Error("Price must be a non-negative float.");
      }
      this.price = price;
    }
}

import { isInvalidInteger, isInvalidObject } from '../utils/utils.js';
import { rewardTypes } from "../constants/rewardTypes.js";
import productList from "../constants/productList.js";

export class Promo {
    constructor(target, reward) {
        this.productList = Object.keys(productList);
        this.rewardTypes = rewardTypes;
        this.setTarget(target);
        this.setReward(reward);
    }

    setTarget(target) {
        if(isInvalidObject(target)) {
            throw new Error("Target should be a valid object");
        }

        if(!target.quantity && !target.product) {
            throw new Error("Target should have quantity and product");
        }

        const { quantity, product } = target;

        // Check quantity of target
        if (isInvalidInteger(quantity)) {
            throw new Error("Quantity must be a non-negative integer.");
        }

        if (!this.productList.includes(product)) {
            throw new Error("Target product must be an existing product.");
        }

        this.target = target;
    }

    setReward(reward) {

        // Check if reward is valid object
        if(isInvalidObject(reward)) {
            throw new Error("Reward should be a valid object");
        }

        const { type } = reward;

        // Check if reward type is valid
        if(typeof type !== "string" && !this.rewardTypes.includes(type)) {
            throw new Error("Reward type should be a string/ be a valid reward type");
        }

        // If reward type is extra, item should have quantity attribute
        if(type === 'extra' && !reward.quantity) {
            throw new Error("Reward with type extra should have a quantity.");
        }

        // If reward type is discount, item should have price attribute
        if(type === 'discount' && !reward.price) {
            throw new Error("Reward with type discount should have updated price.");
        }

        // If reward type is bundle, item should have quantity and freebie attributes
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
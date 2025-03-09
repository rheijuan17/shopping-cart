# Amaysim Shopping Cart

## Description

Amaysim is rebuilding its shopping cart to allow customers to purchase multiple SIM cards simultaneously. This new version aims to enhance the shopping experience by enabling bulk purchases and streamlining the checkout process.

## Features

### Promos

Amaysim is offering special promos during its initial launch of its new cart. The promos are listed below

#### Initial Promos Supported

- A three for two promo for the Unlimited 1GB Sims
- A bulk discount for the Unlimited 5GB Sims if the customer buys more than 3
- A freebie of 1 GB Data-pack for every 1 GB Data-pack with every Unlimited 2GB sold.
- A discount code 'I<3AMAYSIM' that applies a 10% discount across the board

#### Custom Promos

Custom promos can be created with the target and reward attributes.

Pertains to the pre-requisite for the user to be eligibile for the promo

| Attribute | Description                                                 |
| --------- | ----------------------------------------------------------- |
| Quantity  | Quantity of the product bought to be eligible for the promo |
| Product   | Name of the product to be purchased                         |

Reward Descriptions

| Reward Type | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| Extra       | Customers receive additional products when purchasing a specific quantity.   |
| Discount    | A price reduction is applied to the purchased item(s).                       |
| Bundle      | Customers receive freebies when purchasing a specific quantity of a product. |

The table below shows which attribute is required for each reward type

| Reward Type | Quantity | Price | Freebie |
| ----------- | -------- | ----- | ------- |
| Extra       | ✅       | ❌    | ❌      |
| Discount    | ❌       | ✅    | ❌      |
| Bundle      | ✅       | ❌    | ✅      |

A sample promo can be instantiated like this

```
// A user will receive 5 ult_small products for the price of 3
new Promo({ quantity: 5, product: 'ult_small'}, { type: 'extra', quantity: 2})
```

## Limitations

- Reward types and product list data are added in constants folder
- Custom promo codes can be created but the discount will only apply to all items
- Discount promos for the items will only be fixed price. This version does not support percentage discounts

## Further Improvements

- Data such as product list and reward types can be placed in a config file

## Installation Instructions

### Prerequisites

- Node.js

### Steps to Install

1. Clone the repository:
   ```sh
   git clone https://github.com/rheijuan17/shopping-cart.git
   cd shopping-cart
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application:
   ```sh
   npm start
   ```

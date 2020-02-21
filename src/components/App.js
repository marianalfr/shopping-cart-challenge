import React, { useState, useEffect } from 'react';
import '../styles/vendors/normalize.css';
import '../styles/cabify-base.css';
import styled from 'styled-components';
import Background from '../images/background.png';
import ShoppingCart from './ShoppingCart';
import OrderSummary from './OrderSummary';

// Styled Components -->

const Body = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${Background});
  background-color: ${props => props.theme.color.mainDark};
  background-position: top left;
  background-size: cover;
  font-family: ${props => props.theme.font.main};
  font-weight: regular;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  max-width: 1088px;
  max-height: 648px;
  width: calc(100% - 64px);
  height: calc(100% - 64px);
  border-radius: 4px;
  background-color: ${props => props.theme.color.lightest};
  transform: translate(-50%, -50%);
`;

// App Component ------------------------------------------------------------->

const App = () => {

  //I am assuming these products have been individually pushed to {shoppingCart} on client's clicking 'add to cart' and after selecting a certain amount of each of them.
  //By adding an {offer} property to each product, I am also assuming that the seller can easily set certain offers on products in a way that this information is added to/removed from the product properties based on seller's choice.
  //The 'offer' information needed is the type of offer and the minimum bulk to which it applies.
  //I have set all the data I need within the offer type property, so different offers of the same type can be applied with a single function.
  const [shoppingCart, setShoppingCart] =  useState([
    {
      product: {
        name: 'shirt',
        price: 20,
        code: 'X7R2OPX',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: {
          thumb: require('../images/shirt.png'),
          large: require('../images/shirt-large.jpg')
        },
        offer: {
          type: {
            category: 'percentage',
            name: '-5%',
            numbers: {
              percentage: 5
            }
          },
          minQty: 3 
        }
      },
      quantity: 3
    },
    {
      product: {
        name: 'mug',
        price: 5,
        code: 'X2G2OPZ',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium quam vulputate dignissim suspendisse in. In metus vulputate eu scelerisque felis. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque.',
        images: {
          thumb: require('../images/mug.png'),
          large: require('../images/mug-large.png')
        },
        offer: {
          type: {
            category: 'free-item',
            name: '2x1',
            numbers: {
              get: 2,
              pay: 1
            }
          },
          minQty: 2
        }
      },
      quantity: 4
    },
    {
      product: {
        name: 'cap',
        price: 10,
        code: 'X3W2OPY',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit duis tristique sollicitudin nibh sit. Egestas pretium aenean pharetra magna. Nibh sit amet commodo nulla.',
        images: {
          thumb: require('../images/cap.png'),
          large: require('../images/cap-large.png')
        },
        offer: {
          type: {
            category: null,
            name: null,
            numbers: null
          },
          minQty: null
        }
      },
      quantity: 4
    }
  ]);

  //Store order summary so it is available until buying process is completed.
  const [orderBreakdown, setOrderBreakdown] =  useState({
    items: 0,
    totalPrice: 0,
    discounts: [],
    finalPrice: 0

  });

  const updateBreakdown = () => {
    setOrderBreakdown({
      items: getTotalItems(),
      totalPrice: getTotalPrice(),
      discounts: applyDiscounts(),
      finalPrice: 0
    });
  };

  useEffect(() => {
    updateBreakdown();
  }, []);

  //ADD OR REMOVE ITEMS FROM SHOPPING CART:

  const updateQuantity = (code, increment) => {
    //Add (increment = 1) or remove (increment = -1) items for a given product (code) from the shoppingCart.
    const updateItem = (item,increment) => {
      item.quantity = item.quantity + increment;
      return item;
    }
    //Update shoppingCart with new quantity of said product.
    const newShoppingCart = shoppingCart.map(item => item.product.code === code ? updateItem(item, increment) : item);
    setShoppingCart([ ...newShoppingCart ]);

    //Update order summary.
    updateBreakdown();
    console.log(orderBreakdown.discounts)
  };

  //CALCULATE ORDER BREAKDOWN:

  const getTotalItems = () => {
    let quantity = 0;
    for (let item of shoppingCart) {
        quantity = quantity + item.quantity;
    };
    return quantity;
  };

  const getTotalPrice = () => {
    let total = 0;
    for (let item of shoppingCart){
        const price = item.product.price * item.quantity;
        total = total + price;
    };
    return total;
  };

  //Calculate discounts:

  //This function takes a single product as an argument. For products under an offer that gives one or more free items like '2x1', '3x2' or even '5x3', this function takes this data from the product offer and returns the discount for said product.
  const freeItem = item => {
    const n = item.quantity;
    const price = item.product.price;
    const minQty = item.product.offer.minQty;

    // Offer would be something like 'get x products and pay y products' (x for y)
    const x = item.product.offer.type.numbers.get;
    const y = item.product.offer.type.numbers.pay;
    const increment = x - y;

    if (n >= minQty && n >= x){
        for(let i = 0; i < x; i++){
            if((n - i) % x === 0){
                const units = (n - i) / x;
                const discount = (units * increment * price);
                return discount;
            };
        };
    };
  };

  const applyFreeItem = () => {
    let freeItemDiscounts = [];
    const freeItemOffers = shoppingCart.filter(item => item.product.offer.type.category === 'free-item');

    const addDiscount = item => {
      const productDiscount = {
        product: {
          name: item.product.name,
          code: item.product.code,
          quantity: item.quantity,
        },
        offer: {
          category: item.product.offer.type.category,
          name: item.product.offer.type.name,
          minQty: item.product.offer.minQty
        },
        discount: freeItem(item)
      };

      freeItemDiscounts.push(productDiscount);
    };

    freeItemOffers.map(item => addDiscount(item));

    return freeItemDiscounts;
  };

  //This function takes a single product as an argument. It returns the discount for a product under an offer that reduces the price by a certain percentage.
  const percentageDiscount = item => {
    const quantity = item.quantity;
    const price = item.product.price;
    const minQty = item.product.offer.minQty;

    const per = item.product.offer.type.numbers.percentage;

    if (quantity >= minQty) {
        const discount = (price * (per / 100) * item.quantity);
        return discount;
    } else {
        return 0;
    };
  };

  const applyPercentage = () => {
    let percentageDiscounts = [];
    const percentageOffers = shoppingCart.filter(item => item.product.offer.type.category === 'percentage');

    const addDiscount = item => {
      const productDiscount = {
        product: {
          name: item.product.name,
          code: item.product.code,
          quantity: item.quantity,
        },
        offer: {
          category: item.product.offer.type.category,
          name: item.product.offer.type.name,
          minQty: item.product.offer.minQty
        },
        discount: percentageDiscount(item)
      };

      percentageDiscounts.push(productDiscount);
    };

    percentageOffers.map(item => addDiscount(item));

    return percentageDiscounts;
  };

  //APPLY ALL DISCOUNTS:

  const applyDiscounts = () => {
    const freeItemDiscounts = applyFreeItem();
    const percentageDiscounts = applyPercentage();
    return [
      ...percentageDiscounts,
      ...freeItemDiscounts
    ];
  };

  return (
    <Body>
      <Wrapper>
        <ShoppingCart
          shoppingCart = { shoppingCart }
          updateQuantity = { updateQuantity }
        />
        <OrderSummary
          shoppingCart = { shoppingCart }
          orderBreakdown = { orderBreakdown }
        />
      </Wrapper>
    </Body>
  );

};

export default App;

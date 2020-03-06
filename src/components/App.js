import React, { useState, useEffect } from 'react';
import '../styles/vendors/normalize.css';
import '../styles/cabify-base.css';
import styled from 'styled-components';
import Background from '../images/background.png';
import ShoppingCart from './ShoppingCart';
import OrderSummary from './OrderSummary';
import fetchPromoCodes from '../services/PromosService';

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
 
  const [shoppingCart, setShoppingCart] =  useState([ //Products already added to cart.
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

  //Promo code functionality.
  const [activeCodes, setActiveCodes] = useState(['']);
  const [userCode, setUserCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(null);


  //current order summary.
  const [orderBreakdown, setOrderBreakdown] =  useState({
    items: 11,
    totalPrice: 120,
    discounts: [
      {
        product: {
            name: 'shirt',
            code: 'X7R2OPX',
            quantity: 3
        },
        offer: {
            category: 'percentage',
            name: '-5%',
            minQty: 3
        },
        discount: 3
      },
      {
        product: {
            name: 'mug',
            code: 'X2G2OPZ',
            quantity: 4
        },
        offer: {
            category: 'free-item',
            name: '2x1',
            minQty: 2
        },
        discount: 4
      }
    ],
    promo: {},
    finalPrice: 107
  });

  //DATA PERSISTANCE:

  const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    const storedShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    const storedOrderBreakdown = JSON.parse(localStorage.getItem('orderBreakdown'));

    if (storedShoppingCart === undefined || storedShoppingCart === null){
      saveData('shoppingCart', shoppingCart);
    } else {
      setShoppingCart(storedShoppingCart);
    };

    if (storedOrderBreakdown === null || storedOrderBreakdown === undefined){
      saveData('orderBreakdown', orderBreakdown);
    } else {
      setOrderBreakdown(storedOrderBreakdown);
    };
  }, []);

  //ADD OR REMOVE ITEMS FROM SHOPPING CART:

  const updateQuantity = (code, increment) => {
    const updateItem = (item,increment) => {
      item.quantity = item.quantity + increment;
      return item;
    };
    const newShoppingCart = shoppingCart.map(item => item.product.code === code ? updateItem(item, increment) : item);
    setShoppingCart([ ...newShoppingCart ]);
    saveData('shoppingCart', newShoppingCart);

    //Update order summary.
    const newBreakdown = {
      items: getTotalItems(),
      totalPrice: getTotalPrice(),
      discounts: applyDiscounts(),
      promo: applyPromoCode(userCode),
      finalPrice: getFinalPrice(),
    }; 
    setOrderBreakdown(newBreakdown);
    saveData('orderBreakdown', newBreakdown);
  };

  ////////CALCULATE ORDER BREAKDOWN:

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

  //CALCULATE ITEM DISCOUNTS:

  //This function takes a single product as an argument. For products under an offer that gives one or more free items like '2x1', '3x2' or even '5x3', this function takes this data from the product offer and returns the discount for said product.
  const freeItem = item => {
    const n = item.quantity;
    const price = item.product.price;
    const minQty = item.product.offer.minQty;

    // Offer would be something like 'get x products and pay y products' (x for y).
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
    } else {
      return 0;
    };
  };

  //This function applies the above type of offer to all the items in the shopping cart that are under such offer (free-item).
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

  //This function applies the above type of offer to all the items in the shopping cart that are under such offer (percentage).
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

  //APPLY ALL ITEM DISCOUNTS:

  const applyDiscounts = () => {
    const freeItemDiscounts = applyFreeItem();
    const percentageDiscounts = applyPercentage();
    return [
      ...percentageDiscounts,
      ...freeItemDiscounts
    ];
  };

  //PROMO CODE DISCOUNT FUNCTIONALITY:

  //Fetch Promo codes.
  const getPromoCodes = () => {
    fetchPromoCodes()
    .then(promos => setActiveCodes([...promos]))
    .catch(error => console.log(error));
  };

  //Validate promotional codes and given a successful result return the discount associated to that code updating the order breakdown.
  const applyPromoCode = code => {
    setUserCode(code);
    const promo = activeCodes.find(promo => promo.code === code);

    if(promo !== undefined && orderBreakdown.items !== 0){
        setIsCodeValid(true);
        const updatedPromo = {
          code: promo.code,
          discount: promo.discount
        };
        setOrderBreakdown({
          ...orderBreakdown,
          promo: updatedPromo,
          finalPrice: orderBreakdown.finalPrice - promo.discount
        });

        return updatedPromo;
    } else {
        setIsCodeValid(false);
        const updatedPromo = {
          code: '',
          discount: 0
        };
        setOrderBreakdown({
          ...orderBreakdown,
          promo: updatedPromo
        });
        return updatedPromo;
    };
  };

  //CALCULATE FINAL PRICE:

  const getFinalPrice = () => {
    const totalPrice = getTotalPrice();
    const discounts = applyDiscounts();
    const promoDiscount = applyPromoCode(userCode).discount;
    let totalDiscounts = 0;

    for (let discount of discounts){
      totalDiscounts = totalDiscounts + discount.discount;
    };

    const finalPrice = totalPrice - totalDiscounts - promoDiscount;
    return finalPrice;
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
          getPromoCodes = { getPromoCodes }
          userCode = { userCode }
          isCodeValid = { isCodeValid }
          applyPromoCode = { applyPromoCode }
        />
      </Wrapper>
    </Body>
  );

};

export default App;

import React, { useState } from 'react';
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
  const [shoppingCart, setShoppingCart] =  useState([
    {
      product: 'shirt',
      price: 20,
      quantity: 3,
      code: 'X7R2OPX',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      images: {
        thumb: require('../images/shirt.png'),
        large: require('../images/shirt-large.jpg')
      },
      offer: {
        type: '-5%',
        minQty: 3 
      }
    },
    {
      product: 'mug',
      price: 5,
      quantity: 4,
      code: 'X2G2OPZ',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium quam vulputate dignissim suspendisse in. In metus vulputate eu scelerisque felis. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque.',
      images: {
        thumb: require('../images/mug.png'),
        large: require('../images/mug-large.png')
      },
      offer: {
        type: '2x1',
        minQty: 2 
      }
    },
    {
      product: 'cap',
      price: 10,
      quantity: 4,
      code: 'X3W2OPY',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit duis tristique sollicitudin nibh sit. Egestas pretium aenean pharetra magna. Nibh sit amet commodo nulla.',
      images: {
        thumb: require('../images/cap.png'),
        large: require('../images/cap-large.png')
      },
      offer: {
        type: null,
        minQty: null
      }
    }
  ]);

  const updateQuantity = (code, increment) => {
    //Add (increment = 1) or remove (increment = -1) items for a given product (code) from the shoppingCart
    const updateProduct = (product,increment) => {
      product.quantity = product.quantity + increment;
      return product;
    }
    //Update shoppingCart with new quantity of said product
    const newShoppingCart = shoppingCart.map(product => product.code === code ? updateProduct(product, increment) : product);
    setShoppingCart([ ...newShoppingCart ]);
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
        />
      </Wrapper>
    </Body>
  );

};

export default App;

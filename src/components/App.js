import React from 'react';
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

// App Component -->

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //I am assuming these products have been pushed to 'shoppingCart' on client's clicking 'add to cart' and after selecting a certain amount of each of them.
      shoppingCart: [
        {
          product: 'shirt',
          price: 20,
          quantity: 3,
          code: 'X7R2OPX',
          image: require('../images/shirt.png')
        },
        {
          product: 'mug',
          price: 5,
          quantity: 4,
          code: 'X2G2OPZ',
          image: require('../images/mug.png')
        },
        {
          product: 'cap',
          price: 10,
          quantity: 4,
          code: 'X3W2OPY',
          image: require('../images/cap.png')
        }
      ]
    };
    
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  updateQuantity(code, increment){
    //Add (increment = 1) or remove (increment = -1) items for a given product from the shoppingCart
    const updateProduct = (product,increment) => {
      product.quantity = product.quantity + increment;
      return product;
    }
    //Update shoppingCart with new quantity of said product
    const { shoppingCart } = this.state;
    const newShoppingCart = shoppingCart.map(product => product.code === code ? updateProduct(product, increment) : product);
    this.setState({
      shoppingCart: [ ...newShoppingCart ]
    });
  }

  render() {
    return (
      <Body>
        <Wrapper>
          <ShoppingCart
            shoppingCart = { this.state.shoppingCart }
            updateQuantity = { this.updateQuantity }
          />
          <OrderSummary
            shoppingCart = { this.state.shoppingCart }
          />
        </Wrapper>
      </Body>
    );
  }
}

export default App;

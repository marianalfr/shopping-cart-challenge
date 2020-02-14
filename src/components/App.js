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
    }
  }

  render() {
    return (
      <Body>
        <Wrapper>
          <ShoppingCart
            shoppingCart = { this.state.shoppingCart }
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

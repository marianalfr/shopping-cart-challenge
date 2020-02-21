import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import 'jest-styled-components';
import Adapter from 'enzyme-adapter-react-16';
import OrderSummary from '../OrderSummary';

Enzyme.configure({ adapter: new Adapter() });

const shoppingCart = [
  {
    product: {
      name: 'shirt',
      price: 20,
      code: 'X7R2OPX',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      images: {
        thumb: require('../../images/shirt.png'),
        large: require('../../images/shirt-large.jpg')
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
  }
];

const orderBreakdown = {
  items: 3,
  totalPrice: 60,
  discounts: [{
    product: {
      name: 'shirt',
      code: 'X7R2OPX',
      quantity: 3,
    },
    offer: {
      category: 'percentage',
      name: '-5%',
      minQty: 3
    },
    discount: 3
  }],
  promo: {
    code: 'CABIFY',
    discount: 5
  },
  finalPrice: 52,
}

describe('OrderSummary Component', () => {

  it('renders correctly', () => {
    const wrapper = shallow(
        <OrderSummary 
            shoppingCart = { shoppingCart }
            orderBreakdown = { orderBreakdown }
            getPromoCodes = { () => {} }
            userCode = { 'CABIFY' }
            isCodeValid = { true }
            applyPromoCode = { () => {} }
        />
    );
    expect(wrapper.debug()).toMatchSnapshot(); 
  });
});
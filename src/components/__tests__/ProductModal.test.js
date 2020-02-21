import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import 'jest-styled-components';
import Adapter from 'enzyme-adapter-react-16';
import ProductModal from '../ProductModal';

Enzyme.configure({ adapter: new Adapter() });

const item = {
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
  };

describe('ProductModal Component', () => {

    it('renders correctly', () => {
        const wrapper = shallow(
            <ProductModal 
                item = { item }
                toggleModal = { () => {} }
                addItem = { () => {} }
                removeItem = { () => {} }
            />
        );
        expect(wrapper.debug()).toMatchSnapshot(); 
    });
});
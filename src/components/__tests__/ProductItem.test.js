import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import 'jest-styled-components';
import Adapter from 'enzyme-adapter-react-16';
import ProductItem from '../ProductItem';

Enzyme.configure({ adapter: new Adapter() });

const product = {
    product: 'shirt',
    price: 20,
    quantity: 3,
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
};

describe('ProductItem Component', () => {

    it('renders correctly', () => {
        const wrapper = shallow(
            <ProductItem 
                product = { product }
                updateQuantity = { () => {} }
            />
        );
        expect(wrapper.debug()).toMatchSnapshot(); 
    });
});
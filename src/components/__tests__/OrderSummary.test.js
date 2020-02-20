import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import 'jest-styled-components';
import Adapter from 'enzyme-adapter-react-16';
import OrderSummary from '../OrderSummary';
import theme from '../../styles/theme';
import { ThemeProvider } from 'styled-components';

jest.mock("../../services/PromosService");

Enzyme.configure({ adapter: new Adapter() });

const shoppingCart = [
    {
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
    }
];

describe('OrderSummary Component', () => {

  it('renders correctly', () => {
    const wrapper = shallow(
        <OrderSummary 
            shoppingCart = { shoppingCart }
        />
    );
    expect(wrapper.debug()).toMatchSnapshot(); 
  });

  it('fetches data and updates state', (done) => {
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <OrderSummary 
            shoppingCart = { shoppingCart }
        />
      </ThemeProvider>
    ).dive().dive();

    setTimeout(() => {
      wrapper.update();

      const state = wrapper.instance().state;
      expect(state.activeCodes.length).toEqual(2);

      done();
    });
});
});
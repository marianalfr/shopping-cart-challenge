import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App.js';

Enzyme.configure({ adapter: new Adapter() });

describe('App Component', () => {

    it('renders correctly', () => {
        const wrapper = shallow(
            <App/>
        );
        expect(wrapper.debug()).toMatchSnapshot(); 
    });
});
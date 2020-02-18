import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProductList from './ProductList';

// Styled Components -->

const Wrapper = styled.section`
    padding: 40px 32px 40px 56px;
    flex: 1;
`;

const TitleMain = styled.h1`
    ${props => props.theme.title.main};
    border-bottom: ${props => props.theme.border.bottom};
`;

// ShoppingCart Component ------------------------------------------------------------->

const ShoppingCart = props => {
    return(
        <Wrapper>
            <TitleMain>Shopping cart</TitleMain>
            <ProductList
                shoppingCart = { props.shoppingCart }
                updateQuantity = { props.updateQuantity }
            />
        </Wrapper>
    );
};

ShoppingCart.propTypes = {
    shoppingCart: PropTypes.arrayOf(PropTypes.shape({
        product: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
        code: PropTypes.string,
        description: PropTypes.string,
        images: PropTypes.shape({
            thumb: PropTypes.string,
            large: PropTypes.string
        }),
        offer: PropTypes.shape({
            type: PropTypes.shape({
                category: PropTypes.string,
                name: PropTypes.string,
                numbers: PropTypes.shape({
                    percentage: PropTypes.number,
                    get: PropTypes.number,
                    pay: PropTypes.number
                })
            }),
            minQty: PropTypes.number 
        })
    })),
    updateQuantity: PropTypes.func
};

export default ShoppingCart;
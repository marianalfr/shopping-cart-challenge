import React from 'react';
import styled from 'styled-components';
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

// ShoppingCart Component -->

const ShoppingCart = props => {
    return(
        <Wrapper>
            <TitleMain>Shopping cart</TitleMain>
            <ProductList
                shoppingCart = { props.shoppingCart }
                updateQuantity = { props.updateQuantity }
            />
        </Wrapper>
    )
} 

export default ShoppingCart;
import React from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';

// Styled Components -->

const TableHead = styled.div`
    position: relative;
    width: 100%;
    padding: 32px 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
`;

const ColProduct = styled.div`
    width: 45%;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
`;

const Col = styled.div`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ColTotal = styled.div`
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TitleTable = styled.h2`
    color: ${props => props.theme.color.light};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 10px;
    line-height: 16px;
`;

// ProductList Component -->

const ProductList = props => {
    return(
        <React.Fragment>
            <TableHead>
                <ColProduct>
                    <TitleTable>Product details</TitleTable>
                </ColProduct>
                <Col>
                    <TitleTable>Quantity</TitleTable>
                </Col>
                <Col>
                    <TitleTable>Price</TitleTable>
                </Col>
                <ColTotal>
                    <TitleTable>Total</TitleTable>
                </ColTotal>
            </TableHead>
            <ul>
                {props.shoppingCart.map(product => <li key={product.code}>
                        <ProductItem product = {product}/>
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
} 

export default ProductList;
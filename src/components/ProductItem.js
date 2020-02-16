import React from 'react';
import styled from 'styled-components';

// Styled Components -->

const Row = styled.div`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 32px;
`;

const ColProduct = styled.div`
    width: 45%;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
`;

const Image = styled.img`
    margin-right: 16px;
    width: 72px;
    height: 72px;
    border: 1px solid ${props => props.theme.color.lighter};
    border-radius: 4px;
`;

const Title = styled.h1`
    ${props => props.theme.title.product}
`;

const Code = styled.p`
    border-radius: 4px;
    color: ${props => props.theme.color.light};
    letter-spacing: 0.13px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
`;

const Col = styled.div`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    padding: 0 8px;
    height: 40px;
    border: none;
    background: transparent;
    color: ${props => props.theme.color.main};
    font-weight: bold;
    cursor: pointer;
    font-size: 20px;
    line-height: 25px;
`;

const Quantity = styled.input`
    width: 40px;
    height: 40px;
    border: 2px solid #dbdbe0;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    line-height: 17px;
`;

const Span = styled.span`
    color: ${props => props.theme.color.darkest};
    font-size: 16px;
    margin-right: 4px;
`;

const ColTotal = styled.div`
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OfferDot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.color.main}; 
    position: absolute;
    left: 65px;
    top: -3px;
    align-self: flex-start;
`;

const Offer = styled.p`
    color: ${props => props.theme.color.main};
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
`;

// ProductItem Component -->

const ProductItem = props => {

    const addItem = () => {
        props.updateQuantity(props.product.code, 1);
    }

    const removeItem = () => {
        props.updateQuantity(props.product.code, -1);
    }

    return(
        <Row>
            <ColProduct>
                {props.product.offer.type !== null ? <OfferDot></OfferDot> : ''}
                <Image src={props.product.image} alt={props.product.product}/>
                <div>
                    <Title>{props.product.product}</Title>
                    <Code>Product Code {props.product.code}</Code>
                    {props.product.offer.type !== null ? <Offer>{props.product.offer.type} when buying {props.product.offer.minQty} or more.</Offer> : ''}
                </div>
            </ColProduct>
            <Col>
                <Button onClick={removeItem}>-</Button>
                <Quantity type="text" value={props.product.quantity} readOnly></Quantity>
                <Button onClick={addItem}>+</Button>
            </Col>
            <Col>
                <Span>{props.product.price}</Span>
                <Span>€</Span>
            </Col>
            <ColTotal>
                <Span>{props.product.price * props.product.quantity}</Span>
                <Span>€</Span>
            </ColTotal>
        </Row>
    )
} 

export default ProductItem;
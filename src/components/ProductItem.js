import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProductModal from './ProductModal';
import { AddRemoveButton, Quantity } from './Elements';

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
    ${props => props.theme.title.product};
    cursor: pointer;

    &:hover{
        color: ${props => props.theme.color.mainDark}
    }
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

// ProductItem Component ------------------------------------------------------------->

const ProductItem = props => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const addItem = () => {
        props.updateQuantity(props.product.code, 1);
    };

    const removeItem = () => {
        if(props.product.quantity > 0){
            props.updateQuantity(props.product.code, -1);
        };
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return(
        <React.Fragment>
            <Row>
                <ColProduct>
                    {props.product.offer.type.name !== null ? <OfferDot></OfferDot> : ''}
                    <Image src={props.product.images.thumb} alt={props.product.product}/>
                    <div>
                        <Title onClick={toggleModal}>{props.product.product}</Title>
                        <Code>Product Code {props.product.code}</Code>
                        {props.product.offer.type.name !== null ? <Offer>{props.product.offer.type.name} when buying {props.product.offer.minQty} or more.</Offer> : ''}
                    </div>
                </ColProduct>
                <Col>
                    <AddRemoveButton onClick={removeItem}>-</AddRemoveButton>
                    <Quantity type="text" value={props.product.quantity} readOnly></Quantity>
                    <AddRemoveButton onClick={addItem}>+</AddRemoveButton>
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
            {isModalOpen === true ? (
                <ProductModal 
                    product = {props.product}
                    toggleModal = {toggleModal}
                    addItem = {addItem}
                    removeItem = {removeItem}
                />) : ''}
        </React.Fragment>
    );
};

ProductItem.propTypes = {
    product:PropTypes.shape({
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
    }),
    updateQuantity: PropTypes.func
};

export default ProductItem;
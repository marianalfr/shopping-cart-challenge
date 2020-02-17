import React from 'react';
import styled from 'styled-components';
import { Button, AddRemoveButton, Quantity } from './Elements';

// Styled Components -->

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  max-width: 1088px;
  max-height: 648px;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${props => props.theme.color.lightest};
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const ImageWrapper = styled.div`
    height: 100%;
    flex: 1;
    background-image: ${props => `url(${props.product.images.large})`};
    background-size: cover;
    background-position: center;
`;

const InfoWrapper = styled.aside`
  display: flex;
  flex-flow: column wrap;
  padding: 32px;
  width: 312px;
  color: ${props => props.theme.color.mainDark};
`;

const Close = styled.div`
    width: 100%;
    text-align: right;
    align-self: flex-end;
    cursor: pointer;
    font-size: 25px;
    color: ${props => props.theme.color.light};
`;

const Info = styled.div`
    width: 100%;
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`;

const Title = styled.h1`
    width: 100%;
    padding-bottom: 16px;
    border-bottom: ${props => props.theme.border.bottom};
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    line-height: 17px;
    text-transform: capitalize;
`;

const Description = styled.p`
    padding: 16px 0 32px 0;
    border-bottom: ${props => props.theme.border.bottom};
    font-size: 14px;
`;

const Offer = styled.p`
    width: 100%;
    text-align: left;
    color: ${props => props.theme.color.main};
    padding: 16px 0;
    border-bottom: ${props => props.theme.border.bottom};
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
`;

const Code = styled.p`
    padding: 12px 0;
    color: ${props => props.theme.color.light};
    letter-spacing: 0.13px;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    align-self: flex-start;
`;

const Cart = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const Bold = styled.p`
    padding: 16px 0;
    font-size: 14px;
    font-weight: bold;
    align-self: flex-start;
    
`;

const AddRemove = styled.div`
    display: flex;
`;

// ProductModal Component -->

const ProductModal = props => {
    return(
        <ModalWrapper>
            <ImageWrapper product = {props.product}></ImageWrapper>
            <InfoWrapper>
                <Close onClick={props.toggleModal}>✕</Close>
                <Info>
                    <Title>
                        <span>{props.product.product}</span>
                        <span>{props.product.price}€</span>
                    </Title>
                    {props.product.offer.type !== null ? (
                    <Offer>Offer: {props.product.offer.type} when you buy {props.product.offer.minQty} or more.</Offer>
                    ) : ''}
                    <Description>{props.product.description}</Description>
                    <Code>Product code: {props.product.code}</Code>
                </Info>
                <Cart>
                    {props.product.quantity !== 0 ? (
                        <React.Fragment>
                            <Bold>Currently in your shopping cart:</Bold>
                            <AddRemove>
                                <AddRemoveButton onClick={props.removeItem}>-</AddRemoveButton>
                                <Quantity type="text" value={props.product.quantity} readOnly></Quantity>
                                <AddRemoveButton onClick={props.addItem}>+</AddRemoveButton>
                            </AddRemove>
                        </React.Fragment>
                    ) : (
                        <Button type="button" onClick={props.addItem}>Add to cart</Button>
                    )}
                </Cart>
            </InfoWrapper>
        </ModalWrapper>
    )
};

export default ProductModal;
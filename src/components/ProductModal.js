import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
    background-image: ${props => `url(${props.item.product.images.large})`};
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

// ProductModal Component ------------------------------------------------------------->

const ProductModal = props => {
    return(
        <ModalWrapper>
            <ImageWrapper item = {props.item}></ImageWrapper>
            <InfoWrapper>
                <Close onClick={props.toggleModal}>✕</Close>
                <Info>
                    <Title>
                        <span>{props.item.product.name}</span>
                        <span>{props.item.product.price}€</span>
                    </Title>
                    {props.item.product.offer.type.name !== null ? (
                    <Offer>Offer: {props.item.product.offer.type.name} when you buy {props.item.product.offer.minQty} or more.</Offer>
                    ) : ''}
                    <Description>{props.item.product.description}</Description>
                    <Code>Product code: {props.item.product.code}</Code>
                </Info>
                <Cart>
                    {props.item.quantity !== 0 ? (
                        <React.Fragment>
                            <Bold>Currently in your shopping cart:</Bold>
                            <AddRemove>
                                <AddRemoveButton onClick={props.removeItem}>-</AddRemoveButton>
                                <Quantity type="text" value={props.item.quantity} readOnly></Quantity>
                                <AddRemoveButton onClick={props.addItem}>+</AddRemoveButton>
                            </AddRemove>
                        </React.Fragment>
                    ) : (
                        <Button type="button" onClick={props.addItem}>Add to cart</Button>
                    )}
                </Cart>
            </InfoWrapper>
        </ModalWrapper>
    );
};

// ProductModal.propTypes = {
//     product:PropTypes.shape({
//         product: PropTypes.string,
//         price: PropTypes.number,
//         quantity: PropTypes.number,
//         code: PropTypes.string,
//         description: PropTypes.string,
//         images: PropTypes.shape({
//             thumb: PropTypes.string,
//             large: PropTypes.string
//         }),
//         offer: PropTypes.shape({
//             type: PropTypes.shape({
//                 category: PropTypes.string,
//                 name: PropTypes.string,
//                 numbers: PropTypes.shape({
//                     percentage: PropTypes.number,
//                     get: PropTypes.number,
//                     pay: PropTypes.number
//                 })
//             }),
//             minQty: PropTypes.number 
//         })
//     }),
//     toggleModal: PropTypes.func,
//     addItem: PropTypes.func,
//     removeItem: PropTypes.func
// };

export default ProductModal;
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Input } from './Elements';

// Styled Components -->

const Wrapper = styled.aside`
  display: flex;
  flex-flow: column wrap;
  padding: 40px 32px;
  width: 312px;
  background-color: ${props => props.theme.color.bgLight};
  color: ${props => props.theme.color.mainDark};
`;

const TitleMain = styled.h1`
    ${props => props.theme.title.main};
    border-bottom: ${props => props.theme.border.bottom};
`;

const Summary = styled.div`
    width: 100%;
    padding: 32px 0;
    border-bottom: ${props => props.theme.border.bottom};
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 17px;
`;

const Bold = styled.span`
    font-weight: bold;
    font-size: 16px;
`;

const Discounts = styled.div`
    width: 100%;
    border-bottom: ${props => props.theme.border.bottom};
    padding: 24px 0;
`;

const TitleDisc = styled.h2`
    color: ${props => props.theme.color.dark};
    letter-spacing: 0;
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
`;

const LiDisc = styled.li`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 17px;
    margin-top: 16px;

    &:last-child{
        cursor: pointer;
    }
`;

const BoldDisc = styled.span`
    font-weight: bold;
    font-size: 14px;
`;

const Total = styled.div`
    width: 100%;
    padding: 32px 0;
    align-self: flex-end;
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 16px;
    padding-bottom: 0;
    border-top: 1px solid rgba(33, 34, 64, 0.16);
    color: ${props => props.theme.color.mainDark};
`;

const TitleTotal = styled.span`
    font-size: 14px;
    line-height: 17px;
    flex-basis: 100%;
    text-transform: uppercase;
`;

const TotalBold = styled.span`
    font-size: 20px;
    line-height: 25px;
    flex-basis: 100%;
    text-transform: uppercase;
    font-weight: bold;
    text-align: right;
`;

const Arrow = styled.span`
    font-size: 25px;
    cursor: pointer;
    position: relative;
    top: 2px;
`;

const CodeWrapper = styled.div`
    margin-top: -10px;
    width: 100%;
    max-height: 0px;
    position: relative;
    transition: max-height .5s ease;
    overflow: hidden;
    font-size: 14px;
    color: ${props => props.theme.color.dark};

    & p:last-child{
        font-size: 12px;
        margin-top: 10px;
    }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    width: 100px;
    opacity: 0;
    position: relative;
    top: -19px;
    cursor: pointer;

    &:checked + ${CodeWrapper} {
        max-height: 100px;
    }
`;

// OrderSummary Component ------------------------------------------------------------->

const OrderSummary = props => {

    const renderDiscounts = discounts => {
        if(discounts !== ''){
            return (discounts.map(discount => discount.product.quantity >= discount.offer.minQty ? <LiDisc key={discount.product.code}>
                {discount.offer.category === 'percentage' ? (
                <span>x{discount.product.quantity} {discount.product.name} offer</span>
                ) : discount.offer.category === 'free-item' ? (
                <span>{discount.offer.name} {discount.product.name} offer</span>
                ) : ''}
                
                <BoldDisc>-{discount.discount}€</BoldDisc>
            </LiDisc> : ''));
        };
    }; 

    const applyPromoCode = e => {
        const code = e.target.value;
        props.applyPromoCode(code);
    };

    const renderPromoCode = () => {
        return(
            <LiDisc>
                <span>Promo code <Arrow>⌄</Arrow></span>
                <BoldDisc>-{props.orderBreakdown.promo.discount !== 0 ? props.orderBreakdown.promo.discount : 0}€</BoldDisc>
            </LiDisc>
        );
    };

    return(
        <Wrapper>
            <TitleMain>Order summary</TitleMain>
            <Summary>
                <span>{props.orderBreakdown.items} Items</span>
                <Bold>{props.orderBreakdown.totalPrice} €</Bold>
            </Summary>
            <Discounts>
                <TitleDisc>Discounts</TitleDisc>
                <ul>
                    {renderDiscounts(props.orderBreakdown.discounts)}
                    {renderPromoCode()}
                </ul>
                <HiddenCheckbox checked={props.isCodeValid === true ? false : null} onClick={props.getPromoCodes}></HiddenCheckbox>
                <CodeWrapper>
                    <p>Do you have a promo code?</p>
                    <Input type="text" value={props.userCode} onChange={applyPromoCode}></Input>
                    {props.userCode.length >= 6 && props.isCodeValid === false ? (<p>Sorry, that code is not currently available.</p>) : ''}
                </CodeWrapper>
            </Discounts>
            <Total>
                <TitleTotal>Total cost</TitleTotal>
                <TotalBold>{props.orderBreakdown.finalPrice}€</TotalBold>
            </Total>
            <Button type="button">Checkout</Button>
        </Wrapper>
    );
};

// OrderSummary.propTypes = {
//     shoppingCart: PropTypes.arrayOf(PropTypes.shape({
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
//     }))
// };

export default OrderSummary;
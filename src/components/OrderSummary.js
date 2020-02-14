import React from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
    margin-top: 24px;
    padding-top: 16px;
    padding-bottom: 16px;
    width: 100%;
    border-radius: 4px;
    background: ${props => props.theme.color.main};
    color: ${props => props.theme.color.lightest};
    font-size: 16px;
    font-weight: bold;
    line-height: 14px;
    cursor: pointer;
`;

// OrderSummary Component -->

const OrderSummary = props => {

    const totalItems = cart => {
        let quantity = 0;
        for (let item of cart) {
            quantity = quantity + item.quantity;
        };
        return quantity;
    };

    const totalPrice = cart => {
        let total = 0;
        for (let item of cart){
            const price = item.price * item.quantity;
            total = total + price;
        };
        return total;
    };

    return(
        <Wrapper>
            <TitleMain>Order summary</TitleMain>
            <Summary>
                <span>{totalItems(props.shoppingCart)} Items</span>
                <Bold>{totalPrice(props.shoppingCart)} €</Bold>
            </Summary>
            <Discounts>
                <TitleDisc>Discounts</TitleDisc>
                <ul>
                    <LiDisc>
                        <span>2x1 Mug offer</span>
                        <BoldDisc>-10€</BoldDisc>
                    </LiDisc>
                    <LiDisc>
                        <span>x3 Shirt offer</span>
                        <BoldDisc>-3€</BoldDisc>
                    </LiDisc>
                    <LiDisc>
                        <span>Promo code</span>
                        <BoldDisc>0€</BoldDisc>
                    </LiDisc>
                </ul>
            </Discounts>
            <Total>
                <TitleTotal>Total cost</TitleTotal>
                <TotalBold>107€</TotalBold>
            </Total>
            <Button type="button">Checkout</Button>
        </Wrapper>
    )
} 

export default OrderSummary;
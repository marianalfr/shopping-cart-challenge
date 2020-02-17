import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Input } from './Elements';
import fetchPromoCodes from '../services/PromosService'

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

    //I am adding a promo code functionality. I am also assuming that these codes are regularly updated/removed by the seller as required.
    const [activeCodes, setActiveCodes] = useState(['']);
    const [userCode, setUserCode] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(null);
    const [promoCodeDiscount, setPromoCodeDiscount] = useState(0);

    //Calculate totals

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

    //Discount functions (we would have as many as available offer types)

    const twoForOne = product => {
        const quantity = product.quantity;
        const price = product.price;
        const minQty = product.offer.minQty;

        if (quantity >= minQty){
            if (quantity % 2 === 0) {
                const discountUnits = quantity / 2;
                const discount = discountUnits * price;
                return discount;
            } else {
                const discountUnits = (quantity - 1) / 2;
                const discount = discountUnits * price;
                return discount;
            };
        } else {
            return 0;
        };
    };

    const fivePercent = product => {
        const quantity = product.quantity;
        const price = product.price;
        const minQty = product.offer.minQty;

        if (quantity >= minQty) {
            const discount = (price * 0.05) * product.quantity;
            return discount;
        } else {
            return 0;
        };
    };

    const applyPromoCode = e => {
        const code = e.target.value;
        setUserCode(code);
        const promo = activeCodes.find(promo => promo.code === code);

        if(promo !== undefined){
            setIsCodeValid(true);
            setPromoCodeDiscount(promo.discount);
            return promo.discount;
        } else {
            setIsCodeValid(false);
            return 0;
        };
    };

    //Fetch Promo codes on user click
    const getPromoCodes = () => {
        fetchPromoCodes()
        .then(promos => setActiveCodes([...promos]))
        .catch(error => console.log(error));
    }

    //Render each discount (we would have as many render functions as available offer types)

    const renderTwoForOne = () => {
        const twoForOneOffers = props.shoppingCart.filter(product => product.offer.type === '2x1');

        if(twoForOneOffers !== ''){
            return (twoForOneOffers.map(product => product.quantity >= product.offer.minQty ? <LiDisc key={product.code}>
                <span>2x1 {product.product} offer</span>
                <BoldDisc>-{twoForOne(product)}€</BoldDisc>
            </LiDisc> : ''));
        };
    };

    const renderFivePercent = () => {
        const fivePercentOffers = props.shoppingCart.filter(product => product.offer.type === '-5%');

        if(fivePercentOffers !== ''){
            return (fivePercentOffers.map(product => product.quantity >= product.offer.minQty ? <LiDisc key={product.code}>
                <span>x{product.quantity} {product.product} offer</span>
                <BoldDisc>-{fivePercent(product)}€</BoldDisc>
            </LiDisc> : ''));
        };
    };

    const renderPromoCode = () => {
        return(
            <LiDisc>
                <span>Promo code <Arrow>⌄</Arrow></span>
                <BoldDisc>-{promoCodeDiscount !== 0 ? promoCodeDiscount : 0}€</BoldDisc>
            </LiDisc>
        );
    };

    //Calculate final price
    const finalPrice = () => {
        //Get total:
        const total = totalPrice(props.shoppingCart);

        //Get 2x1 total discount:
        const twoForOneOffers = props.shoppingCart.filter(product => product.offer.type === '2x1');
        let twoForOneDiscount = 0;
        if (twoForOneOffers !== ''){
            for (let product of twoForOneOffers){
                const discount = twoForOne(product);
                twoForOneDiscount = twoForOneDiscount + discount;
            };
        };
        
        //Get 5% total discount:
        const fivePercentOffers = props.shoppingCart.filter(product => product.offer.type === '-5%');
        let fivePercentDiscount = 0;
        if(fivePercentOffers !== ''){
            for (let product of fivePercentOffers){
                const discount = fivePercent(product);
                fivePercentDiscount = fivePercentDiscount + discount;
            };
        };

        //Get final price:
        const final = total - twoForOneDiscount - fivePercentDiscount - promoCodeDiscount;
        return final;
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
                    {renderTwoForOne()}
                    {renderFivePercent()}
                    {renderPromoCode()}
                </ul>
                <HiddenCheckbox checked={isCodeValid === true ? false : null} onClick={getPromoCodes}></HiddenCheckbox>
                <CodeWrapper>
                    <p>Do you have a promo code?</p>
                    <Input type="text" value={userCode} onChange={applyPromoCode}></Input>
                    {userCode.length >= 6 && isCodeValid === false ? (<p>Sorry, that code is not currently available.</p>) : ''}
                </CodeWrapper>
            </Discounts>
            <Total>
                <TitleTotal>Total cost</TitleTotal>
                <TotalBold>{finalPrice()}€</TotalBold>
            </Total>
            <Button type="button">Checkout</Button>
        </Wrapper>
    );
};

OrderSummary.propTypes = {
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
            type: PropTypes.string,
            minQty: PropTypes.number 
        })
    }))
};

export default OrderSummary;
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

    //I am adding a promo code functionality and for that I need state management. I am again assuming that these codes are regularly updated/removed by the seller as required and that they are stored in a database that can be accessed through an API. For this to work the express server must be running (on a new terminal window/tab run --$ node server.js).
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

    //DISCOUNT FUNCTIONS (we would have as many as available offer types):

    //This function takes a single product as an argument. For products under an offer that gives one or more free items like '2x1', '3x2' or even '5x3', this function takes this data from the product offer and returns the discount for said product.
    const freeItem = product => {
        const n = product.quantity;
        const price = product.price;
        const minQty = product.offer.minQty;

        // Offer would be something like 'get x products and pay y products' (x for y)
        const x = product.offer.type.numbers.get;
        const y = product.offer.type.numbers.pay;
        const increment = x - y;

        if (n >= minQty && n >= x){
            for(let i = 0; i < x; i++){
                if((n - i) % x === 0){
                    const units = (n - i) / x;
                    const discount = (units * increment * price);
                    return discount;
                };
            };
        };
    };

    //This function takes a single product as an argument. It returns the discount for a product under an offer that reduces the price by a certain percentage.
    const percentageDiscount = product => {
        const quantity = product.quantity;
        const price = product.price;
        const minQty = product.offer.minQty;

        const per = product.offer.type.numbers.percentage;

        if (quantity >= minQty) {
            const discount = (price * (per / 100) * product.quantity);
            return discount;
        } else {
            return 0;
        };
    };

    //This function validates promotional codes and given a successful result it returns the discount associated to that code.
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

    //Fetch Promo codes on user click simulating an API call. For this to work the express server must be running (on a new terminal window/tab run --$ node server.js).
    const getPromoCodes = () => {
        fetchPromoCodes()
        .then(promos => setActiveCodes([...promos]))
        .catch(error => console.log(error));
    }

    //RENDER DISCOUNTS (we would have as many render functions as available offer types):

    //This function finds all the products with a 'free-item' discount type and renders them within the summary.
    const renderFreeItem = () => {
        const freeItemOneOffers = props.shoppingCart.filter(product => product.offer.type.category === 'free-item');

        if(freeItemOneOffers !== ''){
            return (freeItemOneOffers.map(product => product.quantity >= product.offer.minQty ? <LiDisc key={product.code}>
                <span>{product.offer.type.name} {product.product} offer</span>
                <BoldDisc>-{freeItem(product)}€</BoldDisc>
            </LiDisc> : ''));
        };
    };

    //This function finds all the products with a 'percentage' discount type and renders them within the summary.
    const renderPercentageDiscount = () => {
        const percentageOffers = props.shoppingCart.filter(product => product.offer.type.category === 'percentage');

        if(percentageOffers !== ''){
            return (percentageOffers.map(product => product.quantity >= product.offer.minQty ? <LiDisc key={product.code}>
                <span>x{product.quantity} {product.product} offer</span>
                <BoldDisc>-{percentageDiscount(product)}€</BoldDisc>
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

        //Get 'freeItem' total discounts:
        const freeItemOneOffers = props.shoppingCart.filter(product => product.offer.type.category === 'free-item');
        let freeItemDiscount = 0;
        if (freeItemOneOffers !== ''){
            for (let product of freeItemOneOffers){
                const discount = freeItem(product);
                freeItemDiscount = freeItemDiscount + discount;
            };
        };
        
        //Get percentage offers total discount:
        const percentageOffers = props.shoppingCart.filter(product => product.offer.type.category === 'percentage');
        let percentDiscount = 0;
        if(percentageOffers !== ''){
            for (let product of percentageOffers){
                const discount = percentageDiscount(product);
                percentDiscount = percentDiscount + discount;
            };
        };

        //Get final price:
        const final = total - freeItemDiscount - percentDiscount - promoCodeDiscount;
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
                    {renderFreeItem()}
                    {renderPercentageDiscount()}
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
    }))
};

export default OrderSummary;
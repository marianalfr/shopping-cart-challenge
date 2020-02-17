import styled from 'styled-components';

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

const AddRemoveButton = styled.button`
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

export { Button, AddRemoveButton, Quantity };
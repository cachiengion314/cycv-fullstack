import React from 'react';
import styled from "styled-components";

const InputStyled = styled.input`
    display: block;
    width: ${props => props.width ? props.width : "inherit"};
    height: ${props => props.height ? props.height : "fit-content"};
    border: ${props => props.border || "1px black solid"};
    border-radius: ${props => props.borderRadius || ".5rem"};
    font-size: ${props => props.fontSizing || "1rem"};
    font-weight: ${props => props.fontWeight || "normal"};
    color: ${props => props.color || "black !important"};
    text-align: ${props => props.textAlign || "inherit"};
    z-index: ${props => props.zIndex || "1"};
    padding-left: .3rem;
    padding-right: .3rem;
    padding-top: 0rem;
    padding-bottom: 0rem;
    &:focus {
        color: darkcyan;
        background-color: white;
        border-color: darkcyan;
        outline: none;
        box-shadow: none;
    }
    &:disabled {
        background-color: #f1f1f1;
    }
    &:active {
        background-color: white;
    }
    &:hover:enabled {
        background-color: white;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
`;

const Input = ({ onClick, onKeyUp, placeholder, zIndex, readOnly, maxLength, fontSize, fontWeight, color, textAlign, border, borderRadius, name, onChange, value, type, width, height, reference, className }) => {
    return (
        <InputStyled
            ref={reference}
            placeholder={placeholder}
            fontSizing={fontSize}
            fontWeight={fontWeight}
            border={border}
            textAlign={textAlign}
            borderRadius={borderRadius}
            name={name}
            maxLength={maxLength || "50"}
            onChange={onChange}
            value={value}
            color={color}
            zIndex={zIndex}
            readOnly={readOnly}
            type={type || "text"}
            width={width} height={height}
            onClick={onClick}
            onKeyUp={onKeyUp}
            className={className}
        />
    );
}

export default Input;
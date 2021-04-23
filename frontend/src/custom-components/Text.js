import React from 'react';
import styled from "styled-components";

const Styled = styled.div`
    line-height: ${props => props.lineHeight || "inherit"};
    font-size: ${props => props.fontSizing || "1rem"};
    font-weight: ${props => props.fontWeight || "normal"};
    color: ${props => props.color || "black"};
    text-align: ${props => props.textAlign || "inherit"};
    width: ${props => props.width || "fit-content"};
    height: ${props => props.height || "fit-content"};
    z-index: ${props => props.zIndex || "1"};
    cursor: pointer;
`;

function Text({ onClick, onDoubleClick, onMouseEnter, onMouseLeave, zIndex, width, href, children, lineHeight, className, fontWeight, textAlign, fontSize, color, reference }) {
    return (
        <Styled
            ref={reference}
            width={width}
            lineHeight={lineHeight}
            fontWeight={fontWeight}
            textAlign={textAlign}
            fontSizing={fontSize}
            color={color}
            zIndex={zIndex}
            className={className}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            href={href}
        >
            {children}
        </Styled>
    );
}

export default Text
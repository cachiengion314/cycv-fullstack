import React from 'react';
import styled from "styled-components";

const Div = styled.div`
    display: ${props => props.display || props.flexbox && "flex" || "block"};
    flex-wrap: ${props => props.flexbox ? "wrap" : "nowrap"};
    padding: ${props => props.padding || "0"};
    border: ${props => props.border || "0"};
    border-radius: ${props => props.borderRadius || "0"};
    background: ${props => props.background ? props.background : "inherit"};
    width: ${props => props.width ? props.width : "fit-content"};
    height: ${props => props.height || "fit-content"};
    z-index: ${props => props.zIndex || "auto"};
`;

const Block = ({ style, className, onClick, reference, zIndex, id, onDrop, onDragEnd, onDragLeave, onDragOver, onDragStart, draggable, display, padding, width, height, border, borderRadius, background, flexbox, children }) => {
    return (
        <Div
            id={id}
            ref={reference}
            display={display}
            zIndex={zIndex}
            flexbox={flexbox}
            padding={padding}
            width={width} height={height}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            draggable={draggable}
            onDragLeave={onDragLeave}
            onDragEnd={onDragEnd}
            onClick={onClick}
            background={background}
            border={border}
            borderRadius={borderRadius}
            className={className}
            style={style}
        >
            {children}
        </Div>
    )
}

export default Block;
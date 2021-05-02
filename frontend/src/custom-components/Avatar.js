import React from 'react';
import styled from "styled-components";

const Div = styled.div`
    width: ${props => props.width ? props.width : "128px"};
    height: fit-content;
    position: relative;
`;
const Img = styled.img`
    border-radius: .5rem;
    width: 100%;
    height: 100%;
    background-color: ${props => props.background || "inherit"};
`;
const WHequalContent = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: ${props => props.zIndex || "inherit"};
    padding: ${props => props.padding || "0"};
`;
const WHequalPointer = styled.div`
    padding-top: 100%;
`;

const Avatar = ({ padding, onClick, zIndex, width, alt, src, background, className }) => {
    return (
        <Div width={width} className={className} onClick={onClick}>
            <WHequalPointer></WHequalPointer>
            <WHequalContent zIndex={zIndex} padding={padding}>
                <Img
                    src={src}
                    background={background}
                    alt={alt}
                />
            </WHequalContent>
        </Div>
    );
}

export default Avatar;
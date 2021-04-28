import React from 'react';
import styled from "styled-components";

const Div = styled.div`
    position: relative;
    width: ${props => props.width ? props.width : "128px"};
    height: fit-content;
`;
const Img = styled.img`
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    background-color: ${props => props.background || "inherit"};
`;
const WHequalContent = styled.div`
    position: absolute;
    padding: ${props => props.padding || "0"};
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition-property: top width height;
    transition: all .3s ease;
    &:hover {
        top: ${p => p.hoverTop || "-.5rem"};
        width: ${props => props.hoverWidth || "110%"};
        height: ${props => props.hoverWidth || "110%"};
    }
`;
const WHequalPointer = styled.div`
    padding-top: 100%;
`;

const EditableAvatar = ({ padding, width, src, background, hoverWidth, hoverTop, onClick, className }) => {
    return (
        <Div width={width} className={className}>
            <WHequalPointer></WHequalPointer>
            <WHequalContent padding={padding} hoverWidth={hoverWidth} hoverTop={hoverTop} onClick={onClick}>
                <Img
                    src={src}
                    background={background}
                />
            </WHequalContent>
        </Div>
    );
}

export default EditableAvatar;
import React from 'react';
import styled from "styled-components";
import Utility from "./Utility";

const ModalStyled = styled.div`
    display: ${props => props.display || "block"};
    z-index: ${props => props.zIndex || "11"};
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .2);
    overflow: scroll;
`;

const ModalContentStyled = styled.div`
    height: ${props => props.height || "fit-content"};
    width: ${props => props.width || "50%"};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .7rem;
    margin: 3rem auto;
    background-color: white;
    border: 1px solid darkblue;
    border-radius: 1rem;
    @media (max-width : ${props => props.mediaMaxWidth || "600px"}){
        & {
            width: 90%;
        }
    }
`;

const Modal = ({ width, isModalShow, zIndex, className, mediaMaxWidth, children }) => {
    const calculateModalWidth = () => {
        let normalModalWidth = (1000 / window.innerWidth * 40);
        if (normalModalWidth > 90) {
            normalModalWidth = 90;
        }
        if (normalModalWidth < 40) {
            normalModalWidth = 50;
        }
        let bigModalWidth = normalModalWidth * 1.25;
        normalModalWidth = Utility.convertToMetric(normalModalWidth, "%");
        bigModalWidth = Utility.convertToMetric(bigModalWidth, "%");
        return { normalModalWidth, bigModalWidth }
    }

    return (
        <ModalStyled display={isModalShow && "block" || "none"} zIndex={zIndex} className={className}>
            <ModalContentStyled width={width || calculateModalWidth().normalModalWidth} mediaMaxWidth={mediaMaxWidth}>
                {children}
            </ModalContentStyled>
        </ModalStyled>
    )
}

export default Modal
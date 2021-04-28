import styled from "styled-components";

const Button = styled.button`
    display: ${props => props.isHide && "none" || "block"};
    width: ${props => props.width ? props.width : "auto"};
    height: ${props => props.height ? props.height : "fit-content"};
    border: ${props => props.border || "1px solid black"};
    background-color: ${props => props.backgroundColor || "inherit"};
    border-radius: ${props => props.borderRadius || ".5rem"};
    color: ${props => props.color || "black"};
    font-size: ${props => props.fontSize || "1.2rem"};
    z-index: ${props => props.zIndex || "inherit"};
    visibility: ${props => props.isHide && "hidden" || "visible"};
    outline-width: 0;
    padding-right: .5rem;
    padding-left: .5rem;
    transition-property: background;
    transition: all .5s ease;
    &:disabled {
        background-color: #f1f1f1;
    }
    &:focus {
        background-color: inherit;
        outline: none;
    }
    &:active {
        background-color: #e2ffe4;
    }
    &:hover:enabled {
        background: #f7f7e2;
    }
`;

const CustomButton = ({ id, isHide, reference, zIndex, width, color, fontSize, border, borderRadius, backgroundColor, height, className, onClick, children }) => {
    return (
        <Button
            id={id}
            isHide={isHide}
            width={width}
            height={height}
            ref={reference || null}
            zIndex={zIndex}
            border={border}
            color={color}
            fontSize={fontSize}
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            className={className}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

export default CustomButton
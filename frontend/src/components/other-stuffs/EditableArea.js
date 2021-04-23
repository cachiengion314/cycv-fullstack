import React from 'react';
import Text from "../../custom-components/Text";
import styled from "styled-components";
import Input from "../../custom-components/Input";
import Button from "../../custom-components/Button";
import Vars from "../other-stuffs/Vars";

const EditableAreaStyle = styled.div`
    position: relative;
    z-index: ${props => props.zIndex || "auto"};
    width: ${props => props.width || "fit-content"};
`;

const AreaModified = styled.textarea`
    display: ${props => props.display || "block"};
    width: ${props => props.width ? props.width : "inherit"};
    height: ${props => props.height ? props.height : "fit-content"};
    border: ${props => props.border || "1px black solid"};
    border-radius: ${props => props.borderRadius || ".5rem"};
    font-size: ${props => props.fontSize || "1rem"};
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
`;

const TextModified = styled(Text)`
    display: ${props => props.display || "block"};
    width: ${props => props.width ? props.width : "inherit"};
    background: inherit;
    transition-property: background;
    transition: all .5s ease;
    overflow: hidden;
    &:hover{
        background: #f7f7e2;
    }
`;

const FloatButton = styled(Button)`
    z-index: ${props => props.zIndex || "9"};
    display: block;
    position: absolute;
    top: 0rem;
    right: -2.95rem;
    background-color: white;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .2);
    &:focus {
        background-color: white;
    }
    &:active {
        background-color: white;
    }
    &:hover:enabled {
        background: #f7f7e2;
    }
`;

const EDIT = "Edit";
const SAVE = "Save";

const EditableArea = ({ className, color, width, fontSize, fontWeight, value, textAlign, maxLength, onChange, editClickAction, saveClickAction }) => {
    const [isShowEditBtn, setShowEditBtn] = React.useState(false);
    const [floatBtnContent, setFloatBtnContent] = React.useState(EDIT);
    const [timeoutNumber, setTimeoutNumber] = React.useState(0);
    const normalTextRef = React.useRef(null);
    const textAreaRef = React.useRef(null);

    if (floatBtnContent === SAVE) {
        clearTimeout(timeoutNumber);
    }

    const handleEnter = () => {
        setShowEditBtn(true);
    }
    const handleLeave = (e) => {
        clearTimeout(timeoutNumber);
        const nextTimeoutNumber = setTimeout(() => {
            setShowEditBtn(false);
        }, 880);
        setTimeoutNumber(nextTimeoutNumber);
    }
    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutNumber);
        }
    }, [timeoutNumber]);
    const handleShowEditableText = (e) => {
        !isShowEditBtn &&
            setShowEditBtn(true)
            || (isShowEditBtn && floatBtnContent === EDIT) &&
            setShowEditBtn(false)
    }
    const handleFloatBtn = (e) => {
        if (floatBtnContent === EDIT) {
            openEditMode();
        } else if (floatBtnContent === SAVE) {
            closeAndSave();
        }
    }
    const handleKeyPress = (e) => { // onKeyPress event will invoke before onChange event
        const potentialEnterKey = e.charCode;
        const potentialEscKey = e.key;
        if (potentialEnterKey === 13 || potentialEscKey === "Escape") {
            closeAndSave();
        } else {
            textAreaAutoHeightAdjust(e);
        }
    }
    const textAreaAutoHeightAdjust = (event) => {
        textAreaRef.current.style.height = event.target.scrollHeight + "px";
    }
    const handleDoubleClick = (e) => {
        openEditMode();
    }
    const openEditMode = () => {
        setFloatBtnContent(SAVE);
        textAreaRef.current.style.height = normalTextRef.current.scrollHeight + "px";
        // this only needed when user hit save btn so we have to clear time out for keeping floating btn on
        clearTimeout(timeoutNumber);
        editClickAction &&
            editClickAction();
    }
    const closeAndSave = () => {
        if (textAreaRef.current.value.trim().length === 0) return;
        setFloatBtnContent(EDIT);
        setShowEditBtn(false);
        saveClickAction &&
            saveClickAction();
    }

    return (
        <EditableAreaStyle width={width} zIndex={Vars.EDITABLETEXT_TEXT_ZINDEX} className={`${className}`}>
            <AreaModified
                width="100%" textAlign={textAlign || "center"} fontWeight={fontWeight}
                fontSize={fontSize} maxLength={maxLength || "24"} color={color}
                value={value} onKeyPress={handleKeyPress} onChange={onChange} onKeyUp={handleKeyPress} onClick={handleShowEditableText}
                zIndex={Vars.EDITABLETEXT_TEXT_ZINDEX} ref={textAreaRef}
                display={floatBtnContent === SAVE && "block" || "none"} className={`mb-1`}
            />
            <TextModified
                width="100%" textAlign={textAlign || "center"} fontWeight={fontWeight}
                fontSize={fontSize} color={color}
                onDoubleClick={handleDoubleClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave}
                zIndex={Vars.EDITABLETEXT_TEXT_ZINDEX} reference={normalTextRef}
                display={floatBtnContent === EDIT && "block" || "none"} className={`mb-1`}
            >
                {value}
            </TextModified>

            {
                isShowEditBtn &&
                <FloatButton zIndex={Vars.EDITABLETEXT_BTN_ZINDEX} onClick={handleFloatBtn} fontSize={`1rem`} className={`float-btn`}>
                    {floatBtnContent}
                </FloatButton>
            }
        </EditableAreaStyle>
    )
}

export default (EditableArea);
import React from 'react';
import Text from "../../custom-components/Text";
import styled from "styled-components";
import Input from "../../custom-components/Input";
import Button from "../../custom-components/Button";
import Vars from "../other-stuffs/Vars";

const EditableTextStyle = styled.div`
    position: relative;
    z-index: ${props => props.zIndex || "auto"};
    width: ${props => props.width || "fit-content"};
`;

const InputModified = styled(Input)`
    display: ${props => props.display || "block"};
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

const EditableText = ({ id, className, isHref, zIndex, color, width, fontSize, fontWeight, readOnly, value, textAlign, maxLength, onClick, onChange, editClickAction, saveClickAction }) => {
    const [isShowEditBtn, setShowEditBtn] = React.useState(false);
    const [floatBtnContent, setFloatBtnContent] = React.useState(EDIT);
    const [timeoutNumber, setTimeoutNumber] = React.useState(0);

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
    const openEditMode = () => {
        setFloatBtnContent(SAVE);
        // this only needed when user hit save btn so we have to clear time out for keeping floating btn on
        clearTimeout(timeoutNumber);
        editClickAction &&
            editClickAction();
    }
    const closeAndSave = () => {
        setFloatBtnContent(EDIT);
        setShowEditBtn(false);
        saveClickAction &&
            saveClickAction();
    }
    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutNumber);
        }
    }, [timeoutNumber]);

    const handleEnterKeyCode = (e) => {
        (e.keyCode === 13 || e.keyCode === 27) &&
            closeAndSave();
    }
    const handleDoubleClick = (e) => {
        if (readOnly) {
            return;
        }
        openEditMode();
    }
    let _textModified_width = "100%";
    let _inputModified_width = "100%";
    if (width === "fit-content") {
        _textModified_width = "fit-content";
    }

    return (
        <EditableTextStyle id={id} width={width} zIndex={zIndex || Vars.EDITABLETEXT_TEXT_ZINDEX} onClick={onClick} className={className}>
            {
                readOnly &&
                <InputModified
                    width={_inputModified_width} textAlign={textAlign || "center"} fontWeight={fontWeight}
                    fontSize={fontSize} maxLength={maxLength || "24"} color={color}
                    value={value} onChange={onChange} onKeyUp={handleEnterKeyCode} onClick={handleShowEditableText}
                    zIndex={zIndex || Vars.EDITABLETEXT_TEXT_ZINDEX} readOnly
                    display={floatBtnContent === SAVE && "block" || "none"}
                />
                ||
                <InputModified
                    width={_inputModified_width} textAlign={textAlign || "center"} fontWeight={fontWeight}
                    fontSize={fontSize} maxLength={maxLength || "24"} color={color}
                    value={value} onChange={onChange} onKeyUp={handleEnterKeyCode} onClick={handleShowEditableText}
                    zIndex={zIndex || Vars.EDITABLETEXT_TEXT_ZINDEX}
                    display={floatBtnContent === SAVE && "block" || "none"}
                />
            }
            {
                isHref &&
                <a href={value} style={{ fontSize: Vars.FONT_SIZE_SM, zIndex: zIndex || Vars.EDITABLETEXT_TEXT_ZINDEX }}
                    onDoubleClick={handleDoubleClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave}
                    display={floatBtnContent === EDIT && "block" || "none"}
                >
                    {
                        value
                    }
                </a>
                ||
                <TextModified
                    width={_textModified_width} textAlign={textAlign || "center"} fontWeight={fontWeight}
                    fontSize={fontSize} color={color}
                    onDoubleClick={handleDoubleClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave}
                    zIndex={zIndex || Vars.EDITABLETEXT_TEXT_ZINDEX}
                    display={floatBtnContent === EDIT && "block" || "none"}
                >
                    {value}
                </TextModified>
            }


            {
                (isShowEditBtn && !readOnly) &&
                <FloatButton zIndex={Vars.EDITABLETEXT_BTN_ZINDEX} onClick={handleFloatBtn} fontSize={`1rem`} className={`float-btn`}>
                    {floatBtnContent}
                </FloatButton>
            }
        </EditableTextStyle>
    )
}

export default (EditableText);
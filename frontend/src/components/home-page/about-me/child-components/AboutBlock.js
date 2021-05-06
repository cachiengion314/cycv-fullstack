import React from 'react';
import styled from "styled-components";
import Block from '../../../../custom-components/Block';
import Button from "../../../../custom-components/Button";
import Vars from "../../../other-stuffs/Vars";
import EditableArea from "../../../other-stuffs/EditableArea";

const BlockModified = styled(Block)`
    position: relative;
`;

const FloatButton = styled(Button)`
    position: absolute;
    bottom: -.5rem;
    right: 0;
    height: 1rem;
    background-color: red;
`;

const AboutBlock = ({ _id, isHide, indexOfHigherComponent, content, dispatch, className }) => {
    const handleRemove = () => {
        Vars.removeComponentIn(dispatch,
            `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}`
        );
    }
    const handleContentChange = (e) => {
        Vars.editingText(dispatch, e.target.value,
            `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/content`, _id);
    }

    return (
        <BlockModified width="100%" _id={_id} key={_id} padding="0 0 0 .6rem" className={className} flexbox={true}>
            <EditableArea
                width="100%" maxLength="220" textAlign="left" fontSize={Vars.FONT_SIZE_SM}
                value={content} onChange={handleContentChange}
                className="about-block-editable-text"
            />
            <FloatButton isHide={isHide} onClick={handleRemove} fontSize={Vars.FONT_SIZE_SM}></FloatButton>
        </BlockModified>
    )
}

export default (AboutBlock);
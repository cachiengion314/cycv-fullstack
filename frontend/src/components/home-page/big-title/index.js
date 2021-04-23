import React from 'react';
import styled from "styled-components";
import Vars from "../../other-stuffs/Vars";
import Block from '../../../custom-components/Block';
import { connect } from "react-redux";
import EditableText from '../../other-stuffs/EditableText';
import EditableArea from '../../other-stuffs/EditableArea';

const BigTitleBlock = styled(Block)`

`;

const BigTitle = ({ className, width, height, REAL_NAME, TAG_NAME, dispatch }) => {
    const handleInitializeChange = (e) => {
        dispatch({
            type: Vars.EDITING_TEXT_EVENT,
            payload: {
                address: "homePage/bigTitle/0/content",
                content: e.target.value
            }
        });
    }

    const handleTagNameChange = (e) => {
        dispatch({
            type: Vars.EDITING_TEXT_EVENT,
            payload: {
                address: "homePage/bigTitle/1/content",
                content: e.target.value
            }
        });
    }

    return (
        <BigTitleBlock width={width} height={height} className={className}>
            <EditableText
                width="100%" textAlign="center" fontSize={Vars.FONT_SIZE_SUPER_BIG} fontWeight="bold"
                value={REAL_NAME} maxLength="24" onChange={handleInitializeChange}
                className="initialize-editable-text mb-1"
            />
            <EditableArea
                width="100%" textAlign="center" fontSize={Vars.FONT_SIZE_BIG} fontWeight="normal"
                value={TAG_NAME} maxLength="64" onChange={handleTagNameChange}
                className="tagname-editable-text mb-1"
            />
        </BigTitleBlock>
    )
}
const mapCurrentStoreToProps = (currentStore) => {
    let REAL_NAME = currentStore.homePage.bigTitle[0].content;
    let TAG_NAME = currentStore.homePage.bigTitle[1].content;
    return { REAL_NAME, TAG_NAME }
}

export default connect(mapCurrentStoreToProps)(BigTitle);
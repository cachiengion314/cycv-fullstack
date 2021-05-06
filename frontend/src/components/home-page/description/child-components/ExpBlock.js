import React from 'react';
import styled from "styled-components";
import Block from '../../../../custom-components/Block';
import Text from '../../../../custom-components/Text';
import Button from "../../../../custom-components/Button";
import EditableArea from "../../../other-stuffs/EditableArea";
import Vars from "../../../other-stuffs/Vars";
import EditableText from "../../../other-stuffs/EditableText";

const BlockModified = styled(Block)`
    position: relative;
    padding: 0 1rem 0 1rem;
`;
const FloatButton = styled(Button)`
    position: absolute;
    bottom: -.5rem;
    right: 0;
    height: 1rem;
    background-color: red;
`;

const ExpBlock = ({ _id, isHide, dispatch, width, className, indexOfHigherComponent, jobPosition, companyInfo, years, moreInfo }) => {
    const handleRemove = () => {
        Vars.removeComponentIn(dispatch,
            `homePage/description/${indexOfHigherComponent}/childs/${_id}`
        );
    }

    const handlejobPostionChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/description/${indexOfHigherComponent}/childs/${_id}/jobPosition`, _id);
    }
    const handleCompanyInfoChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/description/${indexOfHigherComponent}/childs/${_id}/companyInfo`, _id);
    }
    const handleYearsChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/description/${indexOfHigherComponent}/childs/${_id}/years`, _id);
    }
    const handleMoreInfoChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/description/${indexOfHigherComponent}/childs/${_id}/moreInfo`, _id);
    }

    return (
        <BlockModified width={width} className={className}>
            <EditableText
                width="100%" onChange={handlejobPostionChange} textAlign="left"
                fontSize={Vars.FONT_SIZE_MD} value={jobPosition}
                className="exp-block-editable-text mb-2"
            />
            <Block width="100%" flexbox={true}>
                <EditableText
                    width="60%" onChange={handleCompanyInfoChange} textAlign="left"
                    fontSize={Vars.FONT_SIZE_SM} value={companyInfo} maxLength="40"
                    className="exp-block-editable-text"
                />
                <Block width="7%"><Text width="100%" fontSize={Vars.FONT_SIZE_SM} textAlign="center">o</Text></Block>
                <EditableText
                    width="23%" onChange={handleYearsChange} textAlign="left"
                    fontSize={Vars.FONT_SIZE_SM} value={years} maxLength="20"
                    className="exp-block-editable-text"
                />
            </Block>
            <EditableArea
                width="100%" fontSize={Vars.FONT_SIZE_SM} textAlign="left"
                value={moreInfo} maxLength="164" onChange={handleMoreInfoChange}
                className="exp-block-editable-text"
            />
            <FloatButton isHide={isHide} onClick={handleRemove} fontSize={Vars.FONT_SIZE_SM}></FloatButton>
        </BlockModified>
    )
}

export default (ExpBlock);
import React from 'react';
import styled from "styled-components";
import Block from '../../../../custom-components/Block';
import Button from "../../../../custom-components/Button";
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

const EduBlock = ({ className, _id, width, isHide, dispatch, indexOfHigherComponent, degreeName, universityName, year }) => {
    const handleRemove = () => {
        Vars.removeComponentIn(
            dispatch,
            `homePage/description/${indexOfHigherComponent}/childs/${_id}`
        );
    }

    const handleDegreeNameChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/description/${indexOfHigherComponent}/childs/${_id}/degreeName`, _id);
    }
    const handleUniversityNameChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/description/${indexOfHigherComponent}/childs/${_id}/universityName`, _id);
    }
    const handleYearChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/description/${indexOfHigherComponent}/childs/${_id}/year`, _id);
    }

    return (
        <BlockModified width={width} className={className}>
            <EditableText
                width="100%" onChange={handleDegreeNameChange} textAlign="left"
                fontSize={Vars.FONT_SIZE_MD} value={degreeName} maxLength="100"
                className="education-block-editable-text mb-1"
            />
            <EditableText
                width="100%" onChange={handleUniversityNameChange} textAlign="left"
                fontSize={Vars.FONT_SIZE_SM} value={universityName} maxLength="120"
                className="education-block-editable-text" isHref={universityName.includes("http") && true || false}
            />
            <EditableText
                width="100%" onChange={handleYearChange} textAlign="left"
                fontSize={Vars.FONT_SIZE_SM} value={year} maxLength="100"
                className="education-block-editable-text"
            />
            <FloatButton isHide={isHide} onClick={handleRemove} fontSize={Vars.FONT_SIZE_SM}></FloatButton>
        </BlockModified>
    )
}

export default (EduBlock);
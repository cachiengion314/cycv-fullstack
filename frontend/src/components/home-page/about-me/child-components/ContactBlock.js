import React from 'react';
import styled from "styled-components";
import EditableAvatar from "../../../other-stuffs/EditableAvatar";
import Block from '../../../../custom-components/Block';
import Button from "../../../../custom-components/Button";
import Vars from "../../../other-stuffs/Vars";
import EditableText from "../../../other-stuffs/EditableText";


const BlockModified = styled(Block)`
    position: relative;
    margin: 0 1% 0 0;
    @media (max-width : ${props => props.mediaMaxWidth || "600px"}){
        & {
            width : 70%;
        }
    }
`;
const FloatButton = styled(Button)`
    position: absolute;
    bottom: -.5rem;
    right: 0;
    height: 1rem;
    background-color: red;
`;

const ContactBlock = ({ _id, isHide, indexOfHigherComponent, className, image, firstContent, secondContent, dispatch }) => {
    const handleAvatarSelect = (e) => {
        Vars.showChooseAvatarOption(dispatch,
            `Choose your contact option!`,
            [
                Vars.ideaImg, Vars.phoneImg, Vars.mailImg,
                Vars.streetImg, Vars.computerImg, Vars.reactImg,
                Vars.mailYellowImg, Vars.paperPlaneImg, Vars.sandClockImg,
                Vars.blankImg, Vars.searchImg, Vars.groupImg, Vars.facebookImg
            ],
            (imgUrl) => {
                Vars.editingText(dispatch, imgUrl, `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/image`, _id)
                Vars.closeModal(dispatch);
            }
        );
    }
    const handleRemove = () => {
        Vars.removeComponentIn(dispatch,
            `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}`
        );
    }
    const handleFirstContentChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/firstContent`, _id);
    }
    const handleSecondContentChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/secondContent`, _id);
    }
    const _imgWith = "13%";
    const _firstContentWith = "30%";
    const _secondContentWith = "57%";

    const [isNoSplitSpace, setNoSplitSpace] = React.useState(false);
    let _secondContent = "";

    const STR_splitSpace = (STR) => {
        if (STR.length > 12) {
            const _index = STR.search(/(@|\w[/]\w)/g);
            if (_index > -1) {
                return STR.slice(0, _index) + " " + STR.slice(_index);
            }
            
        }
        return STR;
    }
    const calculateSplitSpaceFor = (secondContent) => {
        return secondContent.length < 13 ? secondContent : STR_splitSpace(secondContent);
    }
    const handleWhenEdit = () => {
        setNoSplitSpace(true);
    }
    const handleWhenSave = () => {
        setNoSplitSpace(false);
    }
    if (isNoSplitSpace) {
        _secondContent = secondContent;
    } else {
        _secondContent = calculateSplitSpaceFor(secondContent);
    }

    return (
        <BlockModified width="100%" flexbox={true} className={className}>
            <EditableAvatar width={_imgWith} src={image || Vars.mailImg} onClick={handleAvatarSelect} />
            <Block width={_firstContentWith} className="align-center">
                <EditableText mediaMaxWidth={Vars.MEDIA_MAX_WIDTH}
                    width="100%" onChange={handleFirstContentChange} maxLength="11"
                    fontSize={Vars.FONT_SIZE_SM} value={firstContent}
                    className="contact-block-editable-text"
                />
            </Block>
            <Block width={_secondContentWith}>
                <EditableText mediaMaxWidth={Vars.MEDIA_MAX_WIDTH}
                    width="100%" onChange={handleSecondContentChange} editClickAction={handleWhenEdit}
                    fontSize={Vars.FONT_SIZE_SM} value={_secondContent} saveClickAction={handleWhenSave}
                    className="contact-block-editable-text" maxLength="40"
                />
            </Block>
            <FloatButton isHide={isHide} onClick={handleRemove} fontSize={Vars.FONT_SIZE_SM}></FloatButton>
        </BlockModified>
    )
}

export default (ContactBlock);
import React from 'react';
import styled from "styled-components";
import Block from '../../../../custom-components/Block';
import Button from "../../../../custom-components/Button";
import Vars from "../../../other-stuffs/Vars";
import EditableText from "../../../other-stuffs/EditableText";
import EditableAvatar from '../../../other-stuffs/EditableAvatar';

const BlockModified = styled(Block)`
    position: relative;
    margin: 0 1% 0 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width : ${props => props.mediaMaxWidth || "600px"}){
        & {
            width : 49%;
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

const HobbyBlock = ({ _id, isHide, image, content, dispatch, indexOfHigherComponent, className }) => {
    const _imgWith = "13%";
    const _editableTextWidth = "60%";

    const handleAvatarChange = () => {
        Vars.showChooseAvatarOption(dispatch,
            "Choose you favourite activities!",
            [
                Vars.phoneImg, Vars.chatImg, Vars.ideaImg, Vars.blankImg,
                Vars.reactImg, Vars.cartImg, Vars.searchImg, Vars.pianoImg,
                Vars.pencilImg, Vars.ipodImg, Vars.televisonImg, Vars.cameraImg,
                Vars.groupImg
            ],
            (imgUrl) => {
                Vars.editingText(dispatch, imgUrl, `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/image`, _id);
                Vars.closeModal(dispatch);
            }
        );
    }
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
        <BlockModified className={className} width="100%" mediaMaxWidth={Vars.MEDIA_MAX_WIDTH}>
            <EditableAvatar width={_imgWith} src={image || Vars.ipodImg} onClick={handleAvatarChange} />
            <EditableText
                width={_editableTextWidth} onChange={handleContentChange} maxLength="20"
                fontSize={Vars.FONT_SIZE_SM} value={content}
                className="Hobby-block-editable-text"
            />
            <FloatButton isHide={isHide} onClick={handleRemove} fontSize={Vars.FONT_SIZE_SM}></FloatButton>
        </BlockModified>
    )
}

export default (HobbyBlock);
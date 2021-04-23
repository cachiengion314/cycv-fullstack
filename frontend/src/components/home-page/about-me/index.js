import React from 'react';
import Vars from "../../other-stuffs/Vars";
import styled from "styled-components";
import Block from '../../../custom-components/Block';
import DropDown from '../../other-stuffs/DropDown';
import { connect } from "react-redux";
import { produce } from "immer";
import Utility from '../../../custom-components/Utility';
import EditableAvatar from '../../other-stuffs/EditableAvatar';
import AboutMeComponent from './AboutMeComponent';

const AvatarBlock = styled(Block)`
    position: relative;
`;

const DivStyled = styled.div`
    border: ${props => props.border || "0"};
    border-radius: ${props => props.borderRadius || "0"};
    width: ${props => props.width || "fit-content"};
    height: ${props => props.height || "fit-content"};
    padding: .5rem;
    @media (max-width : ${props => props.mediaMaxWidth || "600px"}){
        &{
            width : 88%;
            margin: 0 auto;
        }
    }
`;

const AboutMe = ({ dispatch, AboutMe, isHide, className, border, borderRadius, width, height }) => {
    const _aboutMe = [
        {
            _id: null,
            childs: [],
            name: "Contact",
            render: Vars.ABOUTME_COMPONENT_FUNCTION,
        },
        {
            _id: null,
            childs: [],
            name: "About",
            render: Vars.ABOUTME_COMPONENT_FUNCTION,
        },
        {
            _id: null,
            childs: [],
            name: "Hobby",
            render: Vars.ABOUTME_COMPONENT_FUNCTION,
        },
        {
            _id: null,
            childs: [],
            name: "Location",
            render: Vars.ABOUTME_COMPONENT_FUNCTION,
        },
    ];

    const userImage = AboutMe[0]["image"];
    const handleAvatarChange = () => {
        Vars.showChooseAvatarOption(dispatch,
            "Chose your favourite avatar!",
            [
                Vars.girlAva6Img, Vars.manAva4Img, Vars.girlSupportImg,
                Vars.joyImg, Vars.boringImg, Vars.sadImg, Vars.laughImg,
                Vars.kissImg, Vars.catAvaImg, Vars.makotoImg
            ],
            (imgUrl) => {
                Vars.editingText(dispatch,
                    imgUrl,
                    `homePage/aboutMe/0/image`);
                Vars.closeModal(dispatch);
            }
        );
    }
    const handleAddComponentBtn = (dispatch, component) => () => {
        const addedIdComponent = produce(component, draft => {
            if (!component._id) {
                draft._id = `${Utility.getRandomHash()}`;
            }
        });
        Vars.addComponentIn(dispatch, addedIdComponent, `homePage/aboutMe`);
    }

    return (
        <DivStyled mediaMaxWidth={Vars.MEDIA_MAX_WIDTH}
            width={width} height={height}
            border={border}
            borderRadius={borderRadius}
            className={className}
        >
            <AvatarBlock width="100%" className="align-center">
                <EditableAvatar
                    width="50%" src={userImage || Vars.happyImg} hoverWidth={`102%`} hoverTop={"-.2rem"}
                    onClick={handleAvatarChange} className="mb-4 mt-3"
                />
            </AvatarBlock>
            {
                React.useMemo(() =>
                    AboutMe.map(component => {
                        if (component.name === `UserAvatar`) return false;
                        const renderableComponent = produce(component, draft => {
                            draft.render = Vars.getFunctionFrom(component.render);
                        });
                        return (
                            renderableComponent.render()
                        )
                    })
                )
            }
            <DropDown
                widthMenu="12rem" btnName="Add Component" isHide={isHide}
                availableComponents={_aboutMe} handleClickInComponentBtn={handleAddComponentBtn}
                className="initialize-dropdown"
            />
        </DivStyled>
    )
}

const mapPreStoreToProps = (currentStore) =>
    true && { AboutMe: currentStore.homePage.aboutMe, isHide: currentStore.addComponentsBtn.isHide }

export default connect(mapPreStoreToProps)(AboutMe);
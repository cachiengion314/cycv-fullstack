import React from 'react';
import Vars from '../../other-stuffs/Vars';
import styled from "styled-components";
import DropDown from "../../other-stuffs/DropDown";
import { connect } from "react-redux";
import Utility from '../../../custom-components/Utility';
import { produce } from "immer";
import Block from '../../../custom-components/Block';

const Styled = styled.div`
    width: ${props => props.width || "fit-content"};
    height: ${props => props.height || "fit-content"};
    @media (max-width : ${props => props.mediaMaxWidth || "600px"}){
        & {
            width : 100%;
        }
    }
`;

const Description = ({ className, width, isHide, Description, smallWidthBar }) => {
    const _description = [
        {
            _id: null,
            childs: [],
            name: "Education",
            render: Vars.DESCRIPTION_COMPONENT_FUNCTION,
        },
        {
            _id: null,
            childs: [],
            name: "Experience",
            render: Vars.DESCRIPTION_COMPONENT_FUNCTION,
        },
        {
            _id: null,
            childs: [],
            name: "Skill",
            render: Vars.DESCRIPTION_COMPONENT_FUNCTION,
        },
    ]

    const handleAddComponentBtn = (dispatch, component) => () => {
        const addedIdComponent = produce(component, draft => {
            if (!component._id) {
                draft._id = `${Utility.getRandomHash()}`;
            }
        });
        Vars.addComponentIn(dispatch, addedIdComponent, `homePage/description`);
    }

    return (
        <Styled width={width} mediaMaxWidth={Vars.MEDIA_MAX_WIDTH} className={className}>
            {
                smallWidthBar &&
                <Block width="100%" className="align-center">
                    <Block width="67%" height="1px" background="darkblue" className="mb-4"></Block>
                </Block>
            }
            {
                Description.map((component) => {
                    const renderableComponent = produce(component, draft => {
                        draft.render = Vars.getFunctionFrom(component.render);
                    });
                    return (
                        renderableComponent.render()
                    )
                })
            }
            <DropDown
                sectionObj={Vars.descriptionObj} widthMenu="12rem"
                btnName="Add Component" isHide={isHide}
                availableComponents={_description} handleClickInComponentBtn={handleAddComponentBtn}
                className="dropdown-description"
            />
        </Styled>
    )
}

const mapStoreToProps = (currentStore) =>
    true && { Description: currentStore.homePage.description, isHide: currentStore.addComponentsBtn.isHide }

export default connect(mapStoreToProps)(Description);
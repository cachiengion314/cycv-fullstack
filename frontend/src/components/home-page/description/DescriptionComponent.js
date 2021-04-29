import React from 'react';
import Vars from "../../other-stuffs/Vars";
import Block from '../../../custom-components/Block';
import Button from "../../../custom-components/Button";
import { produce } from "immer";
import { connect } from "react-redux";
import DropDown from '../../other-stuffs/DropDown';
import EditableText from "../../other-stuffs/EditableText";
import Utility from '../../../custom-components/Utility';

const DescriptionComponent = ({ _id, className, isHide, width, Description, dispatch }) => {
    const availableComponents = [
        {
            _id: null,
            name: "Education form",
            degreeName: "ENTER YOUR DEGREE HERE",
            universityName: "Your university's name here",
            year: "2007 - 2011",
            render: Vars.EDUCATION_BLOCK_FUNCTION
        },
        {
            _id: null,
            name: "Skill form",
            width: "49%",
            percent: "68",
            content: "Your skill",
            subContent: "Good enough",
            render: Vars.SKILL_BLOCK_FUNCTION
        },
        {
            _id: null,
            name: "Experience form",
            jobPosition: "JOB POSITION HERE",
            companyInfo: "Company'name here - its place here",
            years: "2007 - 2011",
            moreInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis aliquet tincidunt",
            render: Vars.EXP_BLOCK_FUNCTION
        }
    ]

    const indexOfThisComponent = Vars.findIndexOfComponentIn(Description, _id);
    const this_component_childs = Description[indexOfThisComponent].childs;
    const componentName = Description[indexOfThisComponent].name;

    const handleEducationNameChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/description/${indexOfThisComponent}/name`);
    }

    const handleRemoveBtn = () => {
        Vars.showYesNo(dispatch,
            `Do you really want to remove this ${componentName} component?`,
            () => {
                Vars.removeComponentIn(dispatch, `homePage/description/${indexOfThisComponent}`);
            });
    }

    const handleAddComponentBtn = (dispatch, component) => () => {
        const addedIdComponent = produce(component, draft => {
            if (!component._id) {
                draft._id = `${Utility.getRandomHash()}`;
            }
        });
        Vars.addComponentIn(dispatch, addedIdComponent, `homePage/description/${indexOfThisComponent}/childs`);
    }

    const handleIndexChange = (e) => {
        if (Vars.isNextCompPosIndexOk(e.target.value, indexOfThisComponent + 1, Description.length + 1)) {
            const nextPositionIndex = e.target.value;
            Vars.changeComponentsIndex(dispatch,
                nextPositionIndex - 1,
                `homePage/description/${indexOfThisComponent}`);
        }
    }

    return (
        <Block
            width={width} title="EDUCATION" className={className}
            id={_id} onDrop={Vars.handleDrop(Description, _id, `homePage/description/${indexOfThisComponent}`, dispatch)}
            draggable={true} onDragOver={Vars.handleDragOver(_id)} onDragLeave={Vars.handleDragLeave(_id)}
            onDragStart={Vars.handleDragStart(`description`)} onDragEnd={Vars.handleDragEnd}
        >
            <Block width="100%" flexbox={true} className="align-v-center">
                <Block width="fit-content" flexbox={true} padding=".5rem" border="1px solid darkblue" borderRadius="1rem" className="mb-3">
                    <EditableText
                        width="1.7rem" onChange={handleIndexChange}
                        fontWeight="normal" fontSize={Vars.FONT_SIZE_BIG}
                        value={indexOfThisComponent + 1} maxLength="3"
                    />
                    <EditableText
                        width="fit-content" textAlign="left" onChange={handleEducationNameChange}
                        fontWeight="bold" fontSize={Vars.FONT_SIZE_BIG}
                        value={componentName} maxLength="24"
                    />
                </Block>
                <DropDown
                    width="fit-content"
                    widthMenu="16rem" btnName="+" isHide={isHide}
                    availableComponents={availableComponents} handleClickInComponentBtn={handleAddComponentBtn}
                    className={`${_id} dropdown-education mx-1`}
                />
                <Button isHide={isHide} onClick={handleRemoveBtn} fontSize={Vars.FONT_SIZE_MD}>-</Button>
            </Block>

            <Block width="100%" flexbox={true}>
                {
                    this_component_childs.map((component) => {
                        const renderableComponent = produce(component, draft => {
                            draft.render = Vars.getFunctionFrom(component.render);
                        });
                        return (
                            renderableComponent.render(isHide, dispatch, indexOfThisComponent)
                        )
                    })
                }
            </Block>
        </Block>
    )
}

const mapCurrentStoreToProps = (currentStore) => {
    return { Description: currentStore.homePage.description, isHide: currentStore.addComponentsBtn.isHide }
}

export default connect(mapCurrentStoreToProps)(DescriptionComponent);
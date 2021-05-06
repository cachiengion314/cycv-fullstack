import React from 'react';
import Vars from "../../other-stuffs/Vars";
import { produce } from "immer";
import { connect } from "react-redux";
import Block from '../../../custom-components/Block';
import Button from "../../../custom-components/Button";
import DropDown from '../../other-stuffs/DropDown';
import EditableText from "../../other-stuffs/EditableText";
import Utility from '../../../custom-components/Utility';

const AboutMeComponent = ({ _id, width, className, isHide, AboutMe, dispatch }) => {
    const availableComponents = [
        {
            _id: null,
            name: "Contact form",
            image: null,
            firstContent: "email",
            secondContent: "example123@gmail.com",
            render: Vars.CONTACT_BLOCK_FUNCTION,
        },
        {
            _id: null,
            name: "About form",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis aliquet tincidunt. Sed id risus nulla. Praesent bibendum ex tristique fermentum scelerisque.",
            render: Vars.ABOUT_BLOCK_FUNCTION,
        },
        {
            _id: null,
            name: "Hobby form",
            image: null,
            content: "Your activity here",
            render: Vars.HOBBY_BLOCK_FUNCTION,
        },
        {
            _id: null,
            name: "Map",
            latitude: null,
            longitude: null,
            render: Vars.LOCATION_BLOCK_FUNCTION,
        }
    ]

    const indexOfThisComponent = Vars.findIndexOfComponentIn(AboutMe, _id);
    const this_child_components = AboutMe[indexOfThisComponent].childs;
    const componentName = AboutMe[indexOfThisComponent].name;

    const handleContactNameChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/aboutMe/${indexOfThisComponent}/name`);
    }

    const handleRemoveBtn = () => {
        Vars.showYesNo(dispatch,
            `Do you really want to remove this ${componentName} component?`,
            () => {
                Vars.removeComponentIn(dispatch, `homePage/aboutMe/${indexOfThisComponent}`);
            });
    }

    const handleAddComponentBtn = (dispatch, component) => () => {
        const addedIdComponent = produce(component, draft => {
            if (!component._id) {
                draft._id = `${Utility.getRandomHash()}`;
            }
        });
        Vars.addComponentIn(dispatch, addedIdComponent, `homePage/aboutMe/${indexOfThisComponent}/childs`);
    }

    const handleIndexChange = (e) => {
        if (Vars.isNextCompPosIndexOk(e.target.value, indexOfThisComponent, AboutMe.length)) {
            const nextPositionIndex = e.target.value;
            if (nextPositionIndex === 0) return;
            Vars.changeComponentsIndex(
                dispatch,
                nextPositionIndex,
                `homePage/aboutMe/${indexOfThisComponent}`
            );
        }
    }

    return (
        <Block
            width={width || "100%"} className={className}
            id={_id} onDrop={Vars.handleDrop(AboutMe, _id, `homePage/aboutMe/${indexOfThisComponent}`, dispatch)}
            draggable={true} onDragOver={Vars.handleDragOver(_id)} onDragLeave={Vars.handleDragLeave(_id)}
            onDragStart={Vars.handleDragStart(`aboutMe`)} onDragEnd={Vars.handleDragEnd}
        >
            <Block width="100%" display="flex" className="mb-3">
                <EditableText
                    width="1.5rem" onChange={handleIndexChange}
                    fontWeight="normal" fontSize={Vars.FONT_SIZE_MD}
                    value={indexOfThisComponent} maxLength="3"
                />
                <EditableText
                    width="50%" textAlign="left" onChange={handleContactNameChange}
                    fontWeight="bold" fontSize={Vars.FONT_SIZE_MD}
                    value={componentName} maxLength="12"
                />
                <DropDown
                    width="fit-content"
                    widthMenu="16rem" btnName="+" isHide={isHide}
                    availableComponents={availableComponents} handleClickInComponentBtn={handleAddComponentBtn}
                    className={`${_id} dropdown-contact mx-1`}
                />
                <Button isHide={isHide} onClick={handleRemoveBtn} fontSize={Vars.FONT_SIZE_MD}>-</Button>
            </Block>
            <Block width="100%" flexbox={true} className={"align-h-center"}>
                {
                    this_child_components.map((component) => {
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
    return { AboutMe: currentStore.homePage.aboutMe, isHide: currentStore.addComponentsBtn.isHide }
}

export default connect(mapCurrentStoreToProps)(AboutMeComponent);
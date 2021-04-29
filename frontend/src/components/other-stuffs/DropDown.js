import React from 'react';
import Block from '../../custom-components/Block';
import Button from "../../custom-components/Button";
import styled from "styled-components";
import Vars from './Vars';

import { connect } from 'react-redux';

const DropDownBlock = styled(Block)`
    position: relative;
    display: flex;
    justify-content: center;
    width: ${props => props.width || "100%"};
`;
const DropDownMenuBlock = styled(Block)`
    display: block;
    position: absolute;
    bottom: 2.8rem;
    border-radius: .5rem;
    background: ${props => props.background || "#f1f1f1"};
    min-width: ${props => props.minWidth || "160px"};
    z-index: ${props => props.zIndex || "3"};
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .2);
    overflow: scroll;
`;

const DropDown = ({ dispatch, isHide, availableComponents, handleClickInComponentBtn, isDropdownShow, eventTarget, width, btnName, widthMenu, className }) => {
    const dropdownBtn = React.useRef(null);
    const handleAddBtn = e => {
        if (!e.target) return;

        if (e.target.classList.contains(`dropdown-btn`)) {
            dispatch({ type: Vars.DROP_DOWN_TOGGLE_EVENT, payload: { eventTarget: e.target } })
        } else {
            if (dropdownBtn.current && dropdownBtn.current.classList.contains(`show`)) {
                dispatch({ type: Vars.DROP_DOWN_TOGGLE_EVENT })
            }
        }
    }


    React.useEffect(() => {
        className.includes(`initialize-dropdown`) &&
            window.addEventListener(`click`, handleAddBtn);
        return () => {
            window.removeEventListener(`click`, handleAddBtn);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <DropDownBlock width={width} className={className}>
            <Button isHide={isHide} reference={dropdownBtn} fontSize={Vars.FONT_SIZE_MD} className={`dropdown-btn ${className} ${isDropdownShow && "show"}`}>{btnName}</Button>
            {
                (isDropdownShow && eventTarget.classList.contains(className.split(" ")[0])) &&
                <DropDownMenuBlock minWidth={widthMenu} background="white" border="1px solid black" zIndex={Vars.DROP_DOWN_ZINDEX}>
                    {
                        availableComponents.map((component) => {
                            return (
                                <Button key={component.name}
                                    width="100%" onClick={handleClickInComponentBtn(dispatch, component)}
                                    borderRadius="none" border="none"
                                    fontSize={Vars.FONT_SIZE_SM}
                                >
                                    {component.name}
                                </Button>
                            )
                        })
                    }
                </DropDownMenuBlock>
            }
        </DropDownBlock>
    )
}

const mapStoreToProps = (currentStore) =>
    true && {
        isDropdownShow: currentStore.addComponentsBtn.isDropdownShow,
        eventTarget: currentStore.addComponentsBtn.eventTarget
    }

export default connect(mapStoreToProps)(DropDown);
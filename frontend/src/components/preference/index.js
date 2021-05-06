import React from 'react'
import Block from '../../custom-components/Block';
import styled from "styled-components";
import PreferenceTinyIcon from './tiny-icons/PreferenceTinyIcon';
import SplitLeftIcon from './tiny-icons/SplitLeftIcon';
import Utility from '../../custom-components/Utility';
import SplitRightIcon from './tiny-icons/SplitRightIcon';
import SplitTopIcon from './tiny-icons/SplitTopIcon';
import { connect } from "react-redux";
import Vars from '../other-stuffs/Vars';
import MoreIcon from './tiny-icons/MoreIcon';
import SaveCvNavbar from './savesCV/SaveCvNavbar';

const BlockModified = styled(Block)`
    position: relative;
`;

const Preference = ({ height, dispatch, isActive, selectedTarget, className }) => {
    const handleTinyLeftIconWhenOff = (e) => {
        Vars.tinyIconToggle(dispatch, Vars.SPLIT_LEFT_ICON);
    }
    const handleTinyRightIconWhenOff = (e) => {
        Vars.tinyIconToggle(dispatch, Vars.SPLIT_RIGHT_ICON);
    }
    const handleTinyTopIconWhenOff = (e) => {
        Vars.tinyIconToggle(dispatch, Vars.SPLIT_TOP_ICON);
    }
    const handleMoreIcon = (e) => {
        Vars.showNotify(dispatch, "Advance Preference will be comming soon!", Vars.happyImg);
    }
    const handleTinyIconWhenOn = (e) => {
        const _iconArray = [Vars.SPLIT_LEFT_ICON, Vars.SPLIT_RIGHT_ICON, Vars.SPLIT_TOP_ICON];
        const _found = _iconArray.find(elt => elt !== selectedTarget);
        Vars.tinyIconToggle(dispatch, _found);
    }
    const handleTinyPreWhenOff = (e) => {
        Vars.tinyPreferenceToggle(dispatch, true);
    }
    const handleTinyPreWhenOn = (e) => {
        Vars.tinyPreferenceToggle(dispatch, false);
    }
    let _posArray = [1, 2, 3, 4];
    if (!isActive) {
        _posArray = [0, 0, 0, 0];
    }

    const { val, metric } = Utility.convertToNumber(height);
    let _split_left_IconRight = _posArray[3] * val + .3;
    let _split_right_IconRight = _posArray[2] * val + .3;
    let _split_top_IconRight = _posArray[1] * val + .3;
    let _moreIcon_right = _posArray[0] * val + .3;
    _split_left_IconRight = Utility.convertToMetric(_split_left_IconRight, metric);
    _split_right_IconRight = Utility.convertToMetric(_split_right_IconRight, metric);
    _split_top_IconRight = Utility.convertToMetric(_split_top_IconRight, metric);
    _moreIcon_right = Utility.convertToMetric(_moreIcon_right, metric);

    return (
        <BlockModified id={Vars.TINY_PREFERENCE_BLOCK} width="100%" height={height} className={className}>
            <SaveCvNavbar width="fit-content" />
            <PreferenceTinyIcon width={height}
                top="0" right="0"
                onClickWhenOff={handleTinyPreWhenOff}
                onClickWhenOn={handleTinyPreWhenOn}
            />
            <SplitLeftIcon width={height}
                top="0" right={_split_left_IconRight}
                onClickWhenOff={handleTinyLeftIconWhenOff}
                onClickWhenOn={handleTinyIconWhenOn}
                selectedTarget={selectedTarget}
                className={`${Vars.SPLIT_LEFT_ICON}`}
            />
            <SplitRightIcon
                width={height}
                top="0" right={_split_right_IconRight}
                onClickWhenOff={handleTinyRightIconWhenOff}
                onClickWhenOn={handleTinyIconWhenOn}
                selectedTarget={selectedTarget}
                className={`${Vars.SPLIT_RIGHT_ICON}`}
            />
            <SplitTopIcon
                width={height}
                top="0" right={_split_top_IconRight}
                onClickWhenOff={handleTinyTopIconWhenOff}
                onClickWhenOn={handleTinyIconWhenOn}
                selectedTarget={selectedTarget}
                className={`${Vars.SPLIT_TOP_ICON}`}
            />
            <MoreIcon
                width={height}
                top="0" right={_moreIcon_right}
                onClick={handleMoreIcon}
            />
        </BlockModified>
    )
}

const mapCurrentStoreToProps = (currentStore) => {
    return {
        isActive: currentStore.preference.tinyPreference.isActive,
        selectedTarget: currentStore.preference.tinyPreference.selectedTarget
    }
}

export default connect(mapCurrentStoreToProps)(Preference)
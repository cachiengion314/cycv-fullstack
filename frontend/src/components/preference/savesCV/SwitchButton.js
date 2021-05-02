import React from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Block from '../../../custom-components/Block'
import Vars from '../../other-stuffs/Vars'
import { connect } from "react-redux"

const SwitchButton = ({ dispatch, isCvPublic, className }) => {
    const setPublicAction = () => {
        Vars.savePreferenceModify(dispatch, true)
    }

    const setPrivateAction = () => {
        Vars.savePreferenceModify(dispatch, false)
    }

    const handleBlockClick = (e) => {
        if (isCvPublic) {
            Vars.showNotify(dispatch, "You have set this cv to private! Hit save button to save your choice!", Vars.boringImg)
            setPrivateAction()
            return
        }
        Vars.showNotify(dispatch, "Congratulation! You have successfully set this cv to public! Please hit save button to save your choice!", Vars.joyImg)
        setPublicAction()
    }

    return (
        <Block className={className} onClick={handleBlockClick}>
            <BootstrapSwitchButton
                checked={isCvPublic}
                size="sm"
                onlabel='On'
                offlabel='Hide'
                onstyle="success"
            />
        </Block>
    )
}

const mapStoreToProps = (currentStore) => {
    return {
        isCvPublic: currentStore.preference.savePreference.isCvPublic,
    }
}

export default connect(mapStoreToProps)(SwitchButton)
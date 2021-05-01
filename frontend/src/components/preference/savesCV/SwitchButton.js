import React from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Block from '../../../custom-components/Block'
import Vars from '../../other-stuffs/Vars'
import { connect } from "react-redux"

const SwitchButton = ({ dispatch, isCvPublic, className }) => {
    const [switchDisableStatus, setSwitchDisableStatus] = React.useState(isCvPublic ? false : true)

    React.useEffect(() => {
        if (isCvPublic) {
            setSwitchDisableStatus(false)
            return
        }
        setSwitchDisableStatus(true)
    }, [isCvPublic])

    const setPublicAction = () => {
        Vars.savePreferenceModify(dispatch, true)
    }

    const setPrivateAction = () => {
        Vars.savePreferenceModify(dispatch, false)
    }

    const handleBlockClick = (e) => {
        if (switchDisableStatus) {
            Vars.showYesNo(dispatch, "Do you want to public your own cv to everyone?", () => {
                setPublicAction()
            }, () => {
                setPrivateAction()
            })
            return
        }
        Vars.showYesNo(dispatch, "Do you want to make your cv private?", () => {
            setPrivateAction()
        }, () => {
            setPublicAction()
        })
    }

    return (
        <Block className={className} onClick={handleBlockClick}>
            <BootstrapSwitchButton
                checked={switchDisableStatus ? false : true}
                size="sm"
                onlabel='On'
                offlabel='Hide'
                onstyle="success"
                disabled={switchDisableStatus}
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
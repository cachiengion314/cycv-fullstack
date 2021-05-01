import { produce } from "immer";
import Vars from "../other-stuffs/Vars";
import init from "../redux-store/InitialStore";

const Reducer = (previousStore, action) =>
    action.type === Vars.DROP_DOWN_TOGGLE_EVENT &&
    produce(previousStore, draft => {
        if (previousStore.addComponentsBtn.isDropdownShow) {
            draft.addComponentsBtn.isDropdownShow = false
            draft.addComponentsBtn.eventTarget = null
        } else {
            draft.addComponentsBtn.isDropdownShow = true
            draft.addComponentsBtn.eventTarget = action.payload.eventTarget
        }
    })
    || action.type === Vars.ADD_COMPONENT_EVENT &&
    produce(previousStore, (draft) => {
        const { address, content } = action.payload;
        const partsArr = Vars.calculatePartsIn(address)
        switch (partsArr.length) {
            case 2:
                // typical address example: homePage/aboutMe
                draft[partsArr[0]][partsArr[1]].push(content)
                break
            case 4:
                // typical address example: homePage/aboutMe/0/childs
                draft[partsArr[0]][partsArr[1]][partsArr[2]][partsArr[3]].push(content)
                break
        }
    }) || action.type === Vars.REMOVE_COMPONENT_EVENT &&
    produce(previousStore, draft => {
        const { address, _id } = action.payload
        const partsArr = Vars.calculatePartsIn(address);
        switch (partsArr.length) {
            case 3:
                // typical address example: homePage/aboutMe/0
                const indexOfComponentCase3 = partsArr[2]
                draft[partsArr[0]][partsArr[1]].splice(indexOfComponentCase3, 1)
                break
            case 5:
                // typical address example: homePage/aboutMe/0/childs/bgghb2ded61aj
                const higherComponent = draft[partsArr[0]][partsArr[1]][partsArr[2]][partsArr[3]]
                const _id = partsArr[4]
                const indexOfComponentCase5 = Vars.findIndexOfComponentIn(higherComponent, _id)
                higherComponent.splice(indexOfComponentCase5, 1)
                break
        }
    })
    || action.type === Vars.EDITING_TEXT_EVENT &&
    produce(previousStore, (draft) => {
        const { address, _id, content } = action.payload
        const partsArr = Vars.calculatePartsIn(address)
        switch (partsArr.length) {
            case 4:
                // typical address example: homePage/bigTitle/realName/content
                // or: homePage/aboutMe/1/name
                draft[partsArr[0]][partsArr[1]][partsArr[2]][partsArr[3]] = content
                break
            case 6:
                // typical address example: homePage/aboutMe/0/childs/bgghb2ded61aj/firstContent
                const higherComponent = draft[partsArr[0]][partsArr[1]][partsArr[2]][partsArr[3]]
                const indexOfComponentCase6 = Vars.findIndexOfComponentIn(higherComponent, _id)
                draft[partsArr[0]][partsArr[1]][partsArr[2]][partsArr[3]][indexOfComponentCase6][partsArr[5]] = content
                break
        }
    })
    || action.type === Vars.CHANGE_COMPONENTS_INDEX_EVENT &&
    produce(previousStore, draft => {
        const { nextPositionIndex, address } = action.payload
        const partsArr = Vars.calculatePartsIn(address)
        switch (partsArr.length) {
            case 3:
                // typical address example: homePage/aboutMe/1
                const componentCase3Index = partsArr[2]
                let _temp = draft[partsArr[0]][partsArr[1]][componentCase3Index]
                draft[partsArr[0]][partsArr[1]][componentCase3Index] = draft[partsArr[0]][partsArr[1]][nextPositionIndex]
                draft[partsArr[0]][partsArr[1]][nextPositionIndex] = _temp
                break;
        }
    })
    || action.type === Vars.MODAL_CLOSE_EVENT &&
    produce(previousStore, draft => {
        const { target } = action.payload

        switch (target) {
            case Vars.MODAL_CUSTOM:
                draft.modal.custom.isModalShow = false
                break;
            case Vars.MODAL_NOTIFY:
                draft.modal.notify.isModalShow = false
                break;
            case Vars.MODAL_OPTION:
                draft.modal.option.isModalShow = false
                break;
            default:
                draft.modal.notify.isModalShow = false
                draft.modal.option.isModalShow = false
                draft.modal.custom.isModalShow = false
                break;

        }
    })
    || action.type === Vars.NOTIFY_SHOW_EVENT &&
    produce(previousStore, draft => {
        const { content, image, title } = action.payload
        draft.modal.notify.isModalShow = true
        draft.modal.notify.content = content
        draft.modal.notify.image = image
        draft.modal.notify.title = title
    })
    || action.type === Vars.YESNO_SHOW_EVENT &&
    produce(previousStore, draft => {
        const { content, image, title, yesAction, noAction } = action.payload
        draft.modal.notify.isModalShow = true;
        draft.modal.notify.content = content
        draft.modal.notify.image = image
        draft.modal.notify.title = title
        draft.modal.notify.yesAction = yesAction
        draft.modal.notify.noAction = noAction
    })
    || action.type === Vars.OPTION_SHOW_AVATAR_EVENT &&
    produce(previousStore, draft => {
        const { title, content, images, chooseAction } = action.payload
        draft.modal.option.isModalShow = true
        draft.modal.option.content = content
        draft.modal.option.images = images
        draft.modal.option.title = title
        draft.modal.option.chooseAction = chooseAction
    })
    || action.type === Vars.LOADING_SHOW_EVENT &&
    produce(previousStore, draft => {
        const { content, onTimeout, fakeLoadingTime, image, title } = action.payload
        draft.modal.notify.isModalShow = true
        draft.modal.notify.content = content
        draft.modal.notify.image = image
        draft.modal.notify.title = title
        draft.modal.notify.onTimeout = onTimeout
        draft.modal.notify.fakeLoadingTime = fakeLoadingTime
    })
    || action.type === Vars.CUSTOM_SHOW_EVENT &&
    produce(previousStore, draft => {
        const { content, modalBody, title, width } = action.payload
        draft.modal.custom.isModalShow = true
        draft.modal.custom.title = title
        draft.modal.custom.content = content
        draft.modal.custom.modalBody = modalBody
        draft.modal.custom.width = width
    })
    || action.type === Vars.SAVE_PREFERENCE_MODIFY_EVENT &&
    produce(previousStore, draft => {
        const { isCvPublic } = action.payload
        draft.preference.savePreference.isCvPublic = isCvPublic
    })
    || action.type === Vars.TINY_PREFERENCE_TOGGLE_EVENT &&
    produce(previousStore, draft => {
        const { isActive } = action.payload
        draft.preference.tinyPreference.isActive = isActive
    })
    || action.type === Vars.TINY_ICON_TOGGLE_EVENT &&
    produce(previousStore, draft => {
        const { selectedTarget } = action.payload;
        draft.preference.tinyPreference.selectedTarget = selectedTarget
    })
    || action.type === Vars.SHOW_HOMEPAGE_BUTTONS_EVENT &&
    produce(previousStore, draft => {
        const { isHide } = action.payload;
        draft.addComponentsBtn.isHide = isHide
    })
    || action.type === Vars.HIDE_HOMEPAGE_BUTTONS_EVENT &&
    produce(previousStore, draft => {
        const { isHide } = action.payload;
        draft.addComponentsBtn.isHide = isHide
    })
    || action.type === Vars.UPDATE_SAVES_DATA_EVENT &&
    produce(previousStore, draft => {
        const { saveDataId, savesData } = action.payload;
        if (saveDataId) {
            draft.user.current_saveDataId = saveDataId
        }

        draft.user.savesData = savesData;
    })
    || action.type === Vars.APPLY_USER_ID_EVENT &&
    produce(previousStore, draft => {
        const { userId, password, name, saveDataId, savesData } = action.payload
        draft.user.userId = userId
        draft.user.password = password
        if (name) {
            draft.user.name = name
        }
        if (saveDataId) {
            draft.user.current_saveDataId = saveDataId
        }
        if (savesData) {
            draft.user.savesData = savesData
        }
        if (saveDataId && savesData) {
            const currentSaveData = Vars.findCurrentSaveData(saveDataId, savesData)
            draft.homePage = currentSaveData.saveData.homePage
            draft.preference = currentSaveData.saveData.preference
        }
    })
    || action.type === Vars.APPLY_SAVE_DATA_ID_EVENT &&
    produce(previousStore, draft => {
        const { saveDataId } = action.payload
        draft.user.current_saveDataId = saveDataId
        const currentSaveData = Vars.findCurrentSaveData(saveDataId, previousStore.user.savesData)
        draft.homePage = currentSaveData.saveData.homePage
        draft.preference = currentSaveData.saveData.preference
    })
    || action.type === Vars.APPLY_TEMPER_SAVE_DATA_EVENT &&
    produce(previousStore, draft => {
        const { saveData } = action.payload
        draft.preference = saveData.preference
        draft.homePage = saveData.homePage
    })
    || action.type === Vars.CLEAR_HOMEPAGE_EVENT &&
    produce(previousStore, draft => {
        draft.homePage = init.homePage
        draft.preference = init.preference
        draft.user.current_saveDataId = init.user.current_saveDataId
    })
    || action.type === Vars.CLEAR_USER_SECTION_IN_STORE_EVENT &&
    produce(previousStore, draft => {
        draft.user = init.user
    })

    || previousStore

export default Reducer;
import ContactBlock from "../home-page/about-me/child-components/ContactBlock";
import AboutBlock from "../home-page/about-me/child-components/AboutBlock";
import HobbyBlock from "../home-page/about-me/child-components/HobbyBlock";
import LocationBlock from "../home-page/about-me/child-components/LocationBlock";
import EducationBlock from "../home-page/description/child-components/EducationBlock";
import SkillBlock from "../home-page/description/child-components/SkillBlock";
import ExpBlock from "../home-page/description/child-components/ExpBlock";
import DescriptionComponent from "../home-page/description/DescriptionComponent";
import AboutMeComponent from "../home-page/about-me/AboutMeComponent";
import produce from "immer";
import axios from "../../api"

class Vars {
    static setup() {
        return new Vars();
    }
    constructor() {
        //////////////////
        // sign in/up section //
        //////////////////
        const cycv_objDefault = {
            user: {
                userId: null,
                password: null,
                name: null,
                savesData: null,
                current_saveDataId: null,
                token: null,
            },
        }
        this.authenticateUserInput = (dispatch, email_input, password_input) => {
            const isEmailInputValid = this.checkEmailInput(email_input);
            const isPasswordInputValid = this.checkPasswordInput(password_input);
            if (!isEmailInputValid) {
                this.showNotify(dispatch, `You need to check your email again! There must be one digit atleast or your providing are probably fake!`, this.boringImg);
                return false
            }
            if (!isPasswordInputValid) {
                this.showNotify(dispatch, `Check your password again! There must be one digit and one uppercase atleast or your password will not strong enough!`, this.angryImg);
                return false
            }
            return true
        }
        this.checkPasswordInput = (password_input) => {
            if (/^\S{3,}/.test(password_input)) {
                return true;
            }
            return false
        }
        this.checkEmailInput = (email_input) => {
            let result1 = /^[a-z]\S+@\S+/.test(email_input);
            if (result1) {
                return true
            }
            return false
        }
        this.resolveToken = (token = "token-token") => {
            const userinfoArr = token.split("-")
            const userId = userinfoArr[0]
            const name = userinfoArr[1]
            return { userId, name }
        }
        this.saveUserInfoToLocal = (userId, password, name, savesData, current_saveDataId) => {
            let obj = this.getCycvObjInLocal()
            obj.user.userId = userId
            obj.user.password = password
            obj.user.name = name
            obj.user.savesData = savesData
            obj.user.token = userId
            if (current_saveDataId) {
                obj.user.current_saveDataId = current_saveDataId;
            }
            this.setCycvObjToLocal(obj);
        }
        this.signIn = async (dispatch, token, name, password, isNeedApplySaveDataId = true) => {
            if (this.isUserSignIn()) {
                const { password, name, savesData, current_saveDataId, token } = this.getUserInLocal()
                this.applyUserId(dispatch, token, password, name)
                this.updateSavesDataInStore(dispatch, savesData)
                if (current_saveDataId && isNeedApplySaveDataId) {
                    this.applySaveDataId(dispatch, current_saveDataId)
                }
                return true
            }

            let obj = this.getCycvObjInLocal()
            obj.user.token = token
            this.setCycvObjToLocal(obj)
            const data = await this.fetchApi(this.urlGetSavesData())
            if (data && data.messenger === "successfully!") {
                this.applyUserId(dispatch, token, password, name)
                this.updateSavesDataInStore(dispatch, data.docs)
                this.saveUserInfoToLocal(token, password, name, data.docs)
                return true
            }

            return false
        }
        this.signOut = (dispatch, isNeedToClearUrl = true) => {
            // clear user in redux store
            this.clearUserSectionInStore(dispatch)
            // clear in local
            this.setCycvObjToLocal(cycv_objDefault)
            // clear homePage in redux store
            this.clearHomepage(dispatch)
            // reload
            if (isNeedToClearUrl) {
                this.redirectToHomePage()
            }
        }
        this.fetch_applyTemperSaveData = async (dispatch, saveDataId) => {
            let rawData = await this.fetchApi(this.urlGetSpecifySaveData(saveDataId));
            console.log(`applySampleSaveData.rawData`, rawData)
            if (rawData && rawData.messenger === "successfully!") {
                this.applyTemperSaveData(dispatch, rawData.doc.saveData);
                return true;
            }
            return false;
        }
        this.isOwnerOfUserName_saveDataId = (name, saveDataId) => {
            const user = this.getUserInLocal();
            const _name = user.name;
            const _saveDataId = user.current_saveDataId;
            if (_name === name && _saveDataId === saveDataId) {
                return true;
            }
            return false;
        }
        this.isUserSignIn = () => {
            if (this.getCycvObjInLocal().user.userId) {
                return true;
            }
            return false;
        }
        this.getUserInLocal = () => {
            return this.getCycvObjInLocal().user
        }
        this.setCycvObjToLocal = (obj) => {
            if (!localStorage.getItem(this.KEY_CYCV_OBJ)) {
                localStorage.setItem(this.KEY_CYCV_OBJ, JSON.stringify(cycv_objDefault))
            }
            localStorage.setItem(this.KEY_CYCV_OBJ, JSON.stringify(obj))
        }
        this.getCycvObjInLocal = () => {
            if (!localStorage.getItem(this.KEY_CYCV_OBJ)) {
                localStorage.setItem(this.KEY_CYCV_OBJ, JSON.stringify(cycv_objDefault))
            }
            return JSON.parse(localStorage.getItem(this.KEY_CYCV_OBJ))
        }
        //////////////////
        // utility section //
        //////////////////
        this.removeSaveDataInSavesData = (savesData, removedSaveDataId) => {
            return produce(savesData, draft => {
                let _index = savesData.findIndex(elt => elt._id === removedSaveDataId)
                draft.splice(_index, 1)
            })
        }
        this.addNewSaveDataToSavesData = (savesData, saveData) => {
            return produce(savesData, draft => {
                draft.push(saveData)
            })
        }
        this.updateCurrentSavesData = (currentSaveData, savesData, newSaveData) => {
            const { homePage, preference } = newSaveData
            const modifiedSaveData = produce(currentSaveData, draft => {
                draft.homePage = homePage
                draft.preference = preference
            })
            const modifiedSavesData = produce(savesData, draft => {
                const indexOfCurrentSaveData = savesData.findIndex(elt => elt._id === currentSaveData._id)
                draft[indexOfCurrentSaveData].saveData.homePage = modifiedSaveData.homePage
                draft[indexOfCurrentSaveData].saveData.preference = modifiedSaveData.preference
            })
            return modifiedSavesData
        }
        this.findCurrentSaveData = (current_saveDataId, savesData) => {
            let currentSaveData;
            if (savesData && current_saveDataId) {
                currentSaveData = savesData.find(savefile => savefile._id === current_saveDataId)
            }
            if (currentSaveData) {
                return currentSaveData
            }
            return null;
        }
        //////////////////
        this.createModalBody = (ModalComponent) => {
            return {
                render: function () {
                    return (
                        ModalComponent
                    )
                },
            }
        }
        this.isNextCompPosIndexOk = (potentialNextPositionIndex, indexOfThisComponent, higherComponent_length) => {
            if (isNaN(Number(potentialNextPositionIndex))) {
                return false;
            }
            const nextPositionIndex = Number(potentialNextPositionIndex);
            if (nextPositionIndex === indexOfThisComponent || nextPositionIndex < 0 || nextPositionIndex >= higherComponent_length) {
                return false;
            }
            return true;
        }
        //////////////////
        this.calculatePartsIn = (ADDRESS = "homePage/") => {
            let partsArr = ADDRESS.split(`/`)
            partsArr = partsArr.map(elt => {
                if (!isNaN(Number(elt))) {
                    return Number(elt)
                }
                return elt
            });
            return partsArr
        }
        this.findIndexOfComponentIn = (higherComponent, CONPONENT_ID) => {
            const searchConponent = higherComponent.find(component => component._id === CONPONENT_ID)
            const indexOfSearchComponent = higherComponent.indexOf(searchConponent)
            return indexOfSearchComponent
        }
        //////////////////
        // reserve function section //
        //////////////////
        this.getFunctionFrom = (functionName) => {
            switch (functionName) {
                case this.CONTACT_BLOCK_FUNCTION:
                    return function (isHide, dispatch, indexOfHigherComponent, className = "mb-3") {
                        return (
                            <ContactBlock _id={this._id} key={this._id} image={this.image} firstContent={this.firstContent} secondContent={this.secondContent} isHide={isHide} dispatch={dispatch} indexOfHigherComponent={indexOfHigherComponent} className={className} />
                        )
                    }
                case this.ABOUT_BLOCK_FUNCTION:
                    return function (isHide, dispatch, indexOfHigherComponent, className = "mb-3") {
                        return (
                            <AboutBlock _id={this._id} key={this._id} content={this.content} isHide={isHide} dispatch={dispatch} indexOfHigherComponent={indexOfHigherComponent} className={className} />
                        )
                    }
                case this.HOBBY_BLOCK_FUNCTION:
                    return function (isHide, dispatch, indexOfHigherComponent, className = "mb-3") {
                        return (
                            <HobbyBlock _id={this._id} key={this._id} image={this.image} content={this.content} isHide={isHide} dispatch={dispatch} indexOfHigherComponent={indexOfHigherComponent} className={className} />
                        )
                    }
                case this.LOCATION_BLOCK_FUNCTION:
                    return function (isHide, dispatch, indexOfHigherComponent, className = "mb-4") {
                        return (
                            <LocationBlock _id={this._id} key={this._id} latitude={this.latitude} longitude={this.longitude} isHide={isHide} dispatch={dispatch} indexOfHigherComponent={indexOfHigherComponent} className={className} />
                        )
                    }
                case this.ABOUTME_COMPONENT_FUNCTION:
                    return function (width = "100%", className = "mb-3") {
                        return (
                            <AboutMeComponent _id={this._id} key={this._id} width={width} className={className} />
                        )
                    }

                case this.EDUCATION_BLOCK_FUNCTION:
                    return function (isHide, dispatch, indexOfHigherComponent, className = "mb-3") {
                        return (
                            <EducationBlock _id={this._id} key={this._id} width="100%" degreeName={this.degreeName} universityName={this.universityName} year={this.year} isHide={isHide} dispatch={dispatch} indexOfHigherComponent={indexOfHigherComponent} className={className} />
                        )
                    }
                case this.SKILL_BLOCK_FUNCTION:
                    return function (isHide, dispatch, indexOfHigherComponent, className = "mb-3") {
                        return (
                            <SkillBlock _id={this._id} key={this._id} percent={this.percent} content={this.content} subContent={this.subContent} isHide={isHide} dispatch={dispatch} indexOfHigherComponent={indexOfHigherComponent} width={this.width} className={className} />
                        )
                    }
                case this.EXP_BLOCK_FUNCTION:
                    return function (isHide, dispatch, indexOfHigherComponent, width = "100%", className = "mb-3") {
                        return (
                            <ExpBlock _id={this._id} key={this._id} jobPosition={this.jobPosition} companyInfo={this.companyInfo} years={this.years} moreInfo={this.moreInfo} isHide={isHide} dispatch={dispatch} indexOfHigherComponent={indexOfHigherComponent} width={width} className={className} />
                        )
                    }
                case this.DESCRIPTION_COMPONENT_FUNCTION:
                    return function (width = "100%", className = "mb-3") {
                        return (
                            <DescriptionComponent _id={this._id} key={this._id} width={width} className={className} />
                        )
                    }
            }
        }
        //////////////////
        // api section //
        //////////////////
        this.redirectToHomePage = () => {
            window.location.replace("/")
        }
        this.fetchApi = async (url, option = { method: "GET" }) => {
            try {
                const res = await axios({
                    url: url,
                    ...option
                })
                let doc = res.data
                console.log(`fetchApi.doc`, doc)
                return doc
            } catch (err) {
                console.log(`err`, err)
                return false
            }
        }
        this.url_username_saveid = (name, saveDataId) => {
            if (!name && !saveDataId) {
                return `/${this.getUserInLocal().name}?saveDataId=${this.getUserInLocal().current_saveDataId}`
            }
            return `/${name}?saveDataId=${saveDataId}`
        }
        this.url_username = (name) => {
            if (name) {
                return `/${name}`
            }
            return `/${this.getUserInLocal().name}`
        }
        this.urlRemoveSaveData = (saveDataId = "6054ef85bc1f5d37c70ae6d2") => {
            return `/api/remove-savefile-showcase?savefileId=${saveDataId}`
        }
        this.urlAddSaveData = () => {
            return `/api/add-savefile-showcase`
        }
        this.urlUpdateSaveData = (saveDataId = "6054ef85bc1f5d37c70ae6d2") => {
            return `/api/update-savefile-showcase?savefileId=${saveDataId}`
        }
        this.urlAllPublicSavefiles = (page) => {
            if (page) {
                return `/api/get-all-savefile-showcase?page=${page}&pageSize=${this.PAGE_SIZE}`
            }
            return `/api/get-all-savefile-showcase`
        }
        this.urlGetSavesData = () => {
            return `/api/get-all-savefile-showcase-of-user`
        }
        this.urlGetSpecifySaveData = (saveFileId = "123") => {
            return `/api/get-specific-savefile-showcase?savefileId=${saveFileId}`
        }
        this.urlLogin = () => {
            return `/auth/login`
        }
        this.urlCreateUser = () => {
            return `/auth/signup`
        }
        //////////////////
        // dispatch component section //
        //////////////////
        this.showHomePageButtons = (dispatch) => {
            dispatch({
                type: this.SHOW_HOMEPAGE_BUTTONS_EVENT,
                payload: {
                    isHide: false
                }
            })
        }
        this.hideHomePageButtons = (dispatch) => {
            dispatch({
                type: this.HIDE_HOMEPAGE_BUTTONS_EVENT,
                payload: {
                    isHide: true
                }
            })
        }
        this.changeComponentsIndex = (dispatch, nextPositionIndex, address) => {
            dispatch({
                type: this.CHANGE_COMPONENTS_INDEX_EVENT,
                payload: {
                    nextPositionIndex, address
                }
            })
        }
        this.tinyIconToggle = (dispatch, selectedTarget) => {
            dispatch({
                type: this.TINY_ICON_TOGGLE_EVENT,
                payload: {
                    selectedTarget
                }
            })
        }
        this.savePreferenceModify = (dispatch, isCvPublic) => {
            dispatch({
                type: this.SAVE_PREFERENCE_MODIFY_EVENT,
                payload: {
                    isCvPublic
                }
            })
        }
        this.tinyPreferenceToggle = (dispatch, isActive) => {
            dispatch({
                type: this.TINY_PREFERENCE_TOGGLE_EVENT,
                payload: {
                    isActive
                }
            })
        }
        this.editingText = (dispatch, content, address, _id) => {
            dispatch({
                type: this.EDITING_TEXT_EVENT,
                payload: {
                    content, address, _id
                }
            })
        }
        this.addComponentIn = (dispatch, addedIdComponent, address = "homePage/") => {
            dispatch({
                type: this.ADD_COMPONENT_EVENT,
                payload: {
                    content: addedIdComponent,
                    address: address
                }
            })
        }
        this.removeComponentIn = (dispatch, address = "homePage/") => {
            dispatch({
                type: this.REMOVE_COMPONENT_EVENT,
                payload: {
                    address
                }
            })
        }
        this.clearHomepage = (dispatch) => {
            dispatch({
                type: this.CLEAR_HOMEPAGE_EVENT,
            })
            let obj = this.getCycvObjInLocal()
            obj.user.current_saveDataId = null
            this.setCycvObjToLocal(obj)
        }
        this.clearUserSectionInStore = (dispatch) => {
            dispatch({
                type: this.CLEAR_USER_SECTION_IN_STORE_EVENT,
            })
        }
        this.updateSavesDataInStore = (dispatch, savesData, saveDataId) => {
            dispatch({
                type: this.UPDATE_SAVES_DATA_EVENT,
                payload: {
                    savesData, saveDataId
                }
            })
        }
        this.applySaveDataId = (dispatch, saveDataId) => {
            dispatch({
                type: this.APPLY_SAVE_DATA_ID_EVENT,
                payload: {
                    saveDataId
                }
            })
        }
        this.applyUserId = (dispatch, userId, password, name, saveDataId, savesData) => {
            dispatch({
                type: this.APPLY_USER_ID_EVENT,
                payload: {
                    userId,
                    password,
                    name,
                    saveDataId,
                    savesData
                }
            })
        }
        this.applyTemperSaveData = (dispatch, saveData) => {
            dispatch({
                type: this.APPLY_TEMPER_SAVE_DATA_EVENT,
                payload: {
                    saveData
                }
            })
        }
        //////////////////
        // modal section //
        ////////////////// 
        this.showCustomModal = (dispatch, content = "Custom modal", width, modalBody = null) => {
            dispatch({
                type: this.CUSTOM_SHOW_EVENT,
                payload: {
                    title: this.CUSTOM_SHOW_EVENT,
                    content, modalBody, width
                }
            });
        }
        this.showChooseAvatarOption = (dispatch, content = "Option modal", images = [this.phoneImg], chooseAction = (imgUrl) => { }) => {
            dispatch({
                type: this.OPTION_SHOW_AVATAR_EVENT,
                payload: {
                    title: this.OPTION_SHOW_AVATAR_EVENT,
                    content, images, chooseAction
                }
            });
        }
        this.showLoading = (dispatch = () => { }, content = "Please wait", onTimeout = () => { }, fakeLoadingTime, image = this.sandClockImg) => {
            dispatch({
                type: this.LOADING_SHOW_EVENT,
                payload: {
                    content, onTimeout, fakeLoadingTime, image,
                    title: this.LOADING_SHOW_EVENT
                }
            });
        }
        this.showYesNo = (dispatch = () => { }, content = "Yes or No modal", yesAction = () => { }, noAction = () => { }, image = this.questionImg) => {
            dispatch({
                type: this.YESNO_SHOW_EVENT,
                payload: {
                    content, image, yesAction, noAction,
                    title: this.YESNO_SHOW_EVENT
                }
            });
        }
        this.showNotify = (dispatch, content = "Notify modal", image = this.happyImg) => {
            dispatch({
                type: this.NOTIFY_SHOW_EVENT,
                payload: {
                    content, image,
                    title: this.NOTIFY_SHOW_EVENT
                }
            });
        }
        this.closeModal = (dispatch, target = null) => {
            dispatch({
                type: this.MODAL_CLOSE_EVENT,
                payload: {
                    target
                }
            });
        }
        //////////////////
        // dragging feature section //
        //////////////////
        this.handleDrop = (higherComponent, currentComponentId, address, dispatch) => (e) => {
            e.preventDefault();
            document.querySelector(`#${currentComponentId}`).style.backgroundColor = "inherit";
            const rawData = e.dataTransfer.getData(`dragging-block-data`).split("_");
            if (rawData[0].length === 0) return this.showNotify(dispatch, `You can't transfer component like that!`);
            const draggingBlockId = rawData[0];
            const draggingHigherComponentName = rawData[1];
            const partsArr = this.calculatePartsIn(address);
            switch (partsArr.length) {
                case 3:
                    // example for case 3: `homePage/aboutMe/1`
                    const draggingBlockIndex = this.findIndexOfComponentIn(higherComponent, draggingBlockId);
                    const higherComponentName = partsArr[1];
                    if (higherComponentName.toUpperCase() === draggingHigherComponentName.toUpperCase()) {
                        this.changeComponentsIndex(
                            dispatch,
                            draggingBlockIndex,
                            address
                        );
                    } else {
                        this.showNotify(dispatch, "You can't transfer component like that!", this.sadImg);
                    }
                    break;
            }
        }
        this.handleDragLeave = (componentLeaveId) => (e) => {
            e.preventDefault();
            document.querySelector(`#${componentLeaveId}`).style.backgroundColor = "inherit";
        }
        this.handleDragOver = (componentOverId) => (e) => {
            e.preventDefault();
            document.querySelector(`#${componentOverId}`).style.backgroundColor = "#e2ffe4";
        }
        this.handleDragStart = (higherComponentName) => (e) => {
            e.dataTransfer.setData(`dragging-block-data`, e.target.id + "_" + higherComponentName);
            e.target.style.backgroundColor = "#e2ffe4"
        }
        this.handleDragEnd = (e) => {
            // e.target is still the component in drag start event
            e.target.style.backgroundColor = "inherit";
        }
    }
    //////////////////
    // function name section //
    //////////////////
    get CONTACT_BLOCK_FUNCTION() {
        return "CONTACT_BLOCK_FUNCTION";
    }
    get ABOUT_BLOCK_FUNCTION() {
        return "ABOUT_BLOCK_FUNCTION";
    }
    get HOBBY_BLOCK_FUNCTION() {
        return "HOBBY_BLOCK_FUNCTION";
    }
    get LOCATION_BLOCK_FUNCTION() {
        return "LOCATION_BLOCK_FUNCTION";
    }
    get ABOUTME_COMPONENT_FUNCTION() {
        return "ABOUTME_COMPONENT_FUNCTION";
    }
    get EDUCATION_BLOCK_FUNCTION() {
        return "EDUCATION_BLOCK_FUNCTION";
    }
    get SKILL_BLOCK_FUNCTION() {
        return "SKILL_BLOCK_FUNCTION";
    }
    get EXP_BLOCK_FUNCTION() {
        return "EXP_BLOCK_FUNCTION";
    }
    get DESCRIPTION_COMPONENT_FUNCTION() {
        return "DESCRIPTION_COMPONENT_FUNCTION";
    }
    //////////////////
    // regular name section //
    //////////////////
    get KEY_CYCV_OBJ() {
        return "cycvApp";
    }
    get SPLIT_LEFT_ICON() {
        return "split-left-icon";
    }
    get SPLIT_TOP_ICON() {
        return "split-top-icon";
    }
    get SPLIT_RIGHT_ICON() {
        return "split-right-icon";
    }
    get MODAL_CUSTOM() {
        return "MODAL_CUSTOM";
    }
    get MODAL_OPTION() {
        return "MODAL_OPTION";
    }
    get MODAL_NOTIFY() {
        return "MODAL_NOTIFY";
    }
    get TINY_PREFERENCE_BLOCK() {
        return "tiny-preference-block";
    }
    //////////////////
    // event's name section //
    //////////////////
    get CHANGE_COMPONENTS_INDEX_EVENT() {
        return "CHANGE_COMPONENTS_INDEX_EVENT";
    }
    get TINY_PREFERENCE_TOGGLE_EVENT() {
        return "TINY_PREFERENCE_TOGGLE_EVENT";
    }
    get SAVE_PREFERENCE_MODIFY_EVENT() {
        return "SAVE_PREFERENCE_MODIFY_EVENT";
    }
    get TINY_ICON_TOGGLE_EVENT() {
        return "TINY_ICON_TOGGLE_EVENT";
    }
    get LOADING_SHOW_EVENT() {
        return "LOADING_SHOW_EVENT";
    }
    get YESNO_SHOW_EVENT() {
        return "YESNO_SHOW_EVENT";
    }
    get MODAL_CLOSE_EVENT() {
        return "MODAL_CLOSE_EVENT";
    }
    get CUSTOM_SHOW_EVENT() {
        return "CUSTOM_SHOW_EVENT";
    }
    get NOTIFY_SHOW_EVENT() {
        return "NOTIFY_SHOW_EVENT";
    }
    get OPTION_SHOW_AVATAR_EVENT() {
        return "OPTION_SHOW_AVATAR_EVENT";
    }
    get EDITING_TEXT_EVENT() {
        return "EDITING_TEXT_EVENT";
    }
    get REMOVE_COMPONENT_EVENT() {
        return "REMOVE_COMPONENT_EVENT";
    }
    get ADD_COMPONENT_EVENT() {
        return "ADD_COMPONENT_EVENT";
    }
    get DROP_DOWN_TOGGLE_EVENT() {
        return "DROP_DOWN_TOGGLE_EVENT";
    }
    get SHOW_HOMEPAGE_BUTTONS_EVENT() {
        return "SHOW_HOMEPAGE_BUTTONS_EVENT";
    }
    get HIDE_HOMEPAGE_BUTTONS_EVENT() {
        return "HIDE_HOMEPAGE_BUTTONS_EVENT";
    }
    get SIGN_IN_EVENT() {
        return "SIGN_IN_EVENT";
    }
    get SIGN_OUT_EVENT() {
        return "SIGN_OUT_EVENT";
    }
    get SIGN_UP_EVENT() {
        return "SIGN_UP_EVENT";
    }
    get CLEAR_HOMEPAGE_EVENT() {
        return "CLEAR_HOMEPAGE_EVENT";
    }
    get CLEAR_USER_SECTION_IN_STORE_EVENT() {
        return "CLEAR_USER_SECTION_IN_STORE_EVENT";
    }
    get APPLY_USER_ID_EVENT() {
        return "APPLY_USER_ID_EVENT";
    }
    get APPLY_SAVE_DATA_ID_AND_SAVES_DATA_EVENT() {
        return "APPLY_SAVE_DATA_ID_AND_SAVES_DATA_EVENT";
    }
    get UPDATE_SAVES_DATA_EVENT() {
        return "UPDATE_SAVES_DATA_EVENT";
    }
    get APPLY_SAVE_DATA_ID_EVENT() {
        return "APPLY_SAVE_DATA_ID_EVENT";
    }
    get APPLY_TEMPER_SAVE_DATA_EVENT() {
        return "APPLY_TEMPER_SAVE_DATA_EVENT";
    }
    //////////////////
    // value section //
    //////////////////
    get MODAL_ZINDEX() {
        return 1012;
    }
    get H_NAVBAR_ZINDEX() {
        return 1011;
    }
    get DROP_DOWN_ZINDEX() {
        return 1001;
    }
    get EDITABLETEXT_BTN_ZINDEX() {
        return 2;
    }
    get TINY_PREFERENCE_ZINDEX() {
        return 1;
    }
    get TINY_ICON_ZINDEX() {
        return 0;
    }
    get EDITABLETEXT_TEXT_ZINDEX() {
        return 0;
    }
    get MEDIA_MAX_WIDTH() {
        return "600px";
    }
    get FONT_SIZE_SSM() {
        return ".9rem";
    }
    get FONT_SIZE_SM() {
        return "1.1rem";
    }
    get FONT_SIZE_MD() {
        return "1.5rem";
    }
    get FONT_SIZE_BIG() {
        return "2.1rem";
    }
    get FONT_SIZE_SUPER_BIG() {
        return "4.1rem";
    }
    get PAGE_SIZE() {
        return 8
    }
    //////////////////
    // img section //
    //////////////////
    get facebookImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616962549/facebook_ria50s.jpg`;
    }
    get pianoImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616962187/piano_z4fxie.jpg`;
    }
    get cameraImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616962187/camera_iap5hs.jpg`;
    }
    get ipodImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616962187/ipod_i5gw4h.jpg`;
    }
    get imacImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616962186/imac_et19be.jpg`;
    }
    get televisonImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616962187/televison_cwtpho.jpg`;
    }
    get pencilImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616962186/pencil_awyjuj.jpg`;
    }
    get cartImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616960029/cart_tksamo.jpg`;
    }
    get searchImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616960029/search_mlfcs7.jpg`;
    }
    get blankImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616960029/blank_eev0na.jpg`;
    }
    get chatImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616960036/chat_m5h1dr.jpg`;
    }
    get computerImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616960036/computer_xevztz.jpg`;
    }
    get girlSupportImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616960036/girl_suport_fhfpb8.jpg`;
    }
    get mailYellowImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616960029/mail_yellow_q7jo0a.jpg`;
    }
    get paperPlaneImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616960031/paper_plane_rwquwd.jpg`;
    }
    get reactImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616960036/react_bn3u0t.jpg`;
    }
    get sandClockImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950778/sand_clock_w3r7jc.png`;
    }
    get makotoImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950778/makoto_z8hyzb.png`;
    }
    get mailImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950777/mail_he0w9b.png`;
    }
    get phoneImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950778/phone_dl44rd.png`;
    }
    get streetImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950778/street_ppwk4x.png`;
    }
    get girlAva6Img() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950776/avatar_6_goe1ye.png`;
    }
    get manAva2Img() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950776/avatar_2_uvtnj1.png`;
    }
    get manAva4Img() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950776/avatar_4_huijv2.png`;
    }
    get catAvaImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950777/cat_cute_pyyr08.png`;
    }
    get ideaImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950777/idea_h7dp9o.png`;
    }
    get groupImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950777/group_icon_d72ema.png`;
    }
    //// emotion
    get sadImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950778/sad_dl6deb.png`;
    }
    get happyImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950777/happy_ci2v3i.png`;
    }
    get questionImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950778/question_tmyoq8.png`;
    }
    get joyImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950777/joke_sxffkk.png`;
    }
    get laughImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950777/happier_clnysc.png`;
    }
    get kissImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950777/cute_grkc2p.png`;
    }
    get angryImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950776/angry_johaal.png`;
    }
    get boringImg() {
        return `https://res.cloudinary.com/cachiengion314/image/upload/v1616950776/boring_rmdecm.png`;
    }
}
export default Vars.setup();
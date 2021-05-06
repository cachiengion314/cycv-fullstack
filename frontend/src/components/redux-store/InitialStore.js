import Vars from "../other-stuffs/Vars";

const InitialStore = {
    user: {
        userId: null,
        password: null,
        name: null,
        savesData: null,
        current_saveDataId: null,
    },
    io: {
        socket: null,
        socketExecutor: 0
    },
    modal: {
        notify: {
            isModalShow: false,
            title: Vars.NOTIFY_SHOW_EVENT,
            content: "This is a small notify!",
            image: Vars.phoneImg,
            yesAction: () => { },
            noAction: () => { },
            onTimeout: () => { },
            fakeLoadingTime: 0
        },
        option: {
            isModalShow: false,
            title: Vars.OPTION_SHOW_AVATAR_EVENT,
            content: "This is an option modal!",
            images: [Vars.phoneImg],
            chooseAction: () => { }
        },
        custom: {
            isModalShow: false,
            title: Vars.CUSTOM_SHOW_EVENT,
            content: "This is a custom modal!",
            modalBody: null,
            width: null,
        },
        toast: {
            isToastShow: false,
            content: "this is a small toast",
            image: Vars.joyImg
        }
    },
    addComponentsBtn: {
        isHide: false,
        isDropdownShow: false,
        eventTarget: null
    },
    preference: {
        tinyPreference: {
            isActive: false,
            selectedTarget: Vars.SPLIT_LEFT_ICON,
        },
        savePreference: {
            isCvPublic: true
        }
    },
    homePage: {
        bigTitle: [
            {
                name: "RealName",
                content: "YOUR NAME HERE"
            },
            {
                name: "TagName",
                content: "YOUR JOB TITLE HERE"
            }
        ],
        aboutMe: [
            {
                name: "UserAvatar",
                image: null,
            }
        ],
        description: [],
    }
}

export default InitialStore;
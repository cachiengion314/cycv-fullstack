import React from 'react';
import Preference from "../preference";
import HomePage from "../home-page";
import Vars from '../other-stuffs/Vars';
import useRoute from "../authenticate/useRoute";

const MyCvPage = ({ width, dispatch, className }) => {
    const route = useRoute()
    const id = route.paramUserId
    const saveDataIdQuery = route.querySaveDataId
    console.log(`paramUserId, saveDataIdQuery`, id, saveDataIdQuery)

    const controlStatus = async () => {
        if (Vars.isUserSignIn()) {
            if (id && saveDataIdQuery && !Vars.isOwnerOfUserName_saveDataId(id, saveDataIdQuery)) {
                const isSuccess = await Vars.fetch_applyTemperSaveData(dispatch, saveDataIdQuery)
                if (!isSuccess) {
                    Vars.signIn(dispatch)
                    route.push(Vars.url_username_saveid())
                    return
                }
                Vars.signIn(dispatch, null, null, null, false)
                return
            }
            if (Vars.getUserInLocal().current_saveDataId) {
                Vars.signIn(dispatch);
                route.push(Vars.url_username_saveid())
                return;
            }
            Vars.signIn(dispatch)
            route.push(Vars.url_username())
            return;
        }

        if (id && saveDataIdQuery) {
            const isSuccess = await Vars.fetch_applyTemperSaveData(dispatch, saveDataIdQuery)
            if (!isSuccess) {
                route.push("/")
                return
            }
            return
        }

        route.push("/")
    }

    React.useEffect(() => {
        controlStatus()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="root-container">
            <div className="left-container"></div>
            <div className="center-container d-block">
                <Preference height="2em" className="mb-3" />
                <HomePage width="100%" className="mb-3" />
            </div>
            <div className="right-container"></div>
        </div>
    )
}

export default MyCvPage;
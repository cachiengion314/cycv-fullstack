import React from 'react';
import Preference from "../preference";
import HomePage from "../home-page";
import Vars from '../other-stuffs/Vars';
import useRoute from "../authenticate/useRoute";
import Loading from '../loading';

const MyCvPage = ({ width, dispatch, className }) => {
    const [needLoading, setNeedLoading] = React.useState(true)
    const route = useRoute()
    const id = route.paramUserId
    const saveDataIdQuery = route.querySaveDataId
    console.log(`paramUserId, saveDataIdQuery`, id, saveDataIdQuery)

    React.useEffect(() => {
        const controlStatus = async () => {
            if (Vars.isUserSignIn()) {
                if (id && saveDataIdQuery && !Vars.isOwnerOfUserName_saveDataId(id, saveDataIdQuery)) {
                    const isSuccess = await Vars.fetch_applyTemperSaveData(dispatch, saveDataIdQuery)
                    if (!isSuccess) {
                        Vars.signIn(dispatch)
                        route.push(Vars.url_username_saveid())
                        setNeedLoading(false)
                        return
                    }
                    Vars.signIn(dispatch, null, null, null, false)
                    setNeedLoading(false)
                    return
                }
                if (Vars.getUserInLocal().current_saveDataId) {
                    Vars.signIn(dispatch);
                    route.push(Vars.url_username_saveid())
                    setNeedLoading(false)
                    return;
                }
                Vars.signIn(dispatch)
                route.push(Vars.url_username())
                setNeedLoading(false)
                return;
            }

            if (id && saveDataIdQuery) {
                const isSuccess = await Vars.fetch_applyTemperSaveData(dispatch, saveDataIdQuery)
                setNeedLoading(false)
                if (!isSuccess) {
                    route.push("/")
                    setNeedLoading(false)
                    return
                }
                setNeedLoading(false)
                return
            }

            route.push("/")
            setNeedLoading(false)
        }

        controlStatus()
        // eslint-disable-next-line
    }, [saveDataIdQuery])

    if (needLoading) {
        return (
            <Loading minHeight="12rem" />
        )
    }
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
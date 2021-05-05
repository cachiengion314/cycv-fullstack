import React from 'react'
import Preference from "../preference"
import HomePage from "../home-page"
import Vars from '../other-stuffs/Vars'
import useRoute from "../authenticate/useRoute"
import Loading from '../loading'
import Block from '../../custom-components/Block'
import Comment from '.././comments'
import { useSelector } from 'react-redux'

const MyCvPage = ({ dispatch }) => {
    const { socket } = useSelector(state => state.io)
    const [needLoading, setNeedLoading] = React.useState(true)
    const route = useRoute()
    const saveDataIdQuery = route.querySaveDataId


    React.useEffect(() => {
        const controlStatus = async () => {
            if (Vars.isUserSignIn()) {
                if (saveDataIdQuery && !Vars.isCurrentSaveDataId(saveDataIdQuery)) {
                    const isSuccess = await Vars.fetch_applyTemperSaveData(dispatch, saveDataIdQuery)
                    if (!isSuccess) {
                        Vars.signIn(dispatch)
                        Vars.socket_listenCommentedNotify(dispatch, socket)
                        route.push(Vars.url_username_saveid())
                        setNeedLoading(false)
                        return
                    }
                    Vars.signIn(dispatch, null, null, null, false)
                    Vars.socket_listenCommentedNotify(dispatch, socket)
                    setNeedLoading(false)
                    return
                }

                if (Vars.isUserHaveCurrentSaveDataId()) {
                    Vars.signIn(dispatch);
                    Vars.socket_listenCommentedNotify(dispatch, socket)
                    route.push(Vars.url_username_saveid())
                    setNeedLoading(false)
                    return
                }

                Vars.signIn(dispatch)
                Vars.socket_listenCommentedNotify(dispatch, socket)
                route.push(Vars.url_username())
                setNeedLoading(false)
                return
            }

            if (saveDataIdQuery) {
                const isSuccess = await Vars.fetch_applyTemperSaveData(dispatch, saveDataIdQuery)
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
        <div className="align-center">
            <div className="root-container">
                <div className="left-container"></div>
                <div className="center-container align-center">
                    <Preference height="2em" className="mb-3" />
                    <HomePage width="100%" className="mb-3" />
                    <Block width="60%" height="1px" background="darkblue" className="mt-5"></Block>
                </div>
                <div className="right-container"></div>
            </div>
            <Comment width="75%" className="mt-4 mb-4" />
        </div>

    )
}

export default MyCvPage
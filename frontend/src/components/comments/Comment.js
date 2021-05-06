import React from 'react'
import Block from '../../custom-components/Block'
import CommentInput from './CommentInput'
import CommentText from './CommentText'
import styled from 'styled-components'
import Vars from '../other-stuffs/Vars'
import Text from '../../custom-components/Text'
import useRoute from '../authenticate/useRoute'
import Loading from '../loading'
import { connect } from 'react-redux'

const BlockStyled = styled(Block)`
    @media (max-width: ${props => props.mediaMaxWidth ? props.mediaMaxWidth : "600px"}){
        width: 100%;
    }
`

const Comment = ({ width, dispatch, socket, socketExecutor, current_saveDataId, className }) => {
    const route = useRoute()
    const saveDataIdQuery = route.querySaveDataId

    const [comments, setComments] = React.useState([])
    const [needLoading, setNeedLoading] = React.useState(true)
    const [reloadCommentExecutor, setReloadCommentExecutor] = React.useState(0)

    React.useEffect(() => {
        (async function () {
            setNeedLoading(true)
            let rawData = await Vars.fetchApi(Vars.urlGetComments(saveDataIdQuery))
            if (rawData.messenger === "successfully!") {
                setComments(rawData.docs)
            }
            setNeedLoading(false)
        })()
    }, [reloadCommentExecutor, current_saveDataId, socketExecutor])

    const handleSendBtn = async (content) => {
        if (!saveDataIdQuery) {
            Vars.showToast(dispatch, "You cannot comment in an unsaved file! If you want to comment, lets save your file first!", Vars.angryImg)
            return
        }
        setNeedLoading(true)
        const success = await Vars.fetchApi(Vars.urlAddComment(), {
            method: "POST",
            data: {
                content,
                createdIn: saveDataIdQuery
            }
        })
        if (!success) {
            Vars.signOut(dispatch)
            return
        }
        socket.emit(`comment-sent`, { savefileId: saveDataIdQuery, commentContent: content })
        setReloadCommentExecutor(pre => ++pre)
    }

    return (
        <BlockStyled width={width} mediaMaxWidth={Vars.MEDIA_MAX_WIDTH} className={className}>
            <Text fontSize={Vars.FONT_SIZE_SM} className="mb-2">Lets discuss something about this cv</Text>
            { needLoading && <Loading />}
            <Block width="100%" className="comments-block mb-3">
                {
                    comments.map(comment => {
                        return (
                            <CommentText key={comment._id} width="100%" createdBy={comment.createdBy.email}>
                                {comment.content}
                            </CommentText>
                        )
                    })
                }
            </Block>
            <CommentInput handleSendBtn={handleSendBtn} />
        </BlockStyled>
    )
}

const mapStoreToProps = (currentStore) => {
    return {
        current_saveDataId: currentStore.user.current_saveDataId,
        socket: currentStore.io.socket,
        socketExecutor: currentStore.io.socketExecutor
    }
}

export default connect(mapStoreToProps)(Comment)
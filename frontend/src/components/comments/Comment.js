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

const Comment = ({ width, current_saveDataId, className }) => {
    const route = useRoute()
    const saveDataIdQuery = route.querySaveDataId

    const [comments, setComments] = React.useState([])
    const [needLoading, setNeedLoading] = React.useState(true)
    const [countSend, setCountSend] = React.useState(0)

    React.useEffect(() => {
        (async function () {
            setNeedLoading(true)
            let rawData = await Vars.fetchApi(Vars.urlGetComments(saveDataIdQuery))
            if (rawData.messenger === "successfully!") {
                setComments(rawData.docs)
            }
            setNeedLoading(false)
        })()
    }, [countSend, current_saveDataId])

    const handleSendBtn = async (content) => {
        setNeedLoading(true)
        await Vars.fetchApi(Vars.urlAddComment(), {
            method: "POST",
            data: {
                content,
                createdIn: saveDataIdQuery
            }
        })
        Vars.getSocket().emit(`comment-sent`, saveDataIdQuery)
        setCountSend(pre => ++pre)
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
        current_saveDataId: currentStore.user.current_saveDataId
    }
}

export default connect(mapStoreToProps)(Comment)
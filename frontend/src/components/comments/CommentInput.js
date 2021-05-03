import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import Vars from '../other-stuffs/Vars'

const CommentInput = ({ handleSendBtn }) => {
    const dispatch = useDispatch()
    const [content, setContent] = React.useState("")

    const handleChangleInput = (e) => {
        setContent(e.target.value)
    }

    const _handleSendBtnClick = () => {
        if (!Vars.isUserSignIn() || content.trim().length === 0) {
            Vars.showNotify(dispatch, "You can't comment!", Vars.sadImg)
            setContent("")
            return
        }
        handleSendBtn(content)
        setContent("")
    }

    return (
        <InputGroup className="mb-3" >
            <FormControl
                placeholder="Please write something about this cv"
                aria-label="comment"
                aria-describedby="basic-addon2"
                value={content} onChange={handleChangleInput}
            />
            <InputGroup.Append>
                <Button variant="outline-dark" onClick={_handleSendBtnClick}>Send</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default (CommentInput)
import React from 'react'
import Toast from 'react-bootstrap/Toast'
import { useDispatch, useSelector } from 'react-redux'
import Vars from '../other-stuffs/Vars'

const BoostrapToast = () => {
    const [timeoutId, setTimeoutId] = React.useState(0)
    const dispatch = useDispatch()
    const { isToastShow, content, image } = useSelector(state => state.modal.toast)

    React.useEffect(() => {
        if (isToastShow) {
            clearTimeout(timeoutId)
            const id = setTimeout(() => {
                Vars.closeToast(dispatch)
            }, 3500)
            setTimeoutId(id)
        }
    }, [isToastShow])

    return (
        <Toast
            onClose={() => Vars.closeToast(dispatch)}
            show={isToastShow} style={{ zIndex: Vars.MODAL_ZINDEX, position: "fixed", right: "2rem", top: "3.2rem" }}
        >
            <Toast.Header>
                <img style={{ width: "1.2rem" }} src={image} className="rounded mr-2" alt="" />
                <strong className="mr-auto">Notification</strong>
                <small>just now</small>
            </Toast.Header>
            <Toast.Body>{content}</Toast.Body>
        </Toast>
    )
}

export default (BoostrapToast)
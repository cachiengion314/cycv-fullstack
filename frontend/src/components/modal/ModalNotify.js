import React from 'react';
import Vars from '../other-stuffs/Vars';
import { connect } from 'react-redux';
import Modal from '../../custom-components/Modal';
import Text from "../../custom-components/Text";
import Button from "../../custom-components/Button";
import Avatar from '../../custom-components/Avatar';
import Block from '../../custom-components/Block';

const NO = "No";
const YES = "Yes";

const ModalNotify = ({ isModalShow, title, dispatch, content, yesAction, noAction, onTimeout, fakeLoadingTime, image, className }) => {
    const [timeoutId, setTimeoutId] = React.useState(0);

    const handleClick = (e) => {
        switch (title) {
            case Vars.NOTIFY_SHOW_EVENT:
                Vars.closeModal(dispatch, Vars.MODAL_NOTIFY);
                break;
            case Vars.YESNO_SHOW_EVENT:
                Vars.closeModal(dispatch, Vars.MODAL_NOTIFY);
                if (e.target.textContent === YES) {
                    yesAction();
                } else if (e.target.textContent === NO) {
                    noAction();
                }
                break;
        }
    }

    React.useEffect(() => {
        if (title === Vars.LOADING_SHOW_EVENT && isModalShow) {
            if (fakeLoadingTime) {
                clearTimeout(timeoutId);
                let _timeoutId = setTimeout(onTimeout, fakeLoadingTime);
                setTimeoutId(_timeoutId);
                return;
            }
            onTimeout();
            return;
        }
        // eslint-disable-next-line
    }, [isModalShow, title]);

    return (
        <Modal
            isModalShow={isModalShow}
            zIndex={Vars.MODAL_ZINDEX} mediaMaxWidth={Vars.MEDIA_MAX_WIDTH} className={className}
        >
            <Text textAlign="center" fontSize={Vars.FONT_SIZE_MD} className="mb-2">
                {content}
            </Text>
            <Avatar width="50%" src={image} className="mb-3" />
            {
                title === Vars.NOTIFY_SHOW_EVENT &&
                <Button width="25%" onClick={handleClick} fontSize={Vars.FONT_SIZE_MD}>OK</Button>
                || title === Vars.YESNO_SHOW_EVENT &&
                <Block width="100%" flexbox={true} className="align-h-center">
                    <Button width="25%" onClick={handleClick} fontSize={Vars.FONT_SIZE_MD} className="me-3">{NO}</Button>
                    <Button width="25%" onClick={handleClick} fontSize={Vars.FONT_SIZE_MD}>{YES}</Button>
                </Block>
                || title === Vars.LOADING_SHOW_EVENT &&
                false
            }
        </Modal>
    )
}
const mapCurrentStoreTopProps = (currentStore) => {
    return {
        content: currentStore.modal.notify.content,
        isModalShow: currentStore.modal.notify.isModalShow,
        image: currentStore.modal.notify.image,
        title: currentStore.modal.notify.title,
        yesAction: currentStore.modal.notify.yesAction,
        noAction: currentStore.modal.notify.noAction,
        onTimeout: currentStore.modal.notify.onTimeout,
        fakeLoadingTime: currentStore.modal.notify.fakeLoadingTime,
    }
}

export default connect(mapCurrentStoreTopProps)(ModalNotify);
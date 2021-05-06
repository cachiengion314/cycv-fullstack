import React from 'react';
import Vars from '../other-stuffs/Vars';
import { connect } from 'react-redux';
import Modal from '../../custom-components/Modal';
import Text from "../../custom-components/Text";
import Button from "../../custom-components/Button";
import Block from '../../custom-components/Block';

const ModalCustom = ({ isModalShow, width, title, dispatch, content, modalBody, className }) => {
    const handleClick = (e) => {
        switch (title) {
            case Vars.CUSTOM_SHOW_EVENT:
                Vars.closeModal(dispatch, Vars.MODAL_CUSTOM);
                break;
        }
    }

    const renderModalBody = () => {
        if (modalBody) {
            return modalBody.render();
        }
    }

    return (
        <Modal
            width={width} isModalShow={isModalShow}
            zIndex={Vars.MODAL_ZINDEX} mediaMaxWidth={Vars.MEDIA_MAX_WIDTH} className={className}
        >
            <Text textAlign="center" fontSize={Vars.FONT_SIZE_MD} className="mb-2">
                {content}
            </Text>
            <Block width="100%" flexbox={true} className="mb-3 align-center">
                {
                    modalBody &&
                    modalBody.render()
                }
            </Block>
            <Button width="25%" onClick={handleClick} fontSize={Vars.FONT_SIZE_MD}>Close</Button>
        </Modal>
    )
}
const mapCurrentStoreTopProps = (currentStore) => {
    return {
        content: currentStore.modal.custom.content,
        isModalShow: currentStore.modal.custom.isModalShow,
        title: currentStore.modal.custom.title,
        modalBody: currentStore.modal.custom.modalBody,
        width: currentStore.modal.custom.width,
    }
}

export default connect(mapCurrentStoreTopProps)(ModalCustom);
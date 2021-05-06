import React from 'react';
import Vars from '../other-stuffs/Vars';
import { connect } from 'react-redux';
import Modal from '../../custom-components/Modal';
import Text from "../../custom-components/Text";
import Button from "../../custom-components/Button";
import EditableAvatar from '../other-stuffs/EditableAvatar';
import Block from '../../custom-components/Block';
import Utility from '../../custom-components/Utility';

const ModalOption = ({ isModalShow, title, dispatch, content, chooseAction, images, className }) => {
    const [avatarUrl, setImageUrl] = React.useState("")
    const [avatarUrl_2, setImageUrl_2] = React.useState("")

    const handleCloseClick = (e) => {
        switch (title) {
            case Vars.OPTION_SHOW_AVATAR_EVENT:
                if (avatarUrl_2) {
                    chooseAction.bind(null, avatarUrl_2)();
                    setImageUrl_2("");
                    Vars.closeModal(dispatch, Vars.MODAL_OPTION);
                    return
                }
                if (avatarUrl) {
                    chooseAction.bind("", avatarUrl)()
                    setImageUrl("")
                    Vars.closeModal(dispatch, Vars.MODAL_OPTION)
                    return
                }
                Vars.closeModal(dispatch, Vars.MODAL_OPTION)
                break
        }
    }

    const uploadImage = async (formData) => {
        const rawData = await Vars.fetchApi(`https://api.cloudinary.com/v1_1/cachiengion314/image/upload`, {
            method: "POST",
            data: formData,
        })
        console.log(`uploadImage.rawData`, rawData)
        return rawData
    }

    const prepareToUploadFile = (e) => {
        const regexCheckImg = /([.]png|[.]jpg|[.]jpeg)$/i
        if (!regexCheckImg.test(e.target.files[0].name)) {
            Vars.showNotify(dispatch, `Sorry, we don't support this type of image! Please try png or jpeg!`, Vars.sadImg)
            return;
        }
        const formData = new FormData()
        formData.append(`file`, e.target.files[0])
        formData.append(`upload_preset`, "cachiengion314image")
        Vars.showLoading(dispatch, `Please wait...!`, async () => {
            const rawData = await uploadImage(formData);
            setImageUrl((previousVal) => {
                return rawData.url
            });
            Vars.closeModal(dispatch, Vars.MODAL_NOTIFY)
        });
    }

    const handleTypeUrlString = (e) => {
        setImageUrl_2(e.target.value)
    }

    return (
        <Modal
            width={"60%"} isModalShow={isModalShow}
            zIndex={Vars.MODAL_ZINDEX} mediaMaxWidth={Vars.MEDIA_MAX_WIDTH} className={className}
        >
            <Text textAlign="center" fontSize={Vars.FONT_SIZE_MD} className="mb-2">
                {content}
            </Text>
            <Block width="fit-content" className="mb-3 align-center">
                <Block width="100%" flexbox={true} className="mb-3 align-h-center">
                    {
                        images.map(imgUrl => {
                            return (
                                <EditableAvatar
                                    key={Utility.getRandomHash()} width="5rem" src={imgUrl}
                                    onClick={chooseAction.bind(null, imgUrl)}
                                    className="me-2 mb-2"
                                />
                            )
                        })
                    }
                </Block>

                <Block width={"60%"} height="1px" background="darkblue" className=""></Block>

                <Block width={"100%"} className="mt-3 align-center">
                    <Text textAlign="center" fontSize={Vars.FONT_SIZE_MD}>
                        Or you can just upload your own image instead!
                    </Text>
                    <Text textAlign="center" fontSize={Vars.FONT_SIZE_SM}>
                        (Please using image with only 1:1 ratio)
                    </Text>
                    <input type="file" onChange={prepareToUploadFile} className={`mb-3 mt-2`} />
                    <EditableAvatar width={"25%"} onClick={chooseAction.bind(null, avatarUrl)} src={avatarUrl || Vars.manAva2Img} className="mb-1" />
                    <Text textAlign="center" fontSize={Vars.FONT_SIZE_SM}>
                        Using image url is also a good choice!
                    </Text>
                    <input style={{ width: "80%" }} type="text" value={avatarUrl_2} onChange={handleTypeUrlString} className={`mt-1`} />
                </Block>
            </Block>
            <Button width="25%" onClick={handleCloseClick} fontSize={Vars.FONT_SIZE_MD}>OK</Button>
        </Modal>
    )
}
const mapCurrentStoreTopProps = (currentStore) => {
    return {
        content: currentStore.modal.option.content,
        isModalShow: currentStore.modal.option.isModalShow,
        images: currentStore.modal.option.images,
        title: currentStore.modal.option.title,
        chooseAction: currentStore.modal.option.chooseAction,
    }
}

export default connect(mapCurrentStoreTopProps)(ModalOption);
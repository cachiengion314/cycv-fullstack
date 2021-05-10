import React from 'react'
import Block from '../../custom-components/Block'
import Avatar from '../../custom-components/Avatar'
import Text from '../../custom-components/Text'
import Vars from '../other-stuffs/Vars'
import styled from "styled-components"
import useRoute from '../authenticate/useRoute'

const TextWrap = styled(Text)`
-ms-word-break: break-all;
word-break: break-all;
word-break: break-word;

-webkit-hyphens: auto;
-moz-hyphens: auto;
hyphens: auto;
`

const BlockHover = styled(Block)`
    cursor: pointer;
    &:hover {
        transition: .5s;
        background-color: lightgreen;
    }
`

const UserCvThumpnail = ({ width, createdBy, saveDataId, thumbnailUrl, fileName, className }) => {
    const route = useRoute()

    const handleThumnailClick = (e) => {
        route.push(Vars.url_username_saveid("public-cv", saveDataId))
    }

    return (
        <BlockHover width={width} onClick={handleThumnailClick} padding="1rem" borderRadius=".5rem" border="1px solid darkblue" className={className}>
            <Avatar width="100%" src={thumbnailUrl || "https://res.cloudinary.com/cachiengion314/image/upload/v1619364371/cv_template_2_rl98uw.jpg"} alt="Cv-thumnail" className="mb-2" />
            <TextWrap width="100%" fontSize={Vars.FONT_SIZE_SSM} textAlign="center" className="text-secondary">{createdBy}</TextWrap>
            <TextWrap width="100%" fontSize={Vars.FONT_SIZE_SSM} textAlign="center" className=" text-primary">{fileName}</TextWrap>
        </BlockHover>
    )
}

export default UserCvThumpnail
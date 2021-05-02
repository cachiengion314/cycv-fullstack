import React from 'react'
import Block from '../../custom-components/Block'
import Avatar from '../../custom-components/Avatar'
import Text from '../../custom-components/Text'
import Vars from '../other-stuffs/Vars'
import styled from "styled-components"
import useRoute from '../authenticate/useRoute'

const BlockHover = styled(Block)`
    cursor: pointer;
    &:hover {
        transition: .5s;
        background-color: lightgreen;
    }
`

const UserCvThumpnail = ({ width, createdBy, saveDataId, fileName, className }) => {
    const route = useRoute()

    const handleThumnailClick = (e) => {
        route.push(Vars.url_username_saveid("user_name", saveDataId))
    }

    return (
        <BlockHover width={width} onClick={handleThumnailClick} padding="1rem" borderRadius=".5rem" border="1px solid darkblue" className={className}>
            <Avatar width="100%" src="https://res.cloudinary.com/cachiengion314/image/upload/v1619364371/cv_template_2_rl98uw.jpg" alt="Cv-thumnail" className="mb-2" />
            <Text width="100%" fontSize={Vars.FONT_SIZE_SSM} textAlign="center" className="text-secondary">{createdBy}</Text>
            <Text width="100%" fontSize={Vars.FONT_SIZE_SSM} textAlign="center" className=" text-primary">{fileName}</Text>
        </BlockHover>
    )
}

export default UserCvThumpnail
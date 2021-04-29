import React from 'react'
import Block from '../../custom-components/Block'
import Avatar from '../../custom-components/Avatar'
import Text from '../../custom-components/Text'
import Vars from '../other-stuffs/Vars'

const UserCvThumpnail = ({ width, createdBy, fileName, className }) => {
    const STR_splitSpace = (STR) => {
        if (STR.length > 12) {
            const _index = STR.search(/(@|\w[/]\w)/g);
            if (_index > -1) {
                return STR.slice(0, _index) + " " + STR.slice(_index);
            }

        }
        return STR;
    }

    const calculateSplitSpaceFor = (givenContent) => {
        return givenContent.length < 13 ? givenContent : STR_splitSpace(givenContent);
    }

    createdBy = React.useMemo(() => calculateSplitSpaceFor(createdBy),
    // eslint-disable-next-line
    [])

    return (
        <Block width={width} padding="1rem" borderRadius=".5rem" border="1px solid darkblue" className={className}>
            <Avatar width="100%" src="https://res.cloudinary.com/cachiengion314/image/upload/v1619364371/cv_template_2_rl98uw.jpg" className="mb-2" />
            <Text width="100%" fontSize={Vars.FONT_SIZE_SSM} textAlign="center" className="text-secondary">{createdBy}</Text>
            <Text width="100%" fontSize={Vars.FONT_SIZE_SSM} textAlign="center" className=" text-primary">{fileName}</Text>
        </Block>
    )
}

export default UserCvThumpnail
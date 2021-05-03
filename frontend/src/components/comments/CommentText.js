import React from 'react'
import Block from '../../custom-components/Block'
import Text from '../../custom-components/Text'
import Vars from '../other-stuffs/Vars'

const CommentText = ({ width, createdBy, className, children }) => {
    return (
        <Block width={width} flexbox={true} className={className}>
            <Text fontSize={Vars.FONT_SIZE_SSM} className="text-primary me-2">{createdBy}:</Text>
            <Text fontSize={Vars.FONT_SIZE_SSM} className={"text-secondary"}>
                {children}
            </Text>
        </Block>
    )
}

export default CommentText
import React from 'react'
import Block from '../../custom-components/Block'
import Text from '../../custom-components/Text'
import Vars from '../other-stuffs/Vars'
import styled from 'styled-components'

const TextWrap = styled(Text)`
-ms-word-break: break-all;
word-break: break-all;
word-break: break-word;

-webkit-hyphens: auto;
-moz-hyphens: auto;
hyphens: auto;
`

const CommentText = ({ width, createdBy, className, children }) => {
    return (
        <Block width={width} flexbox={true} className={className}>
            <Text fontSize={Vars.FONT_SIZE_SSM} className="text-primary me-2">{createdBy}:</Text>
            <TextWrap fontSize={Vars.FONT_SIZE_SSM} className={"text-secondary"}>
                {children}
            </TextWrap>
        </Block>
    )
}

export default CommentText
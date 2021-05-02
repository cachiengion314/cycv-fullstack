import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Block from '../../custom-components/Block'

const Loading = ({ minHeight }) => {
    return (
        <Block style={{ minHeight: minHeight }} width="100%" padding="1rem " className="users-cv align-center mb-2" >
            <Spinner animation="grow" role="status" />
        </Block>
    )
}

export default Loading
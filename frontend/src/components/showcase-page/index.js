import React from 'react'
import Block from '../../custom-components/Block'
import Pagination from './Pagination'
import UserCvThumpnail from './UserCvThumpnail'

const Index = ({ dispatch }) => {
    const [activePage, setActivePage] = React.useState(1)

    const handlePagiClick = (i) => {
        setActivePage(i)
    }

    return (
        <Block width="100%" padding="1rem" >
            <Block width="100%" flexbox={true} className="users-cv align-h-center mb-2">
                <UserCvThumpnail
                    width="100" className="me-2 mb-2"
                    createdBy={"cachiengion314@gmail.com"} fileName={"your_save_file_1"}
                />
            </Block>
            <Pagination activePage={activePage} totalItem={14} handlePagiClick={handlePagiClick} className="float-end me-5" />
        </Block>
    )
}

export default Index
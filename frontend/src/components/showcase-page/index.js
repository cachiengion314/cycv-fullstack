import React from 'react'
import Block from '../../custom-components/Block'
import Vars from '../other-stuffs/Vars'
import Pagination from './Pagination'
import UserCvThumpnail from './UserCvThumpnail'
import Loading from '../loading'
import Text from '../../custom-components/Text'

const WelcomeText = () => {
    return (
        <Block width="100%">
            <Text width="100%" textAlign="center" fontSize={Vars.FONT_SIZE_MD} className="text-primary">Welcome to create your CV show case</Text>
            <Text width="100%" textAlign="center" fontSize={Vars.FONT_SIZE_SM} className="mb-4 text-secondary">All of public cv documents will be placed here</Text>
        </Block>
    )
}

const Index = ({ dispatch }) => {
    const [activePage, setActivePage] = React.useState(1)
    const [usersCvSavefiles, setUsersCvSavefiles] = React.useState([])
    const [totalCv, setTotalCv] = React.useState(14)
    const [needLoading, setNeedLoading] = React.useState(true)

    React.useEffect(() => {
        (async function (setUsersCvSavefiles, Vars) {
            const rawData = await Vars.fetchApi(Vars.urlAllPublicSavefiles(activePage))
            if (!rawData) {
                console.log(`fetch fail!`)
                setNeedLoading(false)
                return
            }
            const { totalItems, allSaveFiles, } = rawData.docs[0]
            const _totalCv = totalItems.total
            if (rawData.messenger === "successfully!") {
                setUsersCvSavefiles(allSaveFiles)
                setTotalCv(_totalCv)
            }
            setNeedLoading(false)
        })(setUsersCvSavefiles, Vars);
    }, [activePage])

    const handlePagiClick = (i) => {
        setActivePage(i)
        setNeedLoading(true)
    }

    if (needLoading) {
        return (
            <Block style={{ minHeight: "12rem" }} width="100%" padding="1rem" >
                <WelcomeText />
                <Block width="100%" flexbox={true} className="users-cv align-h-center mb-2">
                    <Loading minHeight="12rem" />
                </Block>
                <Pagination activePage={activePage} totalItems={totalCv} handlePagiClick={handlePagiClick} className="float-end me-5" />
            </Block>
        )
    }

    if (usersCvSavefiles.length === 0) {
        return (
            <Block style={{ minHeight: "12rem" }} width="100%" padding="1rem" >
                <WelcomeText />
                <Block width="100%" flexbox={true} className="users-cv align-h-center mb-2">
                    <Text fontSize={Vars.FONT_SIZE_SM}>There is no data</Text>
                </Block>
                <Pagination activePage={activePage} totalItems={totalCv} handlePagiClick={handlePagiClick} className="float-end me-5" />
            </Block>
        )
    }

    return (
        <Block style={{ minHeight: "12rem" }} width="100%" padding="1rem" >
            <WelcomeText />
            <Block width="100%" flexbox={true} className="users-cv align-h-center mb-2">
                {
                    usersCvSavefiles.map(savefile => {
                        return (
                            <UserCvThumpnail
                                width="14rem" className="me-2 mb-2" key={savefile._id}
                                createdBy={savefile.createdBy} fileName={savefile.saveData.name}
                                saveDataId={savefile._id} thumbnailUrl={savefile.saveData.homePage.aboutMe[0].image}
                            />
                        )
                    })
                }
            </Block>
            <Pagination activePage={activePage} totalItems={totalCv} handlePagiClick={handlePagiClick} className="float-end me-5" />
        </Block>
    )
}

export default Index
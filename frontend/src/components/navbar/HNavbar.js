import React from 'react'
import Block from '../../custom-components/Block'
import Text from "../../custom-components/Text"
import styled from "styled-components"
import Vars from '../other-stuffs/Vars'
import { connect } from "react-redux"
import SignUp from './SignUp'
import SignIn from './SignIn'

const HNavbarStyled = styled.div`
    display: block;
    width: ${props => props.width || "fit-content"};
    height: ${props => props.height || "fit-content"};
    z-index: ${props => props.zIndex || "10"};
    top: ${props => props.top || "0"};
    left: 0;
    position: fixed;
    background-color: lightgreen;
    transition-property: top;
    transition: all .25s ease;
`;

const HoverBlockStyled = styled(Block)`
    float: left;
    background-color: inherit;
    &:hover{
        background-color: lightyellow;
        transition-property: background-color;
        transition: all .5s ease;
    }
    @media (max-width : ${props => props.mediaMaxWidth || "600px"}){
        &{
            width : 25%;
        }
    }
`;
const HoverTextStyled = styled(Text)`
    color: black;
    overflow: hidden;
    max-width: 10rem;
    max-height: 3rem;
    &:hover{
            color: blue;
            transition-property: color;
            transition: all .5s ease;
    }
`;

const SingleNavBlock = ({ className, onClick, width, textLineHeight, content }) => {
    return (
        <HoverBlockStyled width={width} height="100%" mediaMaxWidth={Vars.MEDIA_MAX_WIDTH} padding="0 1rem" className={className}>
            <HoverTextStyled lineHeight={textLineHeight} onClick={onClick} fontSize={Vars.FONT_SIZE_SM}>{content}</HoverTextStyled>
        </HoverBlockStyled>
    )
}

const HNavbar = ({ className, userId, name, dispatch, top, width, height }) => {
    const handleMyCVClick = () => {
        Vars.redirectToHomePage();
    }

    const handleSignIn = () => {
        Vars.showCustomModal(dispatch,
            "Sign In - Welcome back Sir!",
            "70%",
            Vars.createModalBody(<SignIn width="70%" className="" />)
        );
    }
    const handleSignUp = () => {
        Vars.showCustomModal(dispatch,
            "Sign Up - It's free and we don't spy up on you or anything!",
            "70%",
            Vars.createModalBody(<SignUp width="70%" className="" />)
        );
    }
    const handleSignOut = () => {
        Vars.showYesNo(dispatch, "Are you sure want to sign out?", () => {
            Vars.signOut(dispatch);
        })
    }
    const handleNameClick = () => {
        Vars.showNotify(dispatch, `${name} is your current name!`)
    }

    const handleShowCaseClick = () => {
        
    }

    return (
        <HNavbarStyled width={width} top={top} height={height} zIndex={Vars.H_NAVBAR_ZINDEX} className={className}>
            <SingleNavBlock width="12%" onClick={handleShowCaseClick} textLineHeight={height} content="Show Case" className="" />
            <SingleNavBlock width="12%" onClick={handleMyCVClick} textLineHeight={height} content="My CV" className="" />
            {
                userId &&
                <>
                    <SingleNavBlock width="12%" onClick={handleNameClick} textLineHeight={height} content={name} className=" float-end" />
                    <SingleNavBlock width="12%" onClick={handleSignOut} textLineHeight={height} content={"Sign Out"} className=" float-end" />
                </>
                ||
                <>
                    <SingleNavBlock width="12%" onClick={handleSignUp} textLineHeight={height} content={"Sign Up"} className=" float-end" />
                    <SingleNavBlock width="12%" onClick={handleSignIn} textLineHeight={height} content={"Sign In"} className=" float-end" />
                </>
            }
        </HNavbarStyled>
    )
}

const mapStoreToProps = (currentStore) => {
    return { userId: currentStore.user.userId, name: currentStore.user.name }
}

export default connect(mapStoreToProps)(HNavbar);
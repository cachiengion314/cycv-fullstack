import React from 'react';
import AboutMe from "./about-me";
import Block from "../../custom-components/Block";
import BigTitle from "./big-title";
import Description from "./description";
import styled from "styled-components";
import Vars from "../other-stuffs/Vars";
import { connect } from 'react-redux';

const HomeBlock = styled(Block)`
    @media (max-width : ${props => props.mediaMaxWidth || "600px"}){
        &{
            display: block;
            width: 100%;
        }
    }
`;

const Home = ({ width, tinyPreference_selectedTarget, className }) => {
    const _leftBlock_width = "38%";
    const _rightBlock_width = "62%";

    switch (tinyPreference_selectedTarget) {
        case Vars.SPLIT_LEFT_ICON:
            return (
                <HomeBlock width={width} mediaMaxWidth={Vars.MEDIA_MAX_WIDTH} display={"flex"} className={className}>
                    <AboutMe width={_leftBlock_width} border="1px solid darkblue" borderRadius="1rem" />
                    <HomeBlock width={_rightBlock_width} padding="0 .3rem 0 1.2rem">
                        <BigTitle width="100%" className="mb-3" />
                        <Description smallWidthBar width="100%" />
                    </HomeBlock>
                </HomeBlock>
            )

        case Vars.SPLIT_RIGHT_ICON:
            return (
                <HomeBlock width={width} mediaMaxWidth={Vars.MEDIA_MAX_WIDTH} display={"flex"} className={className}>
                    <HomeBlock width={_rightBlock_width} padding="0 1.2rem 0 .3rem">
                        <BigTitle width="100%" className="mb-3" />
                        <Description smallWidthBar width="100%" className="mb-3" />
                    </HomeBlock>
                    <AboutMe width={_leftBlock_width} border="1px solid darkblue" borderRadius="1rem" />
                </HomeBlock>
            )
        case Vars.SPLIT_TOP_ICON:
            return (
                <HomeBlock width={width} mediaMaxWidth={Vars.MEDIA_MAX_WIDTH} display={"block"} className={className}>
                    <BigTitle width="100%" className="mb-3" />
                    <HomeBlock width="100%" flexbox={true} padding="0 0 0 0">
                        <AboutMe width={"36%"} border="1px solid darkblue" borderRadius="1rem" className="mb-3" />
                        <Block width="2%" />
                        <Description width={"62%"} />
                    </HomeBlock>
                </HomeBlock>
            )
    }
}

const mapCurrentStoreToProps = (currentStore) => {
    return {
        tinyPreference_selectedTarget: currentStore.preference.tinyPreference.selectedTarget
    }
}

export default connect(mapCurrentStoreToProps)(Home);
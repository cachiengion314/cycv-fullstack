import React from 'react';
import styled from "styled-components";
import Utility from '../../../custom-components/Utility';
import Vars from '../../other-stuffs/Vars';

const Svg = styled.svg`
    position: absolute;
    top: ${props => props.top || "0"};
    right: ${props => props.right || "1.3rem"};
    z-index: ${props => props.zIndex || "0"};
    transition-property: right;
    transition: all .5s ease;
`;
const SvgText = styled.text`
    fill: lightgray;
    cursor: pointer;
    font-size: .7em;
    font-weight: bold;
    transition-property: fill;
    transition: all .5s ease;
    &:hover {
        fill: black;
    }
`;
const MoreIcon = ({ width, top, right, onClick, className }) => {
    const { val, metric } = Utility.convertToNumber(width);

    const centerEndOf_Line1Pos = { x: val / 4.2, y: val * 21 / 21 };
    const textPos = { x: Utility.convertToMetric(centerEndOf_Line1Pos.x, metric), y: Utility.convertToMetric(centerEndOf_Line1Pos.y * 19 / 21, metric) };

    return (
        <Svg width={width} height={width} top={top} right={right}
            onClick={onClick} zIndex={Vars.TINY_ICON_ZINDEX}
            className={className}
        >
            <SvgText x={textPos.x} y={textPos.y}>more</SvgText>
        </Svg>
    )
}

export default MoreIcon;
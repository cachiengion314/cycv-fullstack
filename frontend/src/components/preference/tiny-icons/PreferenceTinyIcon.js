import React from 'react'
import styled from "styled-components";
import Utility from '../../../custom-components/Utility';
import Vars from '../../other-stuffs/Vars';

const Svg = styled.svg`
    position: absolute;
    top: ${props => props.top || "0"};
    right: ${props => props.right || "1.3rem"};
    z-index: ${props => props.zIndex || "1"};
`;
const Circle = styled.circle`
    fill: white;
    stroke: ${props => props.isIconActive && "black" || "lightgray"};
    stroke-dasharray: ${props => props.strokeDashWidth || "4px"} ${props => props.strokeDashGap || "4px"};
    stroke-dashoffset: ${props => props.strokeDashoffset || "0"};
    transition-property: stroke-dashoffset, stroke-dasharray, stroke;
    transition: all 1s ease;
    &:hover {
        stroke: black;
    }
`;
const Line = styled.line`
    stroke: ${props => props.isIconActive && "black" || "lightgray"};
    stroke-width: ${props => props.strokeWidth || ".1em"};
    transition-property: stroke-width, stroke;
    transition: all 1s ease;
    &:hover {
        stroke: black;
    }
`;

const PreferenceTinyIcon = ({ width, top, right, onClickWhenOff, onClickWhenOn }) => {
    const [isIconActive, setIconActive] = React.useState(false);
    const { val, metric } = Utility.convertToNumber(width);

    let _strokeWidth = val / 10;
    let _r = val / 2 - _strokeWidth / 2;
    let _cx = val / 2;

    let _lStrokeWidth_Default = _strokeWidth * 3 / 4;
    let _lStrokeWidth_Big = _lStrokeWidth_Default * 2;
    let _cStrokeDashGap_Default = _strokeWidth * 2;
    let _cStrokeDashGap_Small = 0;

    _r = Utility.convertToMetric(_r, metric);
    _cx = Utility.convertToMetric(_cx, metric);
    _strokeWidth = Utility.convertToMetric(_strokeWidth, metric);

    _lStrokeWidth_Default = Utility.convertToMetric(_lStrokeWidth_Default, metric);
    _lStrokeWidth_Big = Utility.convertToMetric(_lStrokeWidth_Big, metric);
    _cStrokeDashGap_Default = Utility.convertToMetric(_cStrokeDashGap_Default, metric);
    _cStrokeDashGap_Small = Utility.convertToMetric(_cStrokeDashGap_Small, metric);

    const [strokeDashOffsetVal, setStrokeDashOffsetVal] = React.useState(0);
    const [strokeDashGapVal, setStrokeDashGapVal] = React.useState(_cStrokeDashGap_Default);
    const [lineStrokeWidthVal, setLineStrokeWidthVal] = React.useState(_lStrokeWidth_Default);

    const handleCircleClick = (e) => {
        if (!strokeDashOffsetVal) {
            setIconActive(true);
            setStrokeDashOffsetVal(30);
            setStrokeDashGapVal(_cStrokeDashGap_Small);
            setLineStrokeWidthVal(_lStrokeWidth_Big);
            onClickWhenOff && onClickWhenOff(e);
        } else {
            setIconActive(false);
            setStrokeDashOffsetVal(0);
            setStrokeDashGapVal(_cStrokeDashGap_Default);
            setLineStrokeWidthVal(_lStrokeWidth_Default);
            onClickWhenOn && onClickWhenOn(e);
        }
    }
    const half_lineWidth = val * 21 / 100;

    const centerOf_line1Pos = { x: val / 2, y: val * 8 / 21 };
    const first_line1Pos = { x: Utility.convertToMetric(centerOf_line1Pos.x - half_lineWidth, metric), y: Utility.convertToMetric(centerOf_line1Pos.y, metric) };
    const second_line1Pos = { x: Utility.convertToMetric(centerOf_line1Pos.x + half_lineWidth, metric), y: Utility.convertToMetric(centerOf_line1Pos.y, metric) };

    const centerOf_line2Pos = { x: val / 2, y: val * 11 / 21 };
    const first_line2Pos = { x: Utility.convertToMetric(centerOf_line2Pos.x - half_lineWidth, metric), y: Utility.convertToMetric(centerOf_line2Pos.y, metric) };
    const second_line2Pos = { x: Utility.convertToMetric(centerOf_line2Pos.x + half_lineWidth, metric), y: Utility.convertToMetric(centerOf_line2Pos.y, metric) };

    const centerOf_line3Pos = { x: val / 2, y: val * 14 / 21 };
    const first_line3Pos = { x: Utility.convertToMetric(centerOf_line3Pos.x - half_lineWidth, metric), y: Utility.convertToMetric(centerOf_line3Pos.y, metric) };
    const second_line3Pos = { x: Utility.convertToMetric(centerOf_line3Pos.x + half_lineWidth, metric), y: Utility.convertToMetric(centerOf_line3Pos.y, metric) };

    return (
        <Svg width={width} height={width} top={top} right={right}
            onClick={handleCircleClick} zIndex={Vars.TINY_PREFERENCE_ZINDEX}
        >
            <Circle
                r={_r} cx={_cx} cy={_cx}
                strokeWidth={_strokeWidth} isIconActive={isIconActive}
                strokeDashWidth={_cStrokeDashGap_Default} strokeDashGap={strokeDashGapVal} strokeDashoffset={strokeDashOffsetVal}
            />
            <Line
                x1={first_line1Pos.x} y1={first_line1Pos.y} x2={second_line1Pos.x} y2={second_line1Pos.y}
                strokeWidth={lineStrokeWidthVal} isIconActive={isIconActive}
            />
            <Line
                x1={first_line2Pos.x} y1={first_line2Pos.y} x2={second_line2Pos.x} y2={second_line2Pos.y}
                strokeWidth={lineStrokeWidthVal} isIconActive={isIconActive}
            />
            <Line
                x1={first_line3Pos.x} y1={first_line3Pos.y} x2={second_line3Pos.x} y2={second_line3Pos.y}
                strokeWidth={lineStrokeWidthVal} isIconActive={isIconActive}
            />
        </Svg>
    )
}

export default PreferenceTinyIcon
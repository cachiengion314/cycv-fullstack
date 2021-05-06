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
const Line = styled.line`
    stroke: ${props => props.isIconActive && "black" || "lightgray"};
    stroke-width: ${props => props.strokeWidth || ".1em"};
    transition-property: stroke-width, stroke;
    transition: all .5s ease;
    &:hover {
        stroke: black;
    }
`;
const SplitRightIcon = ({ width, top, right, onClickWhenOff, onClickWhenOn, selectedTarget, className }) => {
    const _lineStrokeWidth_default = ".2em";
    const _lineStrokeWidth_big = ".32em";
    const { val, metric } = Utility.convertToNumber(width);

    const [lineStrokeWidthVal, setLineStrokeWidthVal] = React.useState(_lineStrokeWidth_default);
    const [isIconActive, setIconActive] = React.useState(false);

    React.useEffect(() => {
        if (className.includes(selectedTarget)) {
            setIconActive(true)
            setLineStrokeWidthVal(_lineStrokeWidth_big)
        } else {
            setIconActive(false)
            setLineStrokeWidthVal(_lineStrokeWidth_default)
        }
    }, [selectedTarget, className])

    const handleShapeClick = (e) => {
        if (!isIconActive) {
            setIconActive(true);
            setLineStrokeWidthVal(_lineStrokeWidth_big);
            onClickWhenOff && onClickWhenOff(e);
        } else {
            setIconActive(false);
            setLineStrokeWidthVal(_lineStrokeWidth_default);
            onClickWhenOn && onClickWhenOn(e);
        }
    }

    const half_lineWidth = val * 13 / 100;
    // main right
    const centerEndOf_Line1Pos = { x: val / 2 + half_lineWidth, y: val * 21 / 21 };
    const first_line1Pos = { x: Utility.convertToMetric(centerEndOf_Line1Pos.x, metric), y: Utility.convertToMetric(centerEndOf_Line1Pos.y * 3 / 21, metric) };
    const second_line1Pos = { x: Utility.convertToMetric(centerEndOf_Line1Pos.x, metric), y: Utility.convertToMetric(centerEndOf_Line1Pos.y * 17 / 21, metric) };
    // sub left
    const centerEndOf_Line2Pos = { x: val / 2 - half_lineWidth, y: val * 21 / 21 };
    const first_line2Pos = { x: Utility.convertToMetric(centerEndOf_Line2Pos.x, metric), y: Utility.convertToMetric(centerEndOf_Line2Pos.y * 4 / 21, metric) };
    const second_line2Pos = { x: Utility.convertToMetric(centerEndOf_Line2Pos.x, metric), y: Utility.convertToMetric(centerEndOf_Line2Pos.y * 7 / 21, metric) };

    const centerEndOf_Line3Pos = { x: val / 2 - half_lineWidth, y: val * 21 / 21 };
    const first_line3Pos = { x: Utility.convertToMetric(centerEndOf_Line3Pos.x, metric), y: Utility.convertToMetric(centerEndOf_Line3Pos.y * 8 / 21, metric) };
    const second_line3Pos = { x: Utility.convertToMetric(centerEndOf_Line3Pos.x, metric), y: Utility.convertToMetric(centerEndOf_Line3Pos.y * 12 / 21, metric) };

    const centerEndOf_Line4Pos = { x: val / 2 - half_lineWidth, y: val * 21 / 21 };
    const first_line4Pos = { x: Utility.convertToMetric(centerEndOf_Line4Pos.x, metric), y: Utility.convertToMetric(centerEndOf_Line4Pos.y * 13 / 21, metric) };
    const second_line4Pos = { x: Utility.convertToMetric(centerEndOf_Line4Pos.x, metric), y: Utility.convertToMetric(centerEndOf_Line4Pos.y * 18 / 21, metric) };

    return (
        <Svg width={width} height={width} top={top} right={right}
            onClick={handleShapeClick} zIndex={Vars.TINY_ICON_ZINDEX}
            className={className}
        >
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
            <Line
                x1={first_line4Pos.x} y1={first_line4Pos.y} x2={second_line4Pos.x} y2={second_line4Pos.y}
                strokeWidth={lineStrokeWidthVal} isIconActive={isIconActive}
            />
        </Svg>
    )
}

export default SplitRightIcon;
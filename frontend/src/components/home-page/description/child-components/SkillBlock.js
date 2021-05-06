import React from 'react';
import styled from "styled-components";
import Block from '../../../../custom-components/Block';
import Button from "../../../../custom-components/Button";
import Vars from "../../../other-stuffs/Vars";
import EditableText from "../../../other-stuffs/EditableText";
import Utility from '../../../../custom-components/Utility';

const Div = styled.div`
    position: relative;
    z-index: 2;
`;
const CoreText = styled(EditableText)`
    position: absolute;
    top: 3rem;
    left: 3rem;
    transform: translate(-50%,-50%);
    height: fit-content;
    cursor: pointer;
`;
const Svg = styled.svg`
    position: relative;
`;
const DummyCircle = styled.circle`
    position: absolute;
    top: 0%;
    left: 0%;
`;
const Circle = styled.circle`
    stroke-dasharray: ${props => props.strokeDashWidth || "4em"} ${props => props.strokeDashGap || "4em"};
    stroke-dashoffset: ${props => props.strokeDashOffset || 0};
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    transition-property: stroke-dashoffset;
    transition: all .5s ease;
`;

const SvgImg = ({ className, width, strokeWidth, percent, onChange }) => {
    let _defaultWidth = width;
    let _defaultStrokeWidth = strokeWidth;

    const calculateCircleRadiusAndPos = (WIDTH, STROKE_WIDTH) => {
        const calculateCircumference = (r) => {
            return 2 * Math.PI * r;
        }
        const { val, metric } = Utility.convertToNumber(WIDTH);
        const strokeWidth = Utility.convertToNumber(STROKE_WIDTH).val;
        let r = val / 2 - strokeWidth / 2;
        let circumference = calculateCircumference(r);
        let doubleCircumference = circumference * 2;
        let cx = val / 2;
        r = Utility.convertToMetric(r, metric);
        cx = Utility.convertToMetric(cx, metric);
        circumference = Utility.convertToMetric(circumference, metric);
        doubleCircumference = Utility.convertToMetric(doubleCircumference, metric);
        return { r, cx, "cy": cx, circumference, doubleCircumference };
    }
    const setPercent = (percent, WIDTH) => {
        const { val, metric } = Utility.convertToNumber(WIDTH);
        return Utility.convertToMetric(((100 - percent) / 100 * val), metric);
    }

    const { r, cx, cy, circumference, doubleCircumference } = calculateCircleRadiusAndPos(_defaultWidth, _defaultStrokeWidth);

    return (
        <Div width={_defaultWidth} height={_defaultWidth}>
            <Svg width={_defaultWidth} height={_defaultWidth} className={className}>
                <DummyCircle
                    stroke="#e2ffe4"
                    fill="transparent"
                    strokeWidth={_defaultStrokeWidth}
                    r={r}
                    cx={cx}
                    cy={cy}
                />
                <Circle
                    stroke="lightgreen"
                    fill="transparent"
                    strokeWidth={_defaultStrokeWidth}
                    strokeDashWidth={circumference}
                    strokeDashGap={doubleCircumference}
                    strokeDashOffset={setPercent(Number(percent), circumference)}
                    r={r}
                    cx={cx}
                    cy={cy}
                />
            </Svg>
            <CoreText width="3.5rem" fontWeight="normal" value={`${percent}%`} onChange={onChange} color="green" fontSize={Vars.FONT_SIZE_SM} />
        </Div>
    )
}

const BlockModified = styled(Block)`
    position: relative;
    margin: 0 1% 0 0;
`;
const FloatButton = styled(Button)`
    position: absolute;
    bottom: -.5rem;
    right: 0;
    height: 1rem;
    background-color: red;
`;

const SkillBlock = ({ _id, isHide, dispatch, indexOfHigherComponent, className, width, percent, content, subContent }) => {
    const handleRemove = () => {
        Vars.removeComponentIn(dispatch,
            `homePage/description/${indexOfHigherComponent}/childs/${_id}`
        );
    }
    const handleContentChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/description/${indexOfHigherComponent}/childs/${_id}/content`, _id);
    }
    const handleSubContentChange = (e) => {
        Vars.editingText(dispatch, e.target.value, `homePage/description/${indexOfHigherComponent}/childs/${_id}/subContent`, _id);
    }
    const handlePercentChange = (e) => {
        const val = e.target.value;
        let valPossibleNumber = val.split("%")[0];
        if (isNaN(Number(valPossibleNumber))) {
            return;
        } else {
            if (Number(valPossibleNumber) > 100) {
                valPossibleNumber = 100;
            }
            if (Number(valPossibleNumber < 0)) {
                valPossibleNumber = 0;
            }
        }
        Vars.editingText(dispatch, valPossibleNumber, `homePage/description/${indexOfHigherComponent}/childs/${_id}/percent`, _id);
    }

    return (
        <BlockModified width={width} flexbox={true} className={className} >
            <SvgImg width="6em" strokeWidth="1.2em" percent={percent} onChange={handlePercentChange} />
            <Block width="50%" padding="0 .5rem 0 .5rem">
                <EditableText
                    width="100%" onChange={handleContentChange}
                    fontSize={Vars.FONT_SIZE_MD} value={content} maxLength="18" textAlign="left"
                    className="skill-block-editable-text-1"
                />
                <EditableText
                    width="100%" onChange={handleSubContentChange}
                    fontSize={Vars.FONT_SIZE_SM} value={subContent} maxLength="18" textAlign="left"
                    className="skill-block-editable-text-2"
                />
            </Block>
            <FloatButton isHide={isHide} onClick={handleRemove} fontSize={Vars.FONT_SIZE_SM}></FloatButton>
        </BlockModified>
    )
}

export default (SkillBlock);
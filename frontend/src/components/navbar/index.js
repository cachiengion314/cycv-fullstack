import React from 'react';
import HNavbar from "./HNavbar";
import Block from "../../custom-components/Block";
import Utility from '../../custom-components/Utility';

const Nav = ({ width, height }) => {
    let _previousYOffSet = 0;
    const block_navbarHeightRateConstant = 1.25;
    const [navbarTopVal, setNavbarTopVal] = React.useState("0px");
    React.useEffect(() => {
        _previousYOffSet = window.pageYOffset;
        window.addEventListener(`scroll`, handleNavWhenScroll);
    }, []);
    const handleNavWhenScroll = (e) => {
        if (_previousYOffSet > window.pageYOffset) {
            setNavbarTopVal("0px");
        } else {
            const { val, metric } = Utility.convertToNumber(height);
            const negativeHeight = Utility.convertToMetric(-val, metric);
            setNavbarTopVal(negativeHeight);
        }
        _previousYOffSet = window.pageYOffset;
        // console.log(`_previousY:`, _previousYOffSet)
    }
    const calculateBlockHeight = (navbarHeight) => {
        const { val, metric } = Utility.convertToNumber(navbarHeight);
        const nextVal = val * block_navbarHeightRateConstant;
        return Utility.convertToMetric(nextVal, metric);
    }

    return (
        <>
            <HNavbar width={width} top={navbarTopVal} height={height} />
            <Block height={calculateBlockHeight(height)} />
        </>
    )
}

export default Nav;
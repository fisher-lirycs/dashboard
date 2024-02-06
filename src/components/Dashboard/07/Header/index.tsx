import React from "react";
import styled from "styled-components";

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <span>やりと心くばりを現場の隅々まで</span>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    display: flex;
    height: 75px;
    width: 100%;
    align-items: center;
    background: linear-gradient(#499549, #a0eb9b, #499549);

    & > span {
        margin-left: 30px;
        color: #ffffff;
        font-weight: bold;
        font-size: 40px;
    }
`;

export default Header
import React from "react";
import styled from "styled-components";
import Title from "../Title";
import imgURL from '../../../../assets/images/crane.jpg';

const Crane: React.FC = () => {
    return (
        <CraneContainer>
            <TitleContent>
                <Title text={"建設用クレーンの標準合図法"} />
            </TitleContent>
            <DetailContent>
                <img src={imgURL} alt="建設用クレーンの標準合図法" width={"100%"} height={"100%"}/>
            </DetailContent>
        </CraneContainer>
    )
}

const CraneContainer = styled.div`
    height: 100%;
    width: 100%;

`

const TitleContent = styled.div`
    width: 100%;
    height: 25px;
`

const DetailContent = styled.div`
    width: 100%;
    height: calc(100% - 35px);
    margin-top: 5px;
`


export default Crane;
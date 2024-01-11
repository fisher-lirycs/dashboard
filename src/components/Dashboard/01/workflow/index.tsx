import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { WorkflowType } from "../../../../types/Types";

const Workflow: React.FC = () => {
    const [flows, setFlows] = useState<Array<WorkflowType>>([]);

    useEffect(() => {
       // axios.get("https://x1q4e6las4.execute-api.ap-northeast-1.amazonaws.com/dev/workflows").then((result => console.log(result)))
}, []);


return (
    <Container>
        <Title>今週の作業予定</Title>
        <Table>
            <tbody>
                <tr>
                    <td className="day">2/8</td>
                    <td className="week">月</td>
                    <td className="detail">あああああああああああ</td>
                </tr>
                <tr>
                    <td className="day">2/8</td>
                    <td className="week">月</td>
                    <td className="detail">あああああああああああ</td>
                </tr>
                <tr>
                    <td className="day">2/8</td>
                    <td className="week">月</td>
                    <td className="detail">あああああああああああ</td>
                </tr>
                <tr>
                    <td className="day">2/8</td>
                    <td className="week">月</td>
                    <td className="detail">あああああああああああ</td>
                </tr>
                <tr>
                    <td className="day">2/8</td>
                    <td className="week">月</td>
                    <td className="detail">あああああああああああ</td>
                </tr>
                <tr>
                    <td className="day">2/8</td>
                    <td className="week">月</td>
                    <td className="detail">あああああああああああ</td>
                </tr>
                <tr>
                    <td className="day">2/8</td>
                    <td className="week">月</td>
                    <td className="detail">あああああああああああ</td>
                </tr>
            </tbody>
        </Table>
    </Container>
)
}
const Container = styled.div`
    height: 100%;
`

const Title = styled.div`
    margin-top: 10px;
    font-size: 40px;
`

const Table = styled.table`
    height: calc(100% - 71px);
    width: 100%;
    margin-bottom: 1rem;
    caption-side: bottom;
    vertical-align: top;
    border-collapse: collapse;
    background-color: #F5F5F4;
    border-color: #ffffff;
    border-radius: 2px;
    font-size: 2vw;
    color: #000000;

    & * {
        border-width: 2px;
        border-color: inherit;
        border-style: solid;
    }

    & > tbody > tr:nth-of-type(odd) > * {
        background-color: #edededeb;
    }

    & td.day {
        width: 20%;
    }
    & td.week {
        width: 10%;
        font-weight: bold;
    }
    & td.detail {
        width: 70%;
        padding-left: 5px;
        text-align: left;
    }
`

export default Workflow;
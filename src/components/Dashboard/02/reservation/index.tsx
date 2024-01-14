import React from "react";
import styled from "styled-components";
import Title from "../title";

const Reservation: React.FC = () => {
    return (
        <Container>
            <Title>
                <span>今週の作業予定</span>
            </Title>
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
    height: calc(100% - 40px);
    padding: 20px;
`

const Table = styled.table`
    height: calc(100% - 25px);
    width: 100%;
    margin-top: 2px;
    caption-side: bottom;
    vertical-align: top;
    border-collapse: collapse;
    border-color: #878383;
    border-radius: 2px;
    color: #000000;
    & * {
        border-width: 2px;
        border-color: inherit;
        border-style: solid;
    }
    & td.day {
        padding-left: 5px;
        width: 10%;
    }
    & td.week {
        width: 10%;
        font-weight: bold;
        text-align: center;
    }
    & td.detail {
        width: 70%;
        padding-left: 5px;
        text-align: left;
    }
   
`

export default Reservation
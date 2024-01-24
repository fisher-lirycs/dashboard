import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ScheduleDataType } from "../../../../types/Types";

const Workflow: React.FC = () => {

    const [schedules, setSchedules] = useState<Array<ScheduleDataType>>();
    useEffect(() => {
        if (localStorage.getItem("schedule")) {
            const scheduleData: Array<ScheduleDataType> = JSON.parse(localStorage.getItem("schedule") || "");
            setSchedules(scheduleData);
        }
    }, [])

    return (
        <Container>
            <Title>今週の作業予定</Title>
            {
                <Table>
                    <tbody>
                        {
                            schedules && schedules.length > 0 && schedules.map((schedule) => (
                                <tr key={schedule.day}>
                                    <td className="day">{schedule.day}</td>
                                    <TdWeek className="week" week={schedule.week}>{schedule.week}</TdWeek>
                                    <td className="detail">{schedule.detail}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            }

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

const TdWeek = styled.td<{ week?: string }>`
    color: ${props => props.week === "日" ? "red" : (props.week === "土" ? "blue" : "#000")}
`

export default Workflow;
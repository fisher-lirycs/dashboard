import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Title from "../title";
import { ScheduleDataType } from "../../../../types/Types";

const Reservation: React.FC = () => {
    const [schedules, setSchedules] = useState<Array<ScheduleDataType>>();
    useEffect(() => {
        const scheduleData: Array<ScheduleDataType> = JSON.parse(localStorage.getItem("schedule") || "");
        setSchedules(scheduleData);
    }, [])
    return (
        <Container>
            <Title>
                <span>今週の作業予定</span>
            </Title>
            <Table>
                <tbody>
                    {
                        schedules && schedules.map((schedule) => (
                            <tr key={schedule.day}>
                                <td className="day">{schedule.day}</td>
                                <td className="week" >{schedule.week}</td>
                                <td className="detail">{schedule.detail}</td>
                            </tr>
                        ))
                    }
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
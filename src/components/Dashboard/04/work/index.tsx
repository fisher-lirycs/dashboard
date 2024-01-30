import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ScheduleDataType } from "../../../../types/Types";

export interface WorkProps {
    headFontColor?: string
}
const Work: React.FC<WorkProps> = ({ headFontColor }) => {

    const [schedules, setSchedules] = useState<Array<ScheduleDataType>>();
    useEffect(() => {
        if (localStorage.getItem("schedule")) {
            const scheduleData: Array<ScheduleDataType> = JSON.parse(localStorage.getItem("schedule") || "");
            setSchedules(scheduleData);
        }
    }, [])

    return (
        <Container>
            <TitleContent color={headFontColor}>今週の作業予定</TitleContent>
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
        </Container>
    )
}
const Container = styled.div`
    width: 100%;
    height: 100%;
    color: #fff;
`

const TitleContent = styled.div<{ color?: string }>`
    display: flex;
    height: 10%;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: ${props => props.color || '#366836'};
`

const Table = styled.table`
    height: 89%;
    width: 100%;
    margin-bottom: 1rem;
    caption-side: bottom;
    vertical-align: top;
    border-collapse: collapse;
    background-color: #366836;
    border-color: #ffffff;
    border-radius: 10px;
    font-size: 20px;

    &  tr:not(:last-child) {
        border-bottom: solid 1px #fff;
        
        & td:not(:last-child) {
            border-right: solid 1px #fff;
        }
    }

    &  tr:last-child {
        & td:not(:last-child) {
            border-right: solid 1px #fff;
        }
    }

    & td.day {
        width: 20%;
        text-align: center;
    }

    & td.week {
        width: 10%;
        text-align: center;
    }

    & td.detail {
        width: 70%;
        padding-left: 5px;
        text-align: left;
    }
`

const TdWeek = styled.td<{ week?: string }>`
    color: ${props => props.week === "日" ? "red" : "#fff"}
`

export default Work;
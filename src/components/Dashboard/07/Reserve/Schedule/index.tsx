import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ScheduleDataType } from "../../../../../types/Types";

export interface ScheduleProps {
  editStatus: boolean
}
const Schedule: React.FC<ScheduleProps> = ({ editStatus }) => {
  const [schedules, setSchedules] = useState<Array<ScheduleDataType>>(JSON.parse(localStorage.getItem("scheduleDetail") as string) || [
    {
      day: "1/22",
      week: "月",
      detail: "杭工事",
    },
    {
      day: "1/23",
      week: "火",
      detail: "掘削工事",
    },
    {
      day: "1/24",
      week: "水",
      detail: "地下躯体工事",
    },
    {
      day: "1/25",
      week: "木",
      detail: "地上躯体工事",
    },
    {
      day: "1/26",
      week: "金",
      detail: "外装工事",
    },
    {
      day: "1/27",
      week: "土",
      detail: "内装工事",
    },
    {
      day: "1/28",
      week: "日",
      detail: "外構工事",
    },
  ]);

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>, index: number, item: "day" | "week" | "detail") => {
    const target = e.target;
    const value = target.value;
    let scheduleDataTemp = schedules;
    scheduleDataTemp[index][item] = value;
    localStorage.setItem("scheduleDetail", JSON.stringify(scheduleDataTemp));
  }

  return (
    <Container>
      {!editStatus ? (
        <Table>
          <tbody>
            {schedules &&
              schedules.length > 0 &&
              schedules.map((schedule) => (
                <tr key={schedule.day}>
                  <td className="day">{schedule.day}</td>
                  <TdWeek className="week" week={schedule.week}>
                    {schedule.week}
                  </TdWeek>
                  <td className="detail">{schedule.detail}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <Table>
          <tbody>
            {schedules &&
              schedules.length > 0 &&
              schedules.map((schedule, index) => (
                <tr key={index}>
                  <td className="day">
                    <input type="text" defaultValue={schedule.day} onBlur={(e) => { handleBlur(e, index, "day") }} />
                  </td>
                  <TdWeek className="week" week={schedule.week}>
                    <input type="text" defaultValue={schedule.week} onBlur={(e) => { handleBlur(e, index, "week") }} />
                  </TdWeek>
                  <td className="detail">
                    <input type="text" defaultValue={schedule.detail} onBlur={(e) => { handleBlur(e, index, "detail") }} />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}

    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  color: #5cbf5c;
`;

const Table = styled.table`
  height: 89%;
  width: 100%;
  margin-bottom: 1rem;
  caption-side: bottom;
  vertical-align: top;
  border-collapse: collapse;
  border-color: #5cbf5c;
  font-size: 20px;

  & tr:not(:last-child) {
    border-bottom: solid 1px #5cbf5c;

    & td:not(:last-child) {
      border-right: solid 1px #5cbf5c;
    }
  }

  & tr:last-child {
    & td:not(:last-child) {
      border-right: solid 1px #5cbf5c;
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
  & td input {
    width: 60%;
    align-items: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
`;

const TdWeek = styled.td<{ week?: string }>`
  color: ${(props) => (props.week === "日" ? "red" : (props.week === "土" ? "blue" : "#5cbf5c"))};
`;

export default Schedule;

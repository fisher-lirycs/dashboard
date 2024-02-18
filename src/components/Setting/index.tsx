import React, { useCallback, useState } from "react";
import styled from "styled-components";

const Setting: React.FC = () => {
  const [sliderTime, setSliderTime] = useState<string>(
    (localStorage.getItem("sliderTime") as string) || "5"
  );
  const [apiTime, setApiTime] = useState<string>(
    (localStorage.getItem("apiTime") as string) || "10"
  );
  const [circleSortNumber, setCircleSortNumber] = useState<string>(
    (localStorage.getItem("CircleSortNumber") as string) || "1"
  );
  const [scheduleSortNumber, setScheduleSortNumber] = useState<string>(
    (localStorage.getItem("ScheduleSortNumber") as string) || "2"
  );
  const [weatherSortNumber, setWeatherSortNumber] = useState<string>(
    (localStorage.getItem("WeatherSortNumber") as string) || "3"
  );
  const [safetySortNumber, setSafetySortNumber] = useState<string>(
    (localStorage.getItem("SafetySortNumber") as string) || "4"
  );
  const [ruleSortNumber, setRuleSortNumber] = useState<string>(
    (localStorage.getItem("RuleSortNumber") as string) || "5"
  );
  const [craneSortNumber, setCraneSortNumber] = useState<string>(
    (localStorage.getItem("CraneSortNumber") as string) || "6"
  );
  const [cameraSortNumber, setCameraSortNumber] = useState<string>(
    (localStorage.getItem("CameraSortNumber") as string) || "7"
  );

  const [sliderSort, setSliderSort] = useState<{ [key: string]: string }>({
    Circle: "1",
    Schedule: "2",
    Weather: "3",
    Safety: "4",
    Rule: "5",
    Crane: "6",
    Camera: "7",
  });

  const [errMessage, setErrMessage] = useState<Array<string>>([]);
  const [success, setSuccess] = useState(false);

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const value = target.value;
      setSliderTime(value);
    },
    [setSliderTime]
  );

  const handleApiTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const value = target.value;
      setApiTime(value);
    },
    [setApiTime]
  );

  const handleSliderSortChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      item: string,
      setItemFunc: (value: string) => void
    ) => {
      const target = e.target;
      const value = target.value;
      let temp = sliderSort;
      temp[item] = value;
      setSliderSort(temp);
      setItemFunc(value);
      localStorage.setItem(item + "SortNumber", value);
    },
    [setSliderSort]
  );

  const set = () => {
    setSuccess(true);
    if (sliderTime) {
      localStorage.setItem("sliderTime", sliderTime as string);
    }
    if (apiTime) {
      localStorage.setItem("apiTime", apiTime as string);
    }
    let sliderArray = [
      { id: "Circle", sort: circleSortNumber },
      { id: "Schedule", sort: scheduleSortNumber },
      { id: "Weather", sort: weatherSortNumber },
      { id: "Safety", sort: safetySortNumber },
      { id: "Rule", sort: ruleSortNumber },
      { id: "Crane", sort: craneSortNumber },
      { id: "Camera", sort: cameraSortNumber },
    ];
    localStorage.setItem(
      "sliderSort",
      JSON.stringify(
        sliderArray.sort((a, b) => parseInt(a.sort) - parseInt(b.sort))
      )
    );
  };

  return (
    <Contanier>
      <Content>
        <div style={{ marginBottom: "5px" }}>
          <Lable>スライドショーの間隔</Lable>
          <NummberInput
            type="number"
            name="slideTime"
            id="slideTime"
            defaultValue={sliderTime}
            onBlur={handleTimeChange}
          />
          <span>秒</span>
        </div>
        <div style={{ marginBottom: "5px" }}>
          <Lable>APIデータ取込間隔</Lable>
          <NummberInput
            type="number"
            name="apiTime"
            id="apiTime"
            defaultValue={apiTime}
            onBlur={handleApiTimeChange}
          />
          <span>秒</span>
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <Lable>スライドショーの表示順</Lable>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ width: "150px" }}>安全施工サイクル</span>
              <NummberInput
                style={{ width: "40px" }}
                defaultValue={circleSortNumber}
                onBlur={(e) => {
                  handleSliderSortChange(e, "Circle", setCircleSortNumber);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <span style={{ width: "150px" }}>今週の作業予定</span>
              <NummberInput
                style={{ width: "40px" }}
                defaultValue={scheduleSortNumber}
                onBlur={(e) => {
                  handleSliderSortChange(e, "Schedule", setScheduleSortNumber);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <span style={{ width: "150px" }}>WeatheryAPIデータ</span>
              <NummberInput
                style={{ width: "40px" }}
                defaultValue={weatherSortNumber}
                onBlur={(e) => {
                  handleSliderSortChange(e, "Weather", setWeatherSortNumber);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <span style={{ width: "150px" }}>安全掲示板</span>
              <NummberInput
                style={{ width: "40px" }}
                defaultValue={safetySortNumber}
                onBlur={(e) => {
                  handleSliderSortChange(e, "Safety", setSafetySortNumber);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <span style={{ width: "150px" }}>ルール</span>
              <NummberInput
                style={{ width: "40px" }}
                defaultValue={ruleSortNumber}
                onBlur={(e) => {
                  handleSliderSortChange(e, "Rule", setRuleSortNumber);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <span style={{ width: "150px" }}>標準合図法</span>
              <NummberInput
                style={{ width: "40px" }}
                defaultValue={craneSortNumber}
                onBlur={(e) => {
                  handleSliderSortChange(e, "Crane", setCraneSortNumber);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <span style={{ width: "150px" }}>MAMORYAPIデータ</span>
              <NummberInput
                style={{ width: "40px" }}
                defaultValue={cameraSortNumber}
                onBlur={(e) => {
                  handleSliderSortChange(e, "Camera", setCameraSortNumber);
                }}
              />
            </div>
          </div>
        </div>
        {errMessage && errMessage.length > 0 && (
          <ErrorBlock>
            <ul>
              {errMessage.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </ErrorBlock>
        )}
        {success && (
          <SuccessBlock>
            <ul>
              <li>設定成功しました</li>
            </ul>
          </SuccessBlock>
        )}
        <ButtonBlock>
          <Button type="button" value="設定" onClick={set} />
          <Button
            type="button"
            style={{
              marginLeft: "5px",
              backgroundColor: "grey",
              borderColor: "grey",
            }}
            value="戻る"
            onClick={() => {
              window.history.back();
            }}
          />
        </ButtonBlock>
      </Content>
    </Contanier>
  );
};
const Contanier = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
`;

const Content = styled.div`
  width: 400px;
  padding: 30px;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
`;

const Lable = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-right: 0.75rem;
  min-height: 40px;
  height: 100%;
  width: 150px;
  padding: 0 5px;
  background: #eaeaea;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #3c3c3c;
`;

const NummberInput = styled.input`
  width: 124px;
  display: inline-flex;
  align-items: center;
  margin-right: 0.75rem;
  height: calc(1.5em + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const ButtonBlock = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  font-size: 13px;
`;

const Button = styled.input`
  display: inline-block;
  width: 100px;
  background-color: #198754;
  border: 1px solid #198754;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  padding: 0.375rem 0.75rem;
  text-align: center;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  vertical-align: middle;
  cursor: pointer;
`;
const ErrorBlock = styled.div`
  width: 100%;
  color: red;
  font-size: 12px;

  & > ul {
    list-style: "×";
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    margin-bottom: 0;
  }
`;

const SuccessBlock = styled.div`
  width: 100%;
  color: #198754;
  font-size: 12px;

  & > ul {
    list-style: "√";
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    margin-bottom: 0;
  }
`;

export default Setting;

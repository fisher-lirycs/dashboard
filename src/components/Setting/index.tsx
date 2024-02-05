import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { ScheduleDataType } from "../../types/Types";

const Setting: React.FC = () => {
    const [displayFileName, setDisplayFileName] = useState<string>("選択されていません");
    const [scheduleFile, setScheduleFile] = useState<File>();
    const [sliderTime, setSliderTime] = useState<string>("5");
    const [apiTime, setApiTime] = useState<string>("10");

    const [errMessage, setErrMessage] = useState<Array<string>>([]);
    const [success, setSuccess] = useState(false);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = null || e.target.files && e.target.files[0]
        const name = selectedFile?.name || "選択されていません";
        setDisplayFileName(name)
        if (selectedFile) {
            setScheduleFile(selectedFile);
        } else {
            setScheduleFile(undefined)
        }
    }, [])

    const handleTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.value;
        setSliderTime(value);
    }, [setSliderTime])

    const handleApiTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.value;
        setApiTime(value);
    }, [setApiTime])

    const set = () => {
        const errMsg: Array<string> = [];
        if (!scheduleFile && !sliderTime && !apiTime) {
            errMsg.push("日程ファイル または スライドの切替時間を設定してください");
        }
        setErrMessage(errMsg)
        if (errMsg.length > 0) {
            setSuccess(false)
        } else {
            setSuccess(true)
            if (sliderTime) {
                localStorage.setItem("sliderTime", sliderTime as string)
            }
            if (apiTime) {
                localStorage.setItem("apiTime", apiTime as string)
            }
            if (scheduleFile) {
                const reader = new FileReader();
                const scheduleArray: Array<ScheduleDataType> = []
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    const content = event.target?.result;
                    if (content) {
                        const lines = content.toString().split("\r\n");
                        for (const line of lines) {
                            const strs = line.split(",");
                            if (strs[0]) {
                                const scheduleJson: ScheduleDataType = {
                                    day: "",
                                    week: "",
                                    detail: "",
                                };
                                const day = strs[0]
                                const newDate = new Date(day);

                                scheduleJson.day = `${newDate.getMonth() + 1}/${newDate.getDate()}`;
                                scheduleJson.week = strs[1];
                                scheduleJson.detail = strs[2];
                                scheduleArray.push(scheduleJson)
                            }

                        }
                    }
                };
                reader.onloadend = () => {
                    localStorage.setItem("schedule", JSON.stringify(scheduleArray))
                };
                reader.readAsText(scheduleFile as File, "UTF-8");
            }

        }
    };


    return (
        <Contanier>
            <Content>
                <FileUpBlock style={{ marginBottom: "5px" }}>
                    <Lable htmlFor="file">日程ファイル</Lable>
                    <span>{displayFileName}</span>
                    <FileInput>
                        <span>選択</span>
                        <input type="file" name="file" id="file" onChange={handleFileSelect} />
                    </FileInput>
                </FileUpBlock>
                <div style={{ marginBottom: "5px" }}>
                    <Lable htmlFor="file">スライドの切替</Lable>
                    <NummberInput type="number" name="slideTime" id="slideTime" defaultValue={sliderTime} onBlur={handleTimeChange} />
                    <span>秒</span>
                </div>
                <div>
                    <Lable htmlFor="file">API呼出の間隔時間</Lable>
                    <NummberInput type="number" name="apiTime" id="apiTime" defaultValue={apiTime} onBlur={handleApiTimeChange} />
                    <span>秒</span>
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
                    <Button type="button" style={{ marginLeft: "5px" }} value="戻る" onClick={() => { window.history.back() }} />
                </ButtonBlock>
            </Content>
        </Contanier>
    )
}
const Contanier = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #f7f7f7;
`;

const Content = styled.div`
    width: 300px;
    padding: 30px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.12);
    border-radius: 10px;
`;

const Lable = styled.label`
    position: relative;
    display: inline-flex;
    align-items: center;
    margin-right: .75rem;
    height: 40px;
    width: 100px;
    padding: 0 5px;
    background: #eaeaea;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: #3c3c3c;
`

const NummberInput = styled.input`
    width: 124px;
    display: inline-flex;
    align-items: center;
    margin-right: .75rem;
    height: calc(1.5em + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`

const FileUpBlock = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    font-size: 13px;
`
const FileInput = styled.div`
    position: absolute;
    display: flex;
    right: 0;
    overflow: hidden;
    width: 30px;
    height: 20px;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background: #eaeaea;
    cursor: pointer;
    font-size: 12px;

    & > input {
        display: inline-block;
        position: absolute;
        font-size: 12px;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
    }
`

const ButtonBlock = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    font-size: 13px;
`

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
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    user-select: none;
    vertical-align: middle;
    cursor: pointer;
`
const ErrorBlock = styled.div`
    width: 100%;
    color: red;
    font-size: 12px;

    & > ul{
        list-style: "×";
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        margin-bottom: 0;
    }
`

const SuccessBlock = styled.div`
    width: 100%;
    color: #198754;
    font-size: 12px;

    & > ul{
        list-style: "√";
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        margin-bottom: 0;
    }
`

export default Setting;
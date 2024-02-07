import React, { useState } from "react";
import styled from "styled-components";
import Title from "../Title";
import { ReactComponent as ColseImage } from "./../../../../assets/images/close_white.svg";
import { ReactComponent as SetImage } from "./../../../../assets/images/setting.svg";

export interface SafetyProps {
    fontSize?: string
}

const Safety: React.FC<SafetyProps> = ({ fontSize = "1.2vw" }) => {
    const [editStatus, setEditStatus] = useState(false)
    const [safetyDetail, setSafeDetail] = useState((localStorage.getItem("safetyDetail")) || "私はルールを正しく守り、\r\n自分の身は自分で守ります")

    const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target;
        const value = target.value;
        setSafeDetail(value)
        localStorage.setItem("safetyDetail", value);
    }

    return (
        <SafetyContainer>
            <EditIconBlock>
                {editStatus && <ColseImage width={"100%"} height={"100%"} onClick={() => setEditStatus(!editStatus)} />}
                {!editStatus && <SetImage width={"100%"} height={"100%"} onClick={() => setEditStatus(!editStatus)} />}
            </EditIconBlock>
            <TitleContent>
                <Title text={"安全掲示板"} />
            </TitleContent>
            {editStatus ? (
                <InputContent fontSize={fontSize}>
                    <textarea defaultValue={safetyDetail} rows={4} onBlur={(e) => { handleBlur(e) }} />
                </InputContent>
            ) : (
                <TextContent fontSize={fontSize}>
                    {safetyDetail}
                </TextContent>
            )}

        </SafetyContainer>
    )
}

const SafetyContainer = styled.div`
    width: 100%;
    height: 100%;
`

const TitleContent = styled.div`
    width: 100%;
    height: 25px;
`

const TextContent = styled.div<{ fontSize: string }>`
    padding-left: 20px;
    margin-top: 20px;
    font-size: ${props => props.fontSize};
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: normal;
`

const InputContent = styled.div<{ fontSize: string }>`
    margin-top: 10px;
    font-size: ${props => props.fontSize};
    font-weith: bold;

    & textarea {
        width: calc(100% - 10px);
        height: 100%;
        font-size: ${props => props.fontSize};
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
`

const EditIconBlock = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  top: 0;
  right: 0;
`

export default Safety;
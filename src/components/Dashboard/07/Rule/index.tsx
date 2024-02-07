import React, { useState } from "react";
import styled from "styled-components";
import Title from "../Title";
import { ReactComponent as ColseImage } from "./../../../../assets/images/close_white.svg";
import { ReactComponent as SetImage } from "./../../../../assets/images/setting.svg";

const Rule: React.FC = () => {
    const [editStatus, setEditStatus] = useState(false)
    const [ruleDetail, setRuleDetail] = useState((localStorage.getItem("ruleDetail")) || "")

    const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target;
        const value = target.value;
        setRuleDetail(value)
        localStorage.setItem("ruleDetail", value);
    }

    return (
        <RuleContainer>
            <EditIconBlock>
                {editStatus && <ColseImage width={"100%"} height={"100%"} onClick={() => setEditStatus(!editStatus)} />}
                {!editStatus && <SetImage width={"100%"} height={"100%"} onClick={() => setEditStatus(!editStatus)} />}
            </EditIconBlock>
            <TitleContent>
                <Title text={"ルール"} />
            </TitleContent>
            {editStatus ? (
                <InputContent>
                    <textarea defaultValue={ruleDetail} rows={6} onBlur={(e) => { handleBlur(e) }} />
                </InputContent>
            ) : (
                <DetailContent>
                    {ruleDetail}
                </DetailContent>
            )}

        </RuleContainer>
    )
}

const RuleContainer = styled.div`
    height: 100%;
    width: 100%;

`

const TitleContent = styled.div`
    width: 100%;
    height: 25px;
`

const DetailContent = styled.div`
    height: calc(100% - 35px);
    margin-top: 5px;
    padding: 5px;
    background: linear-gradient(#5acdef, #dff8ff);
    font-size: 1vw;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: normal;
`

const InputContent = styled.div`
    margin-top: 10px;
    font-weith: bold;

    & textarea {
        width: calc(100% - 10px);
        height: 100%;
        font-size: 1vw;
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


export default Rule;
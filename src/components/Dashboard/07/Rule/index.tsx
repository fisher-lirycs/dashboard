import React, { useState } from "react";
import styled from "styled-components";
import Title from "../Title";
import { ReactComponent as ColseImage } from "./../../../../assets/images/close_white.svg";
import { ReactComponent as SetImage } from "./../../../../assets/images/setting.svg";
import noImage from "./../../../../assets/images/no-image.svg"

const Rule: React.FC = () => {
    const [editStatus, setEditStatus] = useState(false)
    const [ruleDetail, setRuleDetail] = useState((localStorage.getItem("ruleDetail")) || "")
    const [imageUrl, setImageUrl] = useState(localStorage.getItem("ruleimage") || noImage)

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.value;
        setRuleDetail(value)
        localStorage.setItem("ruleDetail", value);
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = null || e.target.files && e.target.files[0]
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile as File);

            reader.onload = (event: ProgressEvent<FileReader>) => {
                const url = event.target?.result;
                localStorage.setItem("ruleimage", url as string);
                setImageUrl(url as string)
            };
        }
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
                    <input type="text" defaultValue={ruleDetail} onBlur={(e) => { handleBlur(e) }} />
                </InputContent>
            ) : (
                <DetailContent>
                    {ruleDetail}
                </DetailContent>
            )}
            <ImageContent>
                <input type="file" name="file" id="ruleFile" style={{ width: "100%", height: "100%" }} onChange={handleFileSelect} />
                <div style={{ width: "100%", height: "100%" }}>
                    <img src={imageUrl} alt="" width={"100%"} height={"100%"} />
                </div>
            </ImageContent>
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
    height: 25px;
    margin-top: 5px;
    padding: 5px;
    font-size: 1vw;
`

const ImageContent = styled.div`
    position: relative;
    height: calc(100% - 55px);
    padding: 5px;

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

const InputContent = styled.div`
    margin: 10px 0 10px 0;
    font-weith: bold;

    & input {
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
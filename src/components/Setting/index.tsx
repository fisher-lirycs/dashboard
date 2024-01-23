import React, { HtmlHTMLAttributes, useCallback, useState } from "react";
import styled from "styled-components";

const Setting: React.FC = () => {
    const [displayFileName, setDisplayFileName] = useState<string>("選択されていません");
    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = null || e.target.files && e.target.files[0]
        const name = selectedFile?.name || "選択されていません";
        setDisplayFileName(name)
    }, [])


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
                <div>
                    <Lable htmlFor="file">スライドの切替</Lable>
                    <NummberInput type="number" name="slideTime" id="slideTime" />
                    <span>秒</span>
                </div>
                <ButtonBlock>
                    <Button type="button" value="設定" />
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
    height: 150px;
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

export default Setting;
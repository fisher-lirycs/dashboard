import React from "react";
import styled from "styled-components";

const Setting: React.FC = () => {
    return (
        <Contanier>
            <Content>
                <div>
                    <Lable htmlFor="file">日程ファイル</Lable>
                    <input type="file" name="file" id="file" />
                </div>
                <div>
                    <Lable htmlFor="file">スライド</Lable>
                    <NummberInput type="number" name="slideTime" id="slideTime" />
                    <span>秒</span>
                </div>
                <div>
                    <input type="button" value="設定" />
                </div>
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
    height: 300px;
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
    padding-left: 10px;
    background: #eaeaea;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: #3c3c3c;
`

const NummberInput = styled.input`
    width: 124px!important;
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
export default Setting;
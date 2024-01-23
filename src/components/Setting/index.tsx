import React from "react";
import styled from "styled-components";

const Setting: React.FC = () => {
    return (
        <Contanier>
            <Content>
                <div>
                    <label htmlFor="file">日程ファイル</label>
                    <input type="file" name="file" id="file" />
                </div>
                <div>
                    <label htmlFor="file">スライド</label>
                    <input type="number" name="slideTime" id="slideTime" />
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
    padding: 60px 80px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.12);
    border-radius: 10px;
`;
export default Setting;
import React, { useState } from "react";
import styled from "styled-components";
import Title from "../Title";
import Schedule from "./Schedule";
import { ReactComponent as ColseImage } from "./../../../../assets/images/close_white.svg";
import { ReactComponent as SetImage } from "./../../../../assets/images/setting.svg";


const Reserve: React.FC = () => {
  const [editStatus, setEditStatus] = useState(false)
  return (
    <CircleContainer>
      <EditIconBlock>
        {editStatus && <ColseImage width={"100%"} height={"100%"} onClick={() => setEditStatus(!editStatus)} />}
        {!editStatus && <SetImage width={"100%"} height={"100%"} onClick={() => setEditStatus(!editStatus)} />}
      </EditIconBlock>
      <TitleContent>
        <Title text={"今週の作業予定"} />
      </TitleContent>
      <ScheduleContent>
        <Schedule editStatus={editStatus} />
      </ScheduleContent>
    </CircleContainer>
  );
};

const CircleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const TitleContent = styled.div`
  width: 100%;
  height: 25px;
`;

const ScheduleContent = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 25px);
  align-items: center;
  justify-content: center;
`;

const EditIconBlock = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  top: 0;
  right: 0;
`

export default Reserve;

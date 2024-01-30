import React, { useState } from "react";
import { CalendarInput, Wrapper } from "../../styles/CoupleInfo/UI";

type Props = {
  start: string | null;
  setStart: (date: string) => void;
};

function CoupleInfoCalendar({ start, setStart }: Props) {
  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStart(event.target.value);
  };

  return (
    <Wrapper>
      <label>우리 사랑이 시작된 날은</label>
      <CalendarInput type="date" value={start} onChange={changeDate} />
    </Wrapper>
  );
}

export default CoupleInfoCalendar;

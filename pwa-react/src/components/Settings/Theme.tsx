import React, { useEffect, useRef, useState } from "react";
import SettingsHeader from "./SettingsHeader";
import useAuthStore from "../../stores/AuthStore";
import { CancelButton } from "../../styles/Settings/UI";
import { Wrapper, ColorSelectBox, Sample } from "../../styles/Settings/Page";
import { UserInfoBox, SaveButton } from "../../styles/UserInfo/UserInfo";
import { pink, green, blue } from "../../styles/common/global";
import { DefaultTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

function Theme() {
  const navigate = useNavigate();

  const colortheme = useAuthStore.getState().colortheme;
  const setColorTheme = useAuthStore.getState().setColorTheme;

  //
  const [currentTheme, setCurrentTheme] = useState(colortheme); // 기존 테마 저장
  const isChanged = useRef<boolean>(false); // 변경 여부 저장
  const selected = useRef<DefaultTheme>(colortheme); // 선택된 테마 저장

  // 색상 변경
  const ChangeColor = (theme: DefaultTheme) => {
    setColorTheme(theme);
    selected.current = theme;
  };

  useEffect(() => {
    return () => {
      // 페이지 나갈 때 변경 ok하지 않았을 경우 원래 컬러로 되돌리기
      if (isChanged.current == true) return;
      if (currentTheme.color.main != selected.current.color.main) {
        setColorTheme(currentTheme);
      }
    };
  }, []);

  return (
    <Wrapper>
      <SettingsHeader />
      <UserInfoBox>
        <h3>테마 설정</h3>
        <ColorSelectBox>
          <Sample
            $sampletheme={pink}
            onClick={() => {
              ChangeColor(pink);
            }}
            className={
              selected.current.color.main == pink.color.main
                ? "active"
                : undefined
            }
          ></Sample>
          <Sample
            $sampletheme={green}
            onClick={() => {
              ChangeColor(green);
            }}
            className={
              selected.current.color.main == green.color.main
                ? "active"
                : undefined
            }
          ></Sample>
          <Sample
            $sampletheme={blue}
            onClick={() => {
              ChangeColor(blue);
            }}
            className={
              selected.current.color.main == blue.color.main
                ? "active"
                : undefined
            }
          ></Sample>
        </ColorSelectBox>
        <SaveButton
          onClick={() => {
            isChanged.current = true;
            navigate(-1);
          }}
        >
          확인
        </SaveButton>
        <CancelButton
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </CancelButton>
      </UserInfoBox>
    </Wrapper>
  );
}

export default Theme;

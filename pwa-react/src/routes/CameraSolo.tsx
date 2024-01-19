import React, { useRef, useState, useEffect } from 'react';
import { TimerText, CameraBox, CameraButton, OptionsContainer, SaveBox, SaveBoxItem } from '../styles/Camera/CameraSolo';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TimerIcon from '@mui/icons-material/Timer';
import CollectionsIcon from '@mui/icons-material/Collections';

const CameraSolo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [time, setTime] = useState(0);
  const [selectTime, setSelectTime] = useState("");
  const [photo, setPhoto] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const startCamera = async () => {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log(videoRef.current.clientHeight)
      }
    } catch (error) {
      console.error('Error opening video camera.', error);
    }
  };

  useEffect(() => {
    startCamera()
  }, [])
  
  const takePhoto = (timer: number) => {
    setTime(timer)
    setTimeout(() => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          const data = canvasRef.current.toDataURL('image/png');
          console.log(data);  // 이 부분에서 data를 서버로 전송하거나 앱 내에 저장할 수 있습니다.
        }
      }
      setPhoto(false)
    }, timer * 1000)
  };

  useEffect(() => {
    time > 0 && setTimeout(() => setTime(time - 1), 1000);
  }, [time]);

  const TimeChange = (event: string) => {
    setSelectTime(event)
    setShowOptions(!showOptions)
  }

  const handleTimerClick = () => {
    setShowOptions(!showOptions); // showOptions 상태 토글
  }

  const PicAgain = (event : React.MouseEvent<HTMLDivElement>) => {
    setPhoto(!photo)
    startCamera()
  }

  return (
    <div>
      <TimerText>
        {time > 0 ? <div>{time}</div> : null}
      </TimerText>
      <CameraBox>
        {photo ? <video ref={videoRef} autoPlay={true} style={{ transform: "scaleX(-1)" }} /> : null}
        <canvas ref={canvasRef} style={{ transform: "scaleX(-1)", width: window.innerWidth, height: videoRef.current?.clientHeight }} />
      </CameraBox>
      {photo ? null : <SaveBox><SaveBoxItem>저장하기</SaveBoxItem><SaveBoxItem onClick={PicAgain}>다시 찍기</SaveBoxItem></SaveBox>}

      <div style={{ position: "fixed", bottom: "5%", width: "100%" }}>
        {showOptions && (
          <OptionsContainer>
            <div onClick={() => TimeChange("0")}>
              <TimerIcon></TimerIcon>
            </div>
            <div onClick={() => TimeChange("3")}>3초</div>
            <div onClick={() => TimeChange("5")}>5초</div>
            <div onClick={() => TimeChange("10")}>10초</div>
          </OptionsContainer>
        )}
      </div>

      {photo ? <CameraButton>
        {!showOptions && (<TimerIcon className='timer' onClick={handleTimerClick}></TimerIcon>)}
        {!showOptions && <CameraAltIcon onClick={() => { takePhoto(Number(selectTime)) }} className='camera'></CameraAltIcon>}
        {!showOptions && <CollectionsIcon className='timer'></CollectionsIcon>}
      </CameraButton> : null}

    </div>
  );
};

export default CameraSolo;

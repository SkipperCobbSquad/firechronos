import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typed from 'react-typed';

import moment from 'moment';
import clock from '../clock.svg';

const HomeDiv = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  flex-direction: row-reverse;
`;

const DataDiv = styled.div`
  height: 100%;
  border: 2px solid black;
  margin: 0 10px 0 10px;
`;
const TimeHolder = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: bold;
`;

const MainHolder = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const LogoHolder = styled.div`
  display: flex;
  margin: 0 20px 0 0;
  height: 50vh;
`;

export const Home = () => {
  const [time, setTime] = useState<Array<number | string>>();
  useEffect(() => {
    const interval = setInterval(() => {
      const rawTime = moment().format('h:mm:ss:a').split(':')
      setTime(rawTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <HomeDiv>
      <DataDiv
        style={{ height: `${(100 / 12) * (time ? +time[0] : 100)}%` }}
      ></DataDiv>
      <DataDiv
        style={{ height: `${(100 / 60) * (time ? +time[1] : 100)}%` }}
      ></DataDiv>
      <DataDiv
        style={{ height: `${(100 / 60) * (time ? +time[2] : 100)}%` }}
      ></DataDiv>
      <TimeHolder>
        <p>{time? time?.join(':'): '0:00:00:pm'}</p>
      </TimeHolder>
      <MainHolder>
        <LogoHolder>
          <img src={clock} alt="Clock"></img>
        </LogoHolder>
        <Typed
          strings={[
            '<strong>CHRONOS</strong> watching you',
            '<strong>CHRONOS</strong> watching your website ;)',
          ]}
          typeSpeed={40}
        ></Typed>
      </MainHolder>
    </HomeDiv>
  );
};

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { SoreInter } from '../index';

import { db } from '../firebase';
import {
  MainLoginDiv,
  InputHolder,
  LoginCardHeader,
  LoginCard,
  StyledInput,
} from './Login';

const StyledRangeInput = styled.input`
  display: flex;
  flex: 1;
`;

const ButtonHolder = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const StyledActionButton: any = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 15px 0;
  margin: 0 5px 10px;
  border: 2px dashed
    ${(props: any) => {
      return props.kind === 'delete'
        ? 'red'
        : props.kind === 'update'
        ? '#48cae4'
        : '#85be80';
    }};
  border-radius: 10px;
  &:hover {
    background: ${(props: any) => {
      return props.kind === 'delete'
        ? '#f4442e77'
        : props.kind === 'update'
        ? '#48cae477'
        : '#85be8066';
    }};
  }
`;

const InfoDiv = styled.div`
  display: flex;
  flex: 1;
  background: #48cae4a0;
  border-left: 6px solid #48cae4;
  padding: 10px;
`;

export const Dashboard = (props: any) => {
  const user = useSelector((state: SoreInter) => state.user);
  const [task, setTask] = useState<any>();
  const [target, setTarget] = useState<string>();
  const [every, setEvery] = useState<number>(1);
  const [info, setInfo] = useState<string>('');
  useEffect(() => {
    props.call(true);
    db.collection('tasks')
      .doc(user?.email || undefined)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setTask(doc.data());
          setTarget(doc.data()!.targetURL);
          setEvery(doc.data()!.every);
        }
      })
      .catch((err) => console.log(err.message));
    return () => {
      props.call(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTask = () => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
    if(target){
      if(reg.test(target)){
        db.collection('tasks')
        .doc(user?.email || undefined)
        .set({
          targetURL: target,
          every: every,
          left: every,
        })
        .then(() => {
          setInfo('Task created!');
          setTask({targetURL: target, every})
        })
        .catch(() => {
          setInfo('Something wrong on our side please hold up or try again');
        });
      }else{
        setInfo('Please enter valid URL')
      }
    }else{
      setInfo('Please enter URL')
    }
    setTimeout(() => {
      setInfo('');
    }, 5000);
  };

  const updateTask = () => {
    if (task.targetURL === target && task.every === every) {
      setInfo('You can`t update same target');
    } else {
      db.collection('tasks')
        .doc(user?.email || undefined)
        .set({
          targetURL: target,
          every: every,
          left: every,
        })
        .then(() => {
          setInfo('Task updated :)');
          setTask({targetURL: target, every})
        })
        .catch(() => {
          setInfo('Something wrong on our side please hold up or try again');
        });
    }

    setTimeout(() => {
      setInfo('');
    }, 5000);
  };

  const deleteTask = () => {
    db.collection('tasks')
      .doc(user?.email || undefined)
      .delete()
      .then(() => {
        setInfo('Task Deleted');
        setTask(null);
        setTarget('');
        setEvery(1);
      });
    setTimeout(() => {
      setInfo('');
    }, 5000);
  };

  // ready? console.log(task) : console.log('wait');
  return (
    <MainLoginDiv>
      <LoginCard>
        <LoginCardHeader>
          <p>Your task</p>
        </LoginCardHeader>
        {info ? <InfoDiv>{info}</InfoDiv> : null}
        <InputHolder>
          <p>Target URL: </p>
          <StyledInput
            onChange={(e) => {
              setTarget(e.target.value);
            }}
            value={target}
          ></StyledInput>
        </InputHolder>
        <InputHolder>
          <p>
            Every: {every} day{every > 1 ? 's' : ''}
          </p>
          <StyledRangeInput
            type="range"
            min="1"
            max="100"
            step="1"
            onChange={(e) => {
              setEvery(+e.target.value);
            }}
            value={every}
          ></StyledRangeInput>
        </InputHolder>
        <ButtonHolder>
          {task ? (
            <>
              <StyledActionButton kind="delete" onClick={deleteTask}>
                Delete
              </StyledActionButton>
              <StyledActionButton kind="update" onClick={updateTask}>
                Update
              </StyledActionButton>
            </>
          ) : (
            <StyledActionButton onClick={createTask}>Create</StyledActionButton>
          )}
        </ButtonHolder>
      </LoginCard>
    </MainLoginDiv>
  );
};

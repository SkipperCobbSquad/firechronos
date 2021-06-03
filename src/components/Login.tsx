import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { auth } from '../firebase';

export const MainLoginDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid grey; */
  border-radius: 10px;
  width: 400px;
  box-shadow: 5px 5px 5px #666;
  background: #000;
  color: #fefefe;
`;

export const LoginCardHeader = styled.div`
  display: flex;
  flex: 1;
  background: #000;
  color: #4895ef;
  border-radius: 9px;
  padding-left: 10px;
  border-bottom: 2px dashed #4895ef;
  font-weight: bold;
`;

export const InputHolder = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 10px;
  text-align: left;
`;

export const StyledInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: #000;
  background: #4895ef;
  outline: none;
  &:focus {
    border: none;
    outline: none;
  }
`;

export const LoginButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 10px 10px 5px 10px;
  border-radius: 10px;
  background: #85be80;
  cursor: pointer;
`;

export const ErrorDiv = styled.div`
  display: flex;
  flex: 1;
  background: #f4442ea0;
  border-left: 6px solid #e63946;
  padding: 10px;
`;

export const Login = (props: any) => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();
  // auth.signOut()
  const login = () => {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((ua) => {
        props.call(true);
        console.log('hello');
        history.push('/dashboard');
      })
      .catch((err) => {
        // console.log(err);
        setError(err.message);
        setPass('')
      });
  };

  return (
    <MainLoginDiv>
      <LoginCard>
        <LoginCardHeader>
          <p>Login</p>
        </LoginCardHeader>
        {error ? <ErrorDiv>{error}</ErrorDiv> : null}
        <InputHolder>
          <p>Email:</p>
          <StyledInput
            type="email"
            onChange={(e) => {
              if (error) {
                setError('');
              }
              setEmail(e.target.value);
            }}
            value={email}
          ></StyledInput>
        </InputHolder>
        <InputHolder>
          <p>Password:</p>
          <StyledInput
            type="password"
            onChange={(e) => {
              if (error) {
                setError('');
              }
              setPass(e.target.value);
            }}
            value={pass}
          ></StyledInput>
        </InputHolder>
        {email && pass ? (
          <LoginButton onClick={login}>
            <p style={{ margin: 0, padding: '7px' }}>Login!</p>
          </LoginButton>
        ) : null}
      </LoginCard>
    </MainLoginDiv>
  );
};

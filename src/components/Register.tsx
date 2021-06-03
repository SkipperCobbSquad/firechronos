import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { auth } from '../firebase';

import {MainLoginDiv,ErrorDiv,InputHolder,LoginCardHeader,LoginButton,LoginCard,StyledInput} from './Login'

export const Register = (props: any) => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();
  // auth.signOut()
  const login = () => {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((ua) => {
        props.call(true);
        console.log('hello');
        history.push('/dashboard');
      })
      .catch((err) => {
        // console.log(err);
        setError(err.message);
        setPass('');
      });
  };

  return (
    <MainLoginDiv>
      <LoginCard>
        <LoginCardHeader>
          <p>Register</p>
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
        <InputHolder>
          <p>Confirm Password</p>
          <StyledInput
            type="password"
            onChange={(e) => {
              if (error) {
                setError('');
              }
              setConfirmPass(e.target.value);
            }}
          ></StyledInput>
        </InputHolder>
        {email &&
        pass === confirmPass &&
        !(pass === '') &&
        !(confirmPass === '') ? (
          <LoginButton onClick={login}>
            <p style={{ margin: 0, padding: '7px' }}>Register!</p>
          </LoginButton>
        ) : null}
      </LoginCard>
    </MainLoginDiv>
  );
};

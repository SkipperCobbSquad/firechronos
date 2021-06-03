import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from './firebase';
import { useSelector, useDispatch } from 'react-redux';
import { SoreInter } from './index';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { registerUser } from './actions/registerUser';

import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';

const MainDiv = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const NavDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #000;
  color: #fefefe;
`;

const LogoHolder = styled.div`
  display: flex;
  margin-left: 10px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 18px;
`;

const TraceHolder = styled.div`
  display: flex;
`;
const TraceButton = styled.div`
  display: flex;
  background: #4361ee;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  padding: 8px 7px 8px 7px;
  border-radius: 14px;
  cursor: pointer;
  &:hover {
    background: #4895ef;
  }
`;

const TraceP = styled.div`
  margin: 0;
  padding: 0;
  user-select: none;
`;

const StyledLink = styled(Link)`
  display: flex;
  margin: 0;
  padding: 0;
  color: #fefefe;
  text-decoration: none;
  &:hover {
    color: #fefefe;
  }
`;

function App() {
  const userA = useSelector((state: SoreInter) => state.user);
  const [loading, setLoading] = useState(true);
  const [onDash, setDash] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(registerUser(user));
      setLoading(false);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    auth.signOut();
  };
  return (
    <MainDiv>
      <Router>
        <NavDiv>
          <StyledLink to="/">
            <LogoHolder>
              <p>CHRONOS</p>
            </LogoHolder>
          </StyledLink>
          {userA? <p>{userA.email}</p>: null}
          <TraceHolder>
            {userA && onDash ? (
              <TraceButton onClick={logOut}>
                <TraceP>Logout</TraceP>
              </TraceButton>
            ) : userA ? (
              <StyledLink to="/dashboard">
                <TraceButton>
                  <TraceP>Dashboard</TraceP>
                </TraceButton>
              </StyledLink>
            ) : (
              <>
                <StyledLink to="/login">
                  <TraceButton>
                    <TraceP>Login</TraceP>
                  </TraceButton>
                </StyledLink>
                <StyledLink to="/register">
                <TraceButton>
                  <TraceP>Register</TraceP>
                </TraceButton>
                </StyledLink>
              </>
            )}
          </TraceHolder>
        </NavDiv>
        {!loading && (
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login">
              <Login call={setLoading}></Login>
            </Route>
            <Route exact path="/register" >
              <Register call={setLoading}></Register>
            </Route>
            <Route exact path="/dashboard">
              {userA ? (
                <Dashboard call={setDash}></Dashboard>
              ) : (
                <Redirect to="/login"></Redirect>
              )}
            </Route>
          </Switch>
        )}
      </Router>
    </MainDiv>
  );
}

export default App;

// app.firestore().collection('tasks').get().then(data => data.forEach( (doc) =>console.log(doc.data())))

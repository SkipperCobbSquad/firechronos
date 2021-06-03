import {ActionSetUser} from '../reducers/userReducer';
import firebase from 'firebase'

export const registerUser = (user: firebase.User | null) => {
  return {
    type: ActionSetUser.set,
    payload: user,
  };
};

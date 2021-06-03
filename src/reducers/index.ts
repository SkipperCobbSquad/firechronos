import { combineReducers } from 'redux';
import { userSetReducer } from './userReducer';

export const allReducers = combineReducers({
  user: userSetReducer,
});

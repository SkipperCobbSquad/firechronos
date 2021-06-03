import firebase from 'firebase'
export enum ActionSetUser {
  set = 'set',
}

export interface ActionUserSetPayload {
  type: ActionSetUser;
  payload: firebase.User | null
}

export const userSetReducer = (state: firebase.User | null, action: ActionUserSetPayload) => {
  switch (action.type) {
    case ActionSetUser.set:
        return action.payload
    default:
        return null
  }
};

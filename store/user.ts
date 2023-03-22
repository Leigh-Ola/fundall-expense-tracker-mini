import {
    createStore
  } from 'harlem';
  
  const STATE = {
    "id": NaN,
    "firstname": "",
    "lastname": "",
    "email": "",
    "avatar": "",
    "monthly_target": NaN,
    "created_at": "",
    "updated_at": "",
    "token_type": "",
    "expires_at": ""
  }
  
  export const { state, getter, mutation, ...store } = createStore('user', STATE)
  export const updateUser = mutation('updateUser', (state: any, payload: any) => {
    // convert payload into an array of key value pairs.
    Object.entries(payload).forEach(([key, value]) => {
        // set the value of the key in the state to the value of the key in the payload.
        if(Object.keys(state).includes(key)){
            state[key] = value;
        }
    });
});
export const user = getter('user', (state: any) => {
    return state;
});
    
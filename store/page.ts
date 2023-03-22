import {
  createStore
} from 'harlem';

const STATE = {
  pageName: '',
}

export const { state, getter, mutation, ...store } = createStore('user', STATE)
export const getPageName = getter('fullName', (state: any) => {
  return state.pageName;
})
export const setPageName = mutation<string>('setFirstName', (state:any, payload:any) => {
  state.pageName = payload
})

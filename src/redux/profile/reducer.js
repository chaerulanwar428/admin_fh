import {
    START_FETCHING_PROFILE,
    SUCCESS_FETCHING_PROFILE,
    ERROR_FETCHING_PROFILE,
  } from './constants';
  
  const statuslist = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error',
  };
  
  const initialState = {
    data: [],
    keyword: '',
    status: statuslist.idle,
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case START_FETCHING_PROFILE:
        return { ...state, status: statuslist.process };
  
      case ERROR_FETCHING_PROFILE:
        return { ...state, status: statuslist.error };
  
      case SUCCESS_FETCHING_PROFILE:
        return {
          ...state,
          status: statuslist.success,
          data: action.profile,
        };
  
      default:
        return state;
    }
  }
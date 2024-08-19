import {
    START_FETCHING_PRESTASI,
    SUCCESS_FETCHING_PRESTASI,
    ERROR_FETCHING_PRESTASI,
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
      case START_FETCHING_PRESTASI:
        return { ...state, status: statuslist.process };
  
      case ERROR_FETCHING_PRESTASI:
        return { ...state, status: statuslist.error };
  
      case SUCCESS_FETCHING_PRESTASI:
        return {
          ...state,
          status: statuslist.success,
          data: action.prestasi,
        };
  
      default:
        return state;
    }
  }
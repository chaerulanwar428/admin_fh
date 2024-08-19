import {
    START_FETCHING_GALERI,
    SUCCESS_FETCHING_GALERI,
    ERROR_FETCHING_GALERI,
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
      case START_FETCHING_GALERI:
        return { ...state, status: statuslist.process };
  
      case ERROR_FETCHING_GALERI:
        return { ...state, status: statuslist.error };
  
      case SUCCESS_FETCHING_GALERI:
        return {
          ...state,
          status: statuslist.success,
          data: action.galeri,
        };
  
      default:
        return state;
    }
  }
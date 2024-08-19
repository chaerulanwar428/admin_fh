import { 
  START_FETCHING_PENDAFTARAN, 
  SUCCESS_FETCHING_PENDAFTARAN, 
  ERROR_FETCHING_PENDAFTARAN } from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchPendaftaran = debounce(getData, 1000);

export const startFetchingPendaftaran = () => {
  return {
    type: START_FETCHING_PENDAFTARAN,
  };
};

export const successFetchingPendaftaran = ({ pendaftaran }) => {
  return {
    type: SUCCESS_FETCHING_PENDAFTARAN,
    pendaftaran,
  };
};

export const errorFetchingPendaftaran = () => {
  return {
    type: ERROR_FETCHING_PENDAFTARAN,
  };
};

export const fetchPendaftaran = () => {
  return async (dispatch) => {
    dispatch(startFetchingPendaftaran());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchPendaftaran('/cms/pendaftaran');

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        successFetchingPendaftaran({
          pendaftaran: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingPendaftaran());
    }
  };
};

import { 
  START_FETCHING_PRESTASI, 
  SUCCESS_FETCHING_PRESTASI, 
  ERROR_FETCHING_PRESTASI } from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchPrestasi = debounce(getData, 1000);

export const startFetchingPrestasi = () => {
  return {
    type: START_FETCHING_PRESTASI,
  };
};

export const successFetchingPrestasi = ({ prestasi }) => {
  return {
    type: SUCCESS_FETCHING_PRESTASI,
    prestasi,
  };
};

export const errorFetchingPrestasi = () => {
  return {
    type: ERROR_FETCHING_PRESTASI,
  };
};

export const fetchPrestasi = () => {
  return async (dispatch) => {
    dispatch(startFetchingPrestasi());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchPrestasi('/cms/prestasi');

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        successFetchingPrestasi({
          prestasi: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingPrestasi());
    }
  };
};

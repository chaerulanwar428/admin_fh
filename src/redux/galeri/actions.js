import { 
  START_FETCHING_GALERI, 
  SUCCESS_FETCHING_GALERI, 
  ERROR_FETCHING_GALERI } from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchGaleri = debounce(getData, 1000);

export const startFetchingGaleri = () => {
  return {
    type: START_FETCHING_GALERI,
  };
};

export const successFetchingGaleri = ({ galeri }) => {
  return {
    type: SUCCESS_FETCHING_GALERI,
    galeri,
  };
};

export const errorFetchingGaleri = () => {
  return {
    type: ERROR_FETCHING_GALERI,
  };
};

export const fetchGaleri = () => {
  return async (dispatch) => {
    dispatch(startFetchingGaleri());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchGaleri('/cms/galeri');

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        successFetchingGaleri({
          galeri: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingGaleri());
    }
  };
};

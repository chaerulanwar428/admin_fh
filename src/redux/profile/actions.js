import { 
  START_FETCHING_PROFILE, 
  SUCCESS_FETCHING_PROFILE, 
  ERROR_FETCHING_PROFILE } from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchProfile = debounce(getData, 1000);

export const startFetchingProfile = () => {
  return {
    type: START_FETCHING_PROFILE,
  };
};

export const successFetchingProfile = ({ profile }) => {
  return {
    type: SUCCESS_FETCHING_PROFILE,
    profile,
  };
};

export const errorFetchingProfile = () => {
  return {
    type: ERROR_FETCHING_PROFILE,
  };
};

export const fetchProfile = () => {
  return async (dispatch) => {
    dispatch(startFetchingProfile());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchProfile('/cms/profile');

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        successFetchingProfile({
          profile: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingProfile());
    }
  };
};

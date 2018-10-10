import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
import {replace} from 'react-router-redux';
import {API_URL, API_ID} from '../settings';

const startRequest = category => ({
  type: 'START_REQUEST',
  payload: {category}
});

const receiveData = (category, error, response) => ({
  type: 'RECEIVE_DATA',
  payload: {category, error, response}
});

const finishRequest = category => ({
  type: 'FINISH_REQUEST',
  payload: {category}
});

export const fetchRanking = categoryId => {
  return async (dispatch, getState) => {
    const categories = getState().shopping.category;
    const category = categories.find(category => (category.id === categoryId));

    if (typeof category === 'undefined') {
      dispatch(replace('/'));
      return;
    }

    dispatch(startRequest(category));

    const querySrtings = qs.stringify({
      appid: API_ID,
      category_Id: categoryId
    });

    try {
      const response = await fetchJsonp(`${API_URL}?${querySrtings}`);
      const data = await response.json();
      dispatch(receiveData(category, null, data))
    } catch (err) {
      dispatch(receiveData(category, err));
    }
    dispatch(finishRequest(category));
  };
};

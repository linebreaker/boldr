import * as t from '../actionTypes';
import settingsReducer from './reducer';

describe('Settings Reducer', () => {
  it('Should return the initial state', () => {
    expect(settingsReducer(undefined, {})).toEqual({
      all: {},
      ids: [],
      isFetching: false,
      meta: {
        status: -1,
        initialPageLoad: true,
      },
    });
  });
});

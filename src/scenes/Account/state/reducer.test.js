import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_FAILURE,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_FAILURE,
  SIGNUP_USER_SUCCESS,
  LOGOUT,
} from './actionTypes';
import authReducer from './reducer';

describe('Auth Reducer', () => {
  it('Should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
    });
  });
  it('should handle LOGIN_REQUEST', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
    };
    expect(
      authReducer(initialState, {
        type: LOGIN_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle LOGIN_FAILURE', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: undefined,
      loading: false,
      token: '',
    };
    expect(
      authReducer(initialState, {
        type: LOGIN_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle SIGNUP_USER_REQUEST', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
    };
    expect(
      authReducer(initialState, {
        type: SIGNUP_USER_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle SIGNUP_USER_FAILURE', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: undefined,
      loading: false,
      token: '',
    };
    expect(
      authReducer(initialState, {
        type: SIGNUP_USER_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle CHECK_AUTH_REQUEST', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
    };
    expect(
      authReducer(initialState, {
        type: CHECK_AUTH_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle CHECK_AUTH_FAILURE', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: null,
    };
    const stateAfter = {
      isAuthenticated: false,
      error: undefined,
      loading: false,
      token: '',
    };
    expect(
      authReducer(initialState, {
        type: CHECK_AUTH_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle LOGOUT', () => {
    const initialState = {
      isAuthenticated: true,
      error: null,
      loading: false,
      token: 'abcdcdc',
    };
    const stateAfter = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: '',
    };
    expect(
      authReducer(initialState, {
        type: LOGOUT,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle SIGNUP_USER_SUCCESS', () => {
    const initialState = {
      isAuthenticated: false,
      error: null,
      loading: true,
      token: '',
    };
    const stateAfter = {
      isAuthenticated: false,
      error: null,
      loading: false,
      token: '',
    };
    expect(
      authReducer(initialState, {
        type: SIGNUP_USER_SUCCESS,
      }),
    ).toEqual(stateAfter);
  });
});

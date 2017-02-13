import { combineReducers } from 'redux';
import * as t from '../actionTypes';

export const STATE_KEY = 'users';

const all = (state = {}, action) => {
  switch (action.type) {
    // case t.FETCH_POSTS_SUCCESS:
    //   return {
    //     ...state,
    //     ...action.payload.entities.posts,
    //   };
    // case t.DELETE_POST_SUCCESS:
    //   return removeByKey(state, action.id);
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    // case t.FETCH_POSTS_SUCCESS:
    //   return action.payload.result;
    // case t.DELETE_POST_SUCCESS:
    //   return removeIdFromArray(state, action.id);
    default:
      return state;
  }
};

const userlist = combineReducers({
  all,
  ids,
});

const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.LOGIN_REQUEST:
    case t.FETCH_PROFILE_REQUEST:
    case t.FORGOT_PASSWORD_REQUEST:
    case t.RESET_PASSWORD_REQUEST:
      return true;
    case t.LOGIN_SUCCESS:
    case t.FETCH_PROFILE_SUCCESS:
    case t.FETCH_PROFILE_FAILURE:
    case t.RESET_PASSWORD_SUCCESS:
    case t.FORGOT_PASSWORD_SUCCESS:
    case t.FORGOT_PASSWORD_FAILURE:
    case t.RESET_PASSWORD_FAILURE:
      return false;
    default:
      return state;
  }
};

const INITIAL_STATE = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  location: '',
  avatarUrl: '',
  social: {},
  website: '',
  bio: '',
  role: '',
  roleId: '',
};

const me = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.LOGIN_SUCCESS:
    case t.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        id: action.user.id,
        email: action.user.email,
        firstName: action.user.first_name,
        lastName: action.user.last_name,
        username: action.user.username,
        avatarUrl: action.user.avatar_url,
        location: action.user.location,
        bio: action.user.bio,
        website: action.user.website,
        social: action.user.social,
        role: action.user.roles[0].name,
        roleId: action.user.roles[0].id,
      };
    case t.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        username: action.payload.username,
        avatarUrl: action.payload.avatar_url,
        social: action.payload.social,
        location: action.payload.location,
        website: action.payload.website,
        bio: action.payload.bio,
      };
    case t.LOGOUT:
      return {
        ...state,
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        location: '',
        avatarUrl: '',
        social: {},
        website: '',
        bio: '',
        role: '',
        roleId: '',
      };
    default:
      return state;
  }
};

const profile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        username: action.payload.username,
        avatarUrl: action.payload.avatar_url,
        profileImage: action.payload.profile_image,
        social: action.payload.social,
        location: action.payload.location,
        website: action.payload.website,
        bio: action.payload.bio,
        role: action.payload.roles[0].name,
        roleId: action.payload.roles[0].id,
      };
    case t.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        username: action.payload.username,
        social: action.payload.social,
        location: action.payload.location,
        website: action.payload.website,
        bio: action.payload.bio,
      };
    default:
      return state;
  }
};

export default combineReducers({
  me,
  profile,
  isFetching,
  userlist,
});

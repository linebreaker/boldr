import base from './base';
import TOKEN_KEY from './token';

import {
  API_PREFIX,
  S3_SIGNING_URL,
  API_AUTH,
  API_POSTS,
  API_ACTIVITY,
  API_USERS,
  API_PROFILES,
  API_PAGES,
  API_LINKS,
  API_ATTACHMENTS,
  API_TAGS,
  API_SETTINGS,
  API_TOKEN,
  API_NAVIGATION,
  API_BLOCKS,
} from './endpoints';

const origin = () =>
  typeof window !== 'undefined' ? window.location.origin : base.host;

export {
  base,
  origin,
  TOKEN_KEY,
  API_PREFIX,
  S3_SIGNING_URL,
  API_AUTH,
  API_POSTS,
  API_ACTIVITY,
  API_USERS,
  API_PROFILES,
  API_PAGES,
  API_LINKS,
  API_ATTACHMENTS,
  API_TAGS,
  API_SETTINGS,
  API_NAVIGATION,
  API_BLOCKS,
  API_TOKEN,
};

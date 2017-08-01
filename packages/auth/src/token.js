// import config from '../../../../config';
import Storage from './storage';

export const parseJWT = token => {
  if (!token) {
    /* istanbul ignore next */
    return null;
  }
  const base64Url = token;
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  const parts = base64.split('.');
  if (parts.length !== 3) {
    /* istanbul ignore next */
    return null;
  }

  try {
    const [headerRaw, payloadRaw, signatureRaw] = parts;

    const header = JSON.parse(atob(headerRaw));
    const payload = JSON.parse(atob(payloadRaw));
    const signature = atob(signatureRaw);
    const expiredToken = isTokenExpired(payload.exp);
    // If the token is expired, remove it.
    // this forces the user to login again.
    if (expiredToken === true) {
      /* istanbul ignore next */
      Storage.remove('bjwt');
      /* istanbul ignore next */
      return null;
    }
    return {
      header,
      payload,
      signature,
    };
  } catch (err) {
    /* istanbul ignore next */
    console.error(err);
    /* istanbul ignore next */
    return null;
  }
};

function isTokenExpired(exp) {
  const date = new Date(0);
  const expirationDate = date.setUTCSeconds(exp);

  return expirationDate < new Date();
}

export const setToken = token => {
  return Storage.set('bjwt', token);
};

export const getToken = (asJSON = false) => {
  const token = Storage.get('bjwt');
  if (asJSON) {
    return parseJWT(token);
  }
  /* istanbul ignore next */
  return token;
};

export function removeToken() {
  Storage.remove('bjwt');
}
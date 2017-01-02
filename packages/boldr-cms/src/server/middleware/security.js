/* @flow */

import uuid from 'uuid';
import hpp from 'hpp';
import helmet from 'helmet';
import type { Middleware, $Request, $Response, NextFunction } from 'express';
import config from '../../../config';

const cspConfig = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      // Allow scripts hosted from our application.
      "'self'",
      // Allow scripts from cdn.polyfill.io so that we can import the polyfill.
      'cdn.polyfill.io',
      "'unsafe-eval'",
      // Note: We will execution of any inline scripts that have the following
      // nonce identifier attached to them.
      // This is useful for guarding your application whilst allowing an inline
      // script to do data store rehydration (redux/mobx/apollo) for example.
      // @see https://helmetjs.github.io/docs/csp/
      // $FlowFixMe
      (req, res) => `'nonce-${res.locals.nonce}'`,
    ],
    styleSrc: [
      "'self'",
      // Webpack generates JS that loads our CSS, so this is needed:
      "'unsafe-inline'",
      'blob:',
      'fonts.googleapis.com',
    ],
    imgSrc: [
      "'self'",
      // If you use Base64 encoded images (i.e. inlined images), then you will
      // need the following:
      'data:',
      'https://boldr.io',
      'https://boldrcms.s3-us-west-1.amazonaws.com',
    ],
    manifestSrc: ["'self'"],
    connectSrc: ['*'], // ["'self'", 'ws:'],
    fontSrc: ["'self'", 'data:', 'fonts.gstatic.com'],
    objectSrc: ["'self'"],
    mediaSrc: ["'self'"],
    childSrc: ["'self'"],
  },
};


// Add any additional CSP from the static config.
Object.keys(config.cspExtensions).forEach((key) => {
  if (cspConfig.directives[key]) {
    cspConfig.directives[key] = cspConfig.directives[key]
      .concat(config.cspExtensions[key]);
  } else {
    cspConfig.directives[key] = config.cspExtensions[key];
  }
});

if (process.env.NODE_ENV === 'development') {
  // When in development mode we need to add our secondary express server that
  // is used to host our client bundle to our csp config.
  Object.keys(cspConfig.directives).forEach((directive) => {
    cspConfig.directives[directive].push(
      `${config.host}:${config.clientDevServerPort}`,
    );
  });
}

// Attach a unique "nonce" to every response.  This allows use to declare
// inline scripts as being safe for execution against our content security policy.
// @see https://helmetjs.github.io/docs/csp/
function nonceMiddleware(req: $Request, res: $Response, next: NextFunction) {
  res.locals.nonce = uuid(); // eslint-disable-line no-param-reassign
  next();
}

const securityMiddleware = [
  nonceMiddleware,

  // Prevent HTTP Parameter pollution.
  // @see http://bit.ly/2f8q7Td
  hpp(),

  // The xssFilter middleware sets the X-XSS-Protection header to prevent
  // reflected XSS attacks.
  // @see https://helmetjs.github.io/docs/xss-filter/
  helmet.xssFilter(),

  // Frameguard mitigates clickjacking attacks by setting the X-Frame-Options header.
  // @see https://helmetjs.github.io/docs/frameguard/
  helmet.frameguard('deny'),

  // Sets the X-Download-Options to prevent Internet Explorer from executing
  // downloads in your site’s context.
  // @see https://helmetjs.github.io/docs/ienoopen/
  helmet.ieNoOpen(),

  // Don’t Sniff Mimetype middleware, noSniff, helps prevent browsers from trying
  // to guess (“sniff”) the MIME type, which can have security implications. It
  // does this by setting the X-Content-Type-Options header to nosniff.
  // @see https://helmetjs.github.io/docs/dont-sniff-mimetype/
  helmet.noSniff(),
  config.useCSP ? helmet.contentSecurityPolicy(cspConfig) : null,
];

export default (securityMiddleware: Array<Middleware>);
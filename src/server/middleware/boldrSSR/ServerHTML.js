/**
 * This module is responsible for generating the HTML page response for
 * the react application middleware.
 */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */

import React, { Children, PropTypes } from 'react';
import serialize from 'serialize-javascript';

import getClientBundleEntryAssets from './getClientBundleEntryAssets';
import getSerializedClientConfig from './getSerializedClientConfig';
import config from '../../../shared/core/utils/config';

import Html from '../../../shared/components/Html';

// PRIVATES

// :: (Boolean, () => Element) -> ?Any
const onlyIf = (a, b) => (a ? b() : null);

// :: (Boolean)
const removeEmpty = a => a.filter(x => x != null);

function KeyedComponent({ children }) {
  return Children.only(children);
}

// Resolve the assets (js/css) for the client bundle's entry chunk.
const clientEntryAssets = getClientBundleEntryAssets();

function stylesheetTag(styles: Array<string>) {
  return styles
    .map(style =>
      `<link href="${style}" media="screen, projection" rel="stylesheet" type="text/css" />`,
    )
    .join('\n');
}
function scriptTag(jsFilePath) {
  return <script type="text/javascript" src={ jsFilePath } />;
}

// COMPONENT

function ServerHTML(props) {
  const {
    reactAppString,
    nonce,
    preloadedState,
    styles,
    helmet,
  } = props;

  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = body => (
    <script
      nonce={ nonce }
      type="text/javascript"
      dangerouslySetInnerHTML={ { __html: body } }
    />
  );

  const headerElements = removeEmpty([
    ...onlyIf(helmet, () => helmet.meta.toComponent()),
    ...onlyIf(helmet, () => helmet.link.toComponent()),
    onlyIf(
      clientEntryAssets && clientEntryAssets.css,
      () => stylesheetTag(clientEntryAssets.css),
    ),
    ...onlyIf(helmet, () => helmet.style.toComponent()),
  ]);

  const bodyElements = removeEmpty([
    // Binds the client configuration object to the window object so
    // that we can safely expose some configuration values to the
    // client bundle that gets executed in the browser.
    inlineScript(`window.__CLIENT_CONFIG__=${getSerializedClientConfig()}`),
    inlineScript(`window.__PRELOADED_STATE__=${serialize(props.preloadedState)};`),
    onlyIf(
      config('polyfillIO.enabled'),
      () => scriptTag(config('polyfillIO.url')),
    ),
    // When we are in development mode our development server will
    // generate a vendor DLL in order to dramatically reduce our
    // compilation times.  Therefore we need to inject the path to the
    // vendor dll bundle below.
    onlyIf(
      process.env.NODE_ENV === 'development'
      && config('bundles.client.devVendorDLL.enabled'),
      () => scriptTag(
        `${config('bundles.client.webPath')}${config('bundles.client.devVendorDLL.name')}.js?t=${Date.now()}`,
      ),
    ),
    onlyIf(
      clientEntryAssets && clientEntryAssets.js,
      () => scriptTag(clientEntryAssets.js),
    ),
    ...onlyIf(
      helmet,
      () => helmet.script.toComponent(),
    ),
  ]);

  return (
    <Html
      title={ config('htmlPage.defaultTitle') }
      description={ config('htmlPage.description') }
      appBodyString={ reactAppString }
      headerElements={
        headerElements.map((x, idx) => <KeyedComponent key={ idx }>{x}</KeyedComponent>)
      }
      bodyElements={
        bodyElements.map((x, idx) => <KeyedComponent key={ idx }>{x}</KeyedComponent>)
      }
    />
  );
}

ServerHTML.propTypes = {
  reactAppString: PropTypes.string,
  nonce: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  helmet: PropTypes.object,
};

// EXPORT

export default ServerHTML;

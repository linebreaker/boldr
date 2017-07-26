import React from 'react';

// We create this wrapper so that we only import react-hot-loader for a
// development build.  Small savings. :)
const ReactHotLoader =
  typeof window !== 'undefined' && typeof window === 'object'
    ? require('react-hot-loader').AppContainer
    : ({ children }) => React.Children.only(children);

export default ReactHotLoader;

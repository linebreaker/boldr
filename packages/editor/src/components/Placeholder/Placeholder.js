import React, { Component } from 'react';
import { Placeholder } from 'slate';

const PlaceholderElement = props => {
  const { node, state, parent, children } = props;
  return (
    <Placeholder firstOnly parent={parent} node={node} state={state} style={{ opacity: '0.65' }}>
      {children}
    </Placeholder>
  );
};

export default PlaceholderElement;

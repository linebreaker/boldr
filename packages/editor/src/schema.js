/* eslint-disable react/prop-types */
import React from 'react';

import PlaceholderElement from './components/Placeholder';

const schema = {
  nodes: {
    'block-quote': props =>
      <blockquote {...props.attributes}>
        {props.children}
      </blockquote>,
    'bulleted-list': props =>
      <ul {...props.attributes}>
        {props.children}
      </ul>,
    'heading-one': props =>
      <h1 {...props.attributes}>
        {props.children}
      </h1>,
    'heading-two': props =>
      <h2 {...props.attributes}>
        {props.children}
      </h2>,
    'list-item': props =>
      <li {...props.attributes}>
        {props.children}
      </li>,
    'numbered-list': props =>
      <ol {...props.attributes}>
        {props.children}
      </ol>,
    paragraph: props =>
      <p {...props.attributes} style={{ position: 'relative' }}>
        <PlaceholderElement {...props}>Write your story...</PlaceholderElement>
        {props.children}
      </p>,
    heading: props =>
      <h3>
        {props.children}
      </h3>,
    divider: props => {
      const { node, state } = props;
      const focus = state.isFocused && state.selection.hasEdgeIn(node);
      const className = focus ? 'focus' : 'nofocus';
      return <hr className={className} />;
    },
    quote: props => {
      const { node, state } = props;
      const focus = state.isFocused && state.selection.hasEdgeIn(node);
      const className = focus ? 'focus' : 'nofocus';
      return (
        <blockquote {...props.attributes} className={className}>
          {props.children}
        </blockquote>
      );
    },
    image: props => {
      const { node, state, src } = props;
      const focus = state.isFocused && state.selection.hasEdgeIn(node);
      const className = focus ? 'focus' : 'nofocus';
      return <img {...props.attributes} className={className} src={src} />;
    },
    link: props => {
      const { data } = props.node;
      const href = data.get('href');
      return (
        <a {...props.attributes} href={href}>
          {props.children}
        </a>
      );
    },
  },
  marks: {
    bold: props =>
      <strong>
        {props.children}
      </strong>,
    italic: props =>
      <em>
        {props.children}
      </em>,
    code: {
      fontFamily: 'monospace',
      backgroundColor: '#eee',
      padding: '3px',
      borderRadius: '4px',
    },
    underlined: {
      textDecoration: 'underline',
    },
  },
};

export default schema;

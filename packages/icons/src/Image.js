import React from 'react';
import Icon from './Icon';

/*eslint-disable */
const Image = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <g>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </g>
  </Icon>
);
/*eslint-enable */

export default Image;

import React from 'react';
import Icon from './Icon';

/*eslint-disable */
const Clock = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <g>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l3 3" />
    </g>
  </Icon>
);
/*eslint-enable */

export default Clock;

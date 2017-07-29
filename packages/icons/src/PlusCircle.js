import React from 'react';
import Icon from './Icon';

/*eslint-disable */
const PlusCircle = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <g>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </g>
  </Icon>
);
/*eslint-enable */

export default PlusCircle;

import React from 'react';
import Icon from './Icon';

/*eslint-disable */
const Crosshair = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <g>
      <circle cx="12" cy="12" r="10" />
      <path d="M22 12h-4M6 12H2M12 6V2M12 22v-4" />
    </g>
  </Icon>
);
/*eslint-enable */

export default Crosshair;

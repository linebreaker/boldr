import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ children, color, size, style, ...props }) => {
  const computedSize = size || '1em';
  function onClick(e) {
    if (props.onClick) {
      props.onClick(e);
    }
  }
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      children={children}
      fill="currentColor"
      preserveAspectRatio="xMidYMid meet"
      height={computedSize}
      width={computedSize}
      onClick={onClick}
      style={{
        verticalAlign: 'middle',
        color: color,
        ...style,
      }}
    />
  );
};

Icon.defaultProps = {
  size: '1em',
  color: '#222',
};

Icon.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.any,
  color: PropTypes.string,
  viewBox: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Icon;

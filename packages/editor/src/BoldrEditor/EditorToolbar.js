// @flow
import React from 'react';
import classnames from 'classnames';
import Utils from './Utils';

export type Props = {
  className?: string,
  style?: Object,
  children?: ReactChildren,
};

export default ({ children, style, className, ...rest }: Props) =>
  <div className={classnames('editor--toolbar', className)} style={style}>
    {Utils.cloneElement(children, rest)}
  </div>;

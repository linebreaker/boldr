// @flow
import React from 'react';
import classNames from 'classnames';
import { withHelpersModifiers } from '../../core/util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
};

export function HeroBody({ tag = 'div', ...props }: Props) {
  const className = classNames('boldrui-hero__body', props.className);

  return React.createElement(tag, { ...props, className });
}

export default withHelpersModifiers(HeroBody);

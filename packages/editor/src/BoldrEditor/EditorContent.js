// @flow
import React from 'react';
import classnames from 'classnames';
import { Editor } from 'slate';
import type { ReactChildren } from '../types/react';

export type Props = {
  className?: string,
  wrapperStyle?: Object,
  style?: Object,
  state: Object,
  outerState?: Object,
  plugins?: Array<any>,
  onChange?: Function,
  changeState?: Function,
  children?: ReactChildren,
};

export default ({
  className,
  wrapperStyle,
  style,
  state,
  outerState,
  plugins,
  onChange,
  changeState,
  children,
  ...rest
}: Props) => {
  const { readOnly } = outerState;

  return (
    <div className={classnames('editor--content', className)} style={wrapperStyle}>
      <Editor
        plugins={plugins}
        state={state}
        onChange={onChange}
        readOnly={readOnly}
        changeState={changeState}
        outerState={outerState}
        style={style}
        {...rest}
      />
      {children}
    </div>
  );
};

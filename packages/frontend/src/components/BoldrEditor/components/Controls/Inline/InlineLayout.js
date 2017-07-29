/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import shortid from 'shortid';
// import { Bold, Italic, Underline, Strikethrough, Superscript, Code } from 'boldr-icons';
import Icon from '@boldr/ui/Icons/Icon';
import { getFirstIcon } from '../../../utils/common';
import Option from '../../Option';
import { Dropdown, DropdownOption } from '../../Dropdown';

export type Props = {
  expanded?: boolean,
  doExpand?: Function,
  doCollapse?: Function,
  onExpandEvent?: Function,
  config?: Object,
  onChange?: Function,
  currentState?: Object,
};
/*
'bold',
'italic',
'underline',
'strikethrough',
'monospace',
'superscript',
'subscript',
 */
export default class InlineLayout extends Component {
  props: Props;
  renderInFlatList(): Object {
    const { config, currentState, onChange } = this.props;
    return (
      <div
        className={classNames('boldrui-editor__inline-wrapper')}
        aria-label="boldrui-editor__inline-control"
      >
        {config.options.map(style =>
          <Option
            key={shortid.generate()}
            value={style}
            onClick={onChange}
            className={classNames(config[style].className)}
            active={currentState[style] === true || (style === 'MONOSPACE' && currentState.CODE)}
            title={config[style].title}
          >
            <Icon kind={style} color="#222" />
          </Option>,
        )}
      </div>
    );
  }

  renderInDropDown(): Object {
    const {
      config,
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      currentState,
      onChange,
    } = this.props;
    const { className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('boldrui-editor__inline-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="boldrui-editor__inline-control"
        title={title}
      >
        <img src={getFirstIcon(config)} alt="" />
        {config.options.map(style =>
          <DropdownOption
            key={shortid.generate()}
            value={style}
            className={classNames('boldrui-editor__inline-dropdownoption', config[style].className)}
            active={currentState[style] === true || (style === 'MONOSPACE' && currentState.CODE)}
            title={config[style].title}
          >
            <img src={config[style].icon} alt="" />
          </DropdownOption>,
        )}
      </Dropdown>
    );
  }

  render(): Object {
    const { config: { inDropdown } } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}

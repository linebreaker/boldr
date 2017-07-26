/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import { getFirstIcon } from '../../../utils/toolbar';
import { Dropdown, DropdownOption } from '../../Dropdown';
import Option from '../../Option';

export type Props = {
  expanded?: boolean,
  doExpand?: Function,
  doCollapse?: Function,
  onExpandEvent?: Function,
  config?: Object,
  onChange?: Function,
  currentState?: Object,
};

export default class ListLayout extends Component {
  options: Array = ['unordered', 'ordered', 'indent', 'outdent'];
  props: Props;
  toggleBlockType: Function = (blockType: String): void => {
    const { onChange } = this.props;
    onChange(blockType);
  };

  indent: Function = (): void => {
    const { onChange } = this.props;
    onChange('indent');
  };

  outdent: Function = (): void => {
    const { onChange } = this.props;
    onChange('outdent');
  };

  // @TODO: evaluate refactoring this code to put a loop there and in other places also in code
  // hint: it will require moving click handlers
  renderInFlatList(): Object {
    const { config, currentState: { listType } } = this.props;
    const { options, unordered, ordered, indent, outdent, className } = config;
    return (
      <div
        className={classNames('boldrui-editor__list-wrapper', className)}
        aria-label="boldrui-editor__list-control"
      >
        {options.indexOf('unordered') >= 0 &&
          <Option
            value="unordered"
            onClick={this.toggleBlockType}
            className={classNames(unordered.className)}
            active={listType === 'unordered'}
            title={unordered.title}
          >
            <Icon kind="unordered" color="#222" />
          </Option>}
        {options.indexOf('ordered') >= 0 &&
          <Option
            value="ordered"
            onClick={this.toggleBlockType}
            className={classNames(ordered.className)}
            active={listType === 'ordered'}
            title={ordered.title}
          >
            <Icon kind="ordered" color="#222" />
          </Option>}
        {options.indexOf('indent') >= 0 &&
          <Option
            onClick={this.indent}
            className={classNames(indent.className)}
            title={indent.title}
          >
            <Icon kind="indent" color="#222" />
          </Option>}
        {options.indexOf('outdent') >= 0 &&
          <Option
            onClick={this.outdent}
            className={classNames(outdent.className)}
            title={outdent.title}
          >
            <Icon kind="outdent" color="#222" />
          </Option>}
      </div>
    );
  }

  renderInDropDown(): Object {
    const {
      config,
      expanded,
      doCollapse,
      doExpand,
      onExpandEvent,
      onChange,
      currentState: { listType },
    } = this.props;
    const { options, className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('boldrui-editor__list-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="boldrui-editor__list-control"
        title={title}
      >
        <Icon kind="ordered" color="#222" />
        {this.options.filter(option => options.indexOf(option) >= 0).map((option, index) =>
          <DropdownOption
            key={index}
            value={option}
            className={classNames('boldrui-editor__list-dropdownOption', config[option].className)}
            active={listType === option}
            title={config[option].title}
          >
            <Icon kind={option} color="#222" />
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

/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Dropdown, DropdownOption } from '../../../Dropdown';

class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
  };

  state: Object = {
    defaultFontFamily: undefined,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const styles = window.getComputedStyle(editorElm[0]);
      const defaultFontFamily = styles.getPropertyValue('font-family');
      this.setState({
        defaultFontFamily,
      });
    }
  }

  render() {
    const { defaultFontFamily } = this.state;
    const {
      config: { icon, className, dropdownClassName, options, title },
      translations,
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
    } = this.props;
    let { currentState: { fontFamily: currentFontFamily } } = this.props;
    currentFontFamily =
      currentFontFamily ||
      (options &&
        defaultFontFamily &&
        options.some(opt => opt.toLowerCase() === defaultFontFamily.toLowerCase()) &&
        defaultFontFamily);
    return (
      <div className="boldr-editor__fontfamily-wrapper" aria-label="rdw-font-family-control">
        <Dropdown
          className={classNames('boldr-editor__fontfamily-dropdown', className)}
          optionWrapperClassName={classNames(
            'boldr-editor__fontfamily-optionwrapper',
            dropdownClassName,
          )}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title}
        >
          <span className="boldr-editor__fontfamily-placeholder">
            {currentFontFamily || 'Font Family'}
          </span>
          {options.map((family, index) =>
            <DropdownOption active={currentFontFamily === family} value={family} key={index}>
              {family}
            </DropdownOption>,
          )}
        </Dropdown>
      </div>
    );
  }
}

export default LayoutComponent;

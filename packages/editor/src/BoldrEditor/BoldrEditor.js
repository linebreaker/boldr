// @flow
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import classnames from 'classnames';
import schema from '../schema';
import plugins from '../plugins';
import Utils from './Utils';

import initialEditorState from './initialEditorState';

export type Props = {
  initialState?: Object,
  children: ReactChildren,
  style?: Object,
  className?: string,
};

const DEFAULT_NODE = 'paragraph';

class BoldrEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: props.initialState || initialEditorState,
      schema,
      readOnly: false,
      uid: new Date().getUTCMilliseconds(),
      cursorContext: {
        isFocused: false,
        newLine: false,
        parentBlockOffsets: { top: 0, left: 0 },
      },
    };
  }

  /**
     * Check if the current selection has a mark with `type` in it.
     *
     * @param {String} type
     * @return {Boolean}
     */

  hasMark = type => {
    const { state } = this.state;
    return state.marks.some(mark => mark.type == type);
  };

  /**
     * Check if the any of the currently selected blocks are of `type`.
     *
     * @param {String} type
     * @return {Boolean}
     */

  hasBlock = type => {
    const { state } = this.state;
    return state.blocks.some(node => node.type == type);
  };

  onChange = state => {
    this.setState({ state });
  };
  /**
 * On key down, if it's a formatting command toggle a mark.
 *
 * @param {Event} e
 * @param {Object} data
 * @param {State} state
 * @return {State}
 */

  onKeyDown = (e, data, state) => {
    if (!data.isMod) {
      return;
    }
    let mark;

    switch (data.key) {
      case 'b':
        mark = 'bold';
        break;
      case 'i':
        mark = 'italic';
        break;
      case 'u':
        mark = 'underlined';
        break;
      case '`':
        mark = 'code';
        break;
      default:
        return;
    }

    state = state.transform().toggleMark(mark).apply();

    e.preventDefault();
    return state;
  };

  /**
 * When a mark button is clicked, toggle the current mark.
 *
 * @param {Event} e
 * @param {String} type
 */

  onClickMark = (e, type) => {
    e.preventDefault();
    let { state } = this.state;

    state = state.transform().toggleMark(type).apply();

    this.setState({ state });
  };

  /**
 * When a block button is clicked, toggle the block type.
 *
 * @param {Event} e
 * @param {String} type
 */

  onClickBlock = (e, type) => {
    e.preventDefault();
    let { state } = this.state;
    const transform = state.transform();
    const { document } = state;

    // Handle everything but list buttons.
    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        transform
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        transform.setBlock(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = state.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type);
      });

      if (isList && isType) {
        transform.setBlock(DEFAULT_NODE).unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
      } else if (isList) {
        transform
          .unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type);
      } else {
        transform.setBlock('list-item').wrapBlock(type);
      }
    }

    state = transform.apply();
    this.setState({ state });
  };
  /**
   * Render the toolbar.
   *
   * @return {Element}
   */

  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu">
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
        {this.renderBlockButton('heading-one', 'looks_one')}
        {this.renderBlockButton('heading-two', 'looks_two')}
        {this.renderBlockButton('block-quote', 'format_quote')}
        {this.renderBlockButton('numbered-list', 'format_list_numbered')}
        {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
      </div>
    );
  };

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    const onMouseDown = e => this.onClickMark(e, type);

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">
          {icon}
        </span>
      </span>
    );
  };

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type);
    const onMouseDown = e => this.onClickBlock(e, type);

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">
          {icon}
        </span>
      </span>
    );
  };
  changeState = state => {
    //
    // The `setTimeout` function is need to prevent the warning below:
    //
    // Warning: setState(...): Cannot update during an existing state transition
    // (such as within `render` or another component's constructor). Render methods
    // should be a pure function of props and state; constructor side-effects are
    // an anti-pattern, but can be moved to `componentWillMount`.
    //
    // It needs to check a better way to solve the case to update "outerState"
    // inside the SlateJS node component.
    //
    setTimeout(() => {
      this.setState(state);
    }, 0);
  };
  props: Props;
  render() {
    const { children, style, className } = this.props;

    const childProps = {
      plugins,
      state: this.state.state,
      outerState: this.state,
      onChange: this.onChange,
      changeState: this.changeState,
      schema: this.state.schema,
    };

    return (
      <div className={classnames('editor--root', className)} style={style}>
        {this.renderToolbar()}
        {Utils.cloneElement(children, childProps)}
      </div>
    );
  }
}

export default BoldrEditor;

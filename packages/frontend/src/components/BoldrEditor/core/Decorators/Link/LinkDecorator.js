/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@boldr/ui/Icons/Icon';

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

function getLinkComponent(config) {
  const { showOpenOptionOnHover } = config;
  return class Link extends Component {
    static propTypes = {
      entityKey: PropTypes.string.isRequired,
      children: PropTypes.any,
      contentState: PropTypes.object,
    };

    state: Object = {
      showPopOver: false,
    };

    openLink: Function = () => {
      const { entityKey, contentState } = this.props;
      const { url } = contentState.getEntity(entityKey).getData();
      const linkTab = window.open(url, 'blank'); // eslint-disable-line no-undef
      linkTab.focus();
    };

    toggleShowPopOver: Function = () => {
      const showPopOver = !this.state.showPopOver;
      this.setState({
        showPopOver,
      });
    };

    render() {
      const { children, entityKey, contentState } = this.props;
      const { url, targetOption } = contentState.getEntity(entityKey).getData();
      const { showPopOver } = this.state;
      return (
        <span
          className="boldrui-editor__link-decorator-wrapper"
          onMouseEnter={this.toggleShowPopOver}
          onMouseLeave={this.toggleShowPopOver}
        >
          <a href={url} target={targetOption}>
            {children}
          </a>
          {showPopOver && showOpenOptionOnHover
            ? <Icon
                kind="external-link"
                onClick={this.openLink}
                color="#222"
                className="boldrui-editor__link-decorator-icon"
              />
            : undefined}
        </span>
      );
    }
  };
}

export default config => {
  return {
    strategy: findLinkEntities,
    component: getLinkComponent(config),
  };
};

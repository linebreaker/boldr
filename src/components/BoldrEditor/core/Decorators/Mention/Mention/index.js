import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'draft-js';
import classNames from 'classnames';

class Mention {
  constructor(className) {
    this.className = className;
  }
  getMentionComponent = () => {
    const className = this.className;
    return class MentionComponent extends Component {
      static PropTypes = {
        entityKey: PropTypes.number,
        children: PropTypes.object,
        contentState: PropTypes.object,
      };
      render() {
        const { entityKey, children, contentState } = this.props;
        const { url, value } = contentState.getEntity(entityKey).getData();
        return (
          <a href={url || value} className={classNames('boldr-editor__mention-link', className)}>
            {children}
          </a>
        );
      }
    };
  };
  getMentionDecorator = () => {
    return {
      strategy: this.findMentionEntities,
      component: this.getMentionComponent(),
    };
  };
}

Mention.prototype.findMentionEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
  }, callback);
};

export default Mention;

/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import classnames from 'classnames';
import { Card, CardTitle, CardText, CardActions, Media, MediaOverlay } from '@boldr/ui';
import Col from '@boldr/ui/Layout/Col';
import Row from '@boldr/ui/Layout/Row';
import Button from '@boldr/ui/Button';
import { StyleClasses } from '../../../../theme/styleClasses';
import { selectArticle } from '../../state/articles/actions';

import TagBlock from '../TagBlock';

const BASE_ELEMENT = StyleClasses.POST_CARD;
type Props = {
  className: string,
  article: Article,
  dispatch: () => void,
};

export const ArticleCard = (props: Props) => {
  const formattedDate = format(props.article.createdAt, 'MM/DD/YYYY');
  const classes = classnames(BASE_ELEMENT, props.className);

  function transitionPost() {
    const { article } = props;
    props.dispatch(selectArticle(article));
  }
  const { title, featureImage, slug, tags, excerpt } = props.article;
  return (
    <div className={classes}>
      <Card style={{ maxWidth: 600 }} className="md-block-centered">
        <Media>
          <img src={featureImage} alt={`${title} feature image`} role="presentation" />
        </Media>
        <CardTitle title={title} subtitle={formattedDate} />
        <CardActions expander>
          <Button kind="primary" onClick={transitionPost} href={`/blog/${slug}`} outline>
            Read More
          </Button>
        </CardActions>
        <CardText expandable>
          {excerpt}
        </CardText>
        <TagBlock tags={tags} />
      </Card>

    </div>
  );
};

export default connect(state => state, null, null, { pure: true })(ArticleCard);

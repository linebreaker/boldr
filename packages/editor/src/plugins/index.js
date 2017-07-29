import AutoReplace from 'slate-auto-replace';
import EditBlockquote from 'slate-edit-blockquote';
// import InsertImages from 'slate-drop-or-paste-images';
import TrailingBlock from 'slate-trailing-block';

import { html } from '../rules';
import titleCase from '../util/titleCase';
// https://github.com/GitbookIO/slate-edit-list
import MarkHotKey from './MarkHotKey';
import Link from './Link';
import Paste from './Paste';

const plugins = [
  // general tools
  Link({}),
  Paste({ html }),

  // hot keys
  MarkHotKey({ key: 'b', type: 'bold' }),
  MarkHotKey({ key: 'i', type: 'italic' }),

  // markdown shortcuts
  AutoReplace({
    trigger: 'space',
    before: /^(>)$/,
    transform: transform => {
      // quote
      return transform.setBlock({ type: 'quote' });
    },
  }),
  AutoReplace({
    trigger: 'enter',
    before: /^(\*\*\*)$/,
    transform: transform => {
      return (
        transform
          .setBlock({ type: 'divider', isVoid: true })
          .collapseToEndOfNextBlock()
          // page break
          .collapseToEndOfNextBlock()
      );
    },
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(#)$/,
    transform: transform => {
      // title
      return transform.setBlock({ type: 'heading' });
    },
  }),
  AutoReplace({
    trigger: 'enter',
    before: /.+/,
    onlyIn: 'heading',
    transform: (transform, e, data, matches) => {
      const title = titleCase(matches.before[0]);
      return (
        transform
          .deleteBackward(title.length)
          .insertText(title)
          .splitBlock()
          // Title Case Header the After Next Line Key
          .setBlock({ type: 'paragraph' })
      );
    },
  }),
  AutoReplace({
    trigger: 'backspace',
    after: /./,
    onlyIn: 'heading',
    transform: transform => {
      // cancel title
      return transform.setBlock({ type: 'paragraph' });
    },
  }),

  // auto format rules
  AutoReplace({
    trigger: /(")/,
    before: /[^ ”]$/,
    transform: transform => {
      // smart double quote
      return transform.insertText('”');
    },
  }),
  AutoReplace({
    trigger: /(")/,
    before: /(^)|[ ]$/,
    transform: transform => {
      // smart double quote
      return transform.insertText('“');
    },
  }),
  AutoReplace({
    trigger: /(')/,
    before: /[^ ”]$/,
    transform: transform => {
      // smart single quote
      return transform.insertText('’');
    },
  }),
  AutoReplace({
    trigger: /(')/,
    before: /(^)|[ ]$/,
    transform: transform => {
      // smart single quote
      return transform.insertText('‘');
    },
  }),
  AutoReplace({
    trigger: 'space',
    before: /[ ]$/,
    transform: transform => {
      // double-space > .
      return transform.deleteBackward(1).insertText('.');
    },
  }),
  AutoReplace({
    trigger: 'space',
    before: /( -)$/,
    transform: transform => {
      // mdash
      return transform.insertText(' — ');
    },
  }),
  AutoReplace({
    trigger: 'space',
    before: /(\.\.\.)$/,
    transform: transform => {
      // elipsis
      return transform.insertText('… ');
    },
  }),

  // special editor menu for quote
  EditBlockquote({
    type: 'quote',
    typeDefault: 'paragraph',
  }),


  // convenience plugins
  TrailingBlock({ type: 'paragraph' }),
];

export default plugins;

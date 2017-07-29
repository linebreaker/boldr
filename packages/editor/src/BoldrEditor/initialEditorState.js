import { Raw } from 'slate';

const initialEditorState = {
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [{ kind: 'text', text: 'Hello Im placeholder text.' }],
    },
  ],
};

export default Raw.deserialize(initialEditorState, { terse: true });

import keycode from 'keycode';

export default function MarkHotKey(options) {
  const { type, key } = options;

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, data, state) {
      // Check that the key pressed matches our `code` option.
      if (!event.metaKey || keycode(event.which) !== key) {
        return;
      }

      // Prevent the default characters from being inserted.
      event.preventDefault();

      // Toggle the mark `type`.
      return state.transform().toggleMark(type).apply();
    },
  };
}

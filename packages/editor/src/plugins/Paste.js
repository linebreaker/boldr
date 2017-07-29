export default function Paste(options) {
  const { html } = options;
  return {
    onPaste(event, data, state) {
      if (data.type !== 'html') {
        return;
      }
      const { document } = html.deserialize(data.html);
      return state.transform().insertFragment(document).apply();
    },
  };
}

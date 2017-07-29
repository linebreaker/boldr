import isUrl from '../util/isUrl';

export default function Link(options) {
  return {
    onPaste(event, data, state) {
      if (state.isCollapsed) {
        return;
      }
      if (data.type !== 'text' && data.type !== 'html') {
        return;
      }
      if (!isUrl(data.text)) {
        return;
      }

      const transform = state.transform();

      if (state.inlines.some(inline => inline.type === 'link')) {
        transform.unwrapInline('link');
      }
      return transform
        .wrapInline({
          type: 'link',
          data: {
            href: data.text,
          },
        })
        .collapseToEnd()
        .apply();
    },
  };
}

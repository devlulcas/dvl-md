import type * as mdast from 'mdast';

type CopyButtonNodeOptions = {
  className: string;
  text: string;
  icon: string;
};

export function createCopyButtonNode(options: CopyButtonNodeOptions): mdast.Paragraph {
  return {
    type: 'paragraph',
    data: {
      hName: 'button',
      hProperties: {
        class: options.className,
        'data-remark-code-window-copy-button': options.text,
      },
    },
    children: [
      { type: 'text', value: options.text },
      { type: 'text', value: options.icon },
    ],
  };
}

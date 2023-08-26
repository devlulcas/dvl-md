import type * as mdast from 'mdast';

type BlockNodeOptions = {
  value: string;
  copyButton?: mdast.Paragraph;
  as: string;
  className: string;
  children?: any;
};

export function createBlockNode(options: BlockNodeOptions): mdast.Paragraph {
  const textNode = { type: 'text', value: options.value };

  const children = [
    textNode,
    options.copyButton,
    ...(options.children ?? []),
  ].filter(Boolean);

  const identifierKey = `data-remark-code-window-${options.as}`;

  return {
    type: 'paragraph',
    data: {
      hName: 'div',
      hProperties: {
        class: options.className,
        [identifierKey]: options.value,
      },
    },
    children: children as mdast.PhrasingContent[],
  };
}

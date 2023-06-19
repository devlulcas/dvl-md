import type * as md from 'mdast';
import type * as unist from 'unist';

type BlockNodeOptions = {
  value: string;
  copyButton?: md.Paragraph;
  as: string;
  className: string;
  children?: unist.Node<unist.Data>[];
};

export function createBlockNode(options: BlockNodeOptions): md.Paragraph {
  const textNode = { type: 'text', value: options.value };

  const children = [textNode, options.copyButton, ...(options.children ?? [])].filter(
    Boolean
  );

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
    children: children as md.PhrasingContent[],
  };
}

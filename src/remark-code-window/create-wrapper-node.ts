import type * as unist from 'unist';

type WrapperNodeOptions = {
  children: unist.Node[];
  className: string;
};

export function createWrapperNode(options: WrapperNodeOptions): unist.Parent {
  return {
    type: 'container',
    data: {
      hName: 'div',
      hProperties: {
        'data-remark-code-window-wrapper': true,
        class: options.className,
      },
    },
    children: options.children,
  };
}

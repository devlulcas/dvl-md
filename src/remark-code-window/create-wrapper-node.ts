import type * as unist from 'unist';

type WrapperNodeOptions = {
  children: unist.Node<unist.Data>[];
  className: string;
};

export function createWrapperNode(options: WrapperNodeOptions): unist.Parent {
  return {
    type: 'container',
    data: {
      hName: 'div',
      hProperties: {
        class: options.className,
      },
    },
    children: options.children,
  };
}

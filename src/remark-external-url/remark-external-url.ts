import type * as mdast from 'mdast';
import type * as unified from 'unified';
import { visit, type Visitor } from 'unist-util-visit';

type RemarkExternalUrlOptions = {
  domain?: string;
};

type RemarkExternalUrl = unified.Plugin<
  [RemarkExternalUrlOptions?],
  mdast.Root
>;

export const remarkExternalUrl: RemarkExternalUrl = (pluginOptions) => {
  const visitor: Visitor<mdast.Link> = (node, index, parent) => {
    if (pluginOptions?.domain && node.url.includes(pluginOptions.domain)) {
      return;
    }

    if (!node.url.startsWith('http')) return;

    node.data = {
      ...(node.data ?? {}),
      hProperties: {
        ...(node.data?.hAttributes ?? {}),
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    };

    if (parent) {
      parent.children.splice(index ?? 0, 1, node);

      return (index ?? 0) + 2;
    }
  };

  return (tree) => {
    visit(tree, 'link', visitor);
  };
};

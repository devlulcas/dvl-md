import type * as mdast from 'mdast';
import type * as unified from 'unified';
import { visit, type Visitor } from 'unist-util-visit';

type RemarkBetterImagesOptions = {
  baseUrl: string;
  lazyload: boolean;
};

const defaultOptions: RemarkBetterImagesOptions = {
  baseUrl: '',
  lazyload: true,
};

type RemarkBetterImages = unified.Plugin<
  [Partial<RemarkBetterImagesOptions>?],
  mdast.Root
>;

export const remarkBetterImages: RemarkBetterImages = (pluginOptions) => {
  const options = {
    ...defaultOptions,
    ...pluginOptions,
  };

  const visitor: Visitor<mdast.Image> = (node, index, parent) => {
    if (!node.url.startsWith('http')) {
      // removes './' and '/'
      const cleanUrl = node.url.replace(/^\.\//, '').replace(/^\//, '');
      
      // adds a slash if the baseUrl doesn't end with a slash
      const addSlash = options.baseUrl.endsWith('/') ? '' : '/';

      node.url = `${options.baseUrl}${addSlash}${cleanUrl}`;
    }

    if (options.lazyload) {
      node.data = {
        ...node.data,
        hProperties: {
          ...(node.data?.hProperties ?? {}),
          loading: 'lazy',
        },
      };
    }

    if (parent) {
      parent.children.splice(index ?? 0, 1, node);

      return (index ?? 0) + 2;
    }
  };

  return (tree) => {
    visit(tree, 'image', visitor);
  };
};

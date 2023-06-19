import type * as mdast from 'mdast';
import type * as unified from 'unified';
import { visit, type Visitor } from 'unist-util-visit';
import type * as unist from 'unist';

type RemarkCustomBlockquotesOptions = {
  types?: {
    prefix: string;
    className: string;
  }[];
};

type RemarkCustomBlockquotes = unified.Plugin<
  [Partial<RemarkCustomBlockquotesOptions>?],
  mdast.Root
>;

export const remarkCustomBlockquotes: RemarkCustomBlockquotes = (
  pluginOptions
) => {
  const types = pluginOptions?.types || [];

  const visitor: Visitor<mdast.Blockquote> = (node, index, parent) => {
    console.log(node);
  };

  return (tree) => {
    visit(tree, 'blockquote', visitor);
  };
};

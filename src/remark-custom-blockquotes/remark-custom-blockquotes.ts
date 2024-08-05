import type * as mdast from "mdast";
import type * as unified from "unified";
import { visit, type Visitor, CONTINUE } from "unist-util-visit";

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
  pluginOptions,
) => {
  const types = pluginOptions?.types || [];

  const visitor: Visitor<mdast.Blockquote> = (node, index, parent) => {
    const firstChild = node.children?.[0];

    if (!firstChild || firstChild.type !== "paragraph") return CONTINUE;

    const firstTextNode = firstChild.children?.[0];

    if (!firstTextNode || firstTextNode.type !== "text") return CONTINUE;

    const [extractedTypePrefix, ...rest] = firstTextNode.value.split(":");

    const content = rest.join(":");

    const typeConfig = types.find(
      (type) => type.prefix === extractedTypePrefix,
    );

    if (!typeConfig) return CONTINUE;



    node.data = {
      ...(node.data ?? {}),
      hProperties: {
        ...(node.data?.hProperties ?? {}),
        class: typeConfig.className,
      },
    };

    firstTextNode.value = content;

    if (parent) {
      parent.children.splice(index ?? 0, 1, node);
      return (index ?? 0) + 2;
    }

    return CONTINUE;
  };

  return (tree) => {
    visit(tree, "blockquote", visitor);
  };
};

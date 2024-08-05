import type * as mdast from "mdast";
import type * as unified from "unified";
import { visit, type Visitor } from "unist-util-visit";

type RemarkBetterImagesOptions = {
  /**
   * Adds a base url to relative images
   */
  baseUrl: string;

  /**
   * Adds loadind='lazy' to md images
   */
  lazyload: boolean;

  /**
   * Transform titles in images into figcaptions (that also adds a <figure> element as a wrapper
   */
  titleToFigCaption: boolean;

  /**
   * Adds a placeholder className in case you want to show a shimmer os something like that while the images are loading
   */
  placeholderClassName: string;
};

const defaultOptions: RemarkBetterImagesOptions = {
  baseUrl: "",
  lazyload: true,
  titleToFigCaption: true,
  placeholderClassName: "remark-better-images-placeholder",
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
    if (!node.url.startsWith("http")) {
      // removes './' and '/'
      const cleanUrl = node.url.replace(/^\.\//, "").replace(/^\//, "");

      // adds a slash if the baseUrl doesn't end with a slash
      const addSlash = options.baseUrl.endsWith("/") ? "" : "/";

      node.url = `${options.baseUrl}${addSlash}${cleanUrl}`;
    }

    const getClassNames = (node: mdast.Image) => {
      if (!node.data) return "";

      const { hProperties } = node.data;

      let classNames = "";

      if (typeof hProperties === "object" && hProperties !== null) {
        if ("class" in hProperties && typeof hProperties.class === "string") {
          classNames = hProperties.class;
        }
      }

      return classNames;
    };

    if (options.lazyload) {
      node.data = {
        ...node.data,
        hProperties: {
          ...(node.data?.hProperties ?? {}),
          loading: "lazy",
          class:
            `${getClassNames(node)} ${options.placeholderClassName}`.trim(),
        },
      };
    }

    let resultNode: mdast.Node = node;

    if (options.titleToFigCaption && node.title) {
      const captionNode = {
        type: "container",
        data: { hName: "figcaption" },
        children: [{ type: "text", value: node.title }],
      };

      const figureNode = {
        type: "container",
        data: {
          hName: "figure",
        },
        children: [node, captionNode],
      };

      resultNode = figureNode;
    }

    if (parent) {
      parent.children.splice(index ?? 0, 1, resultNode);
      return (index ?? 0) + 2;
    }
  };

  return (tree) => {
    visit(tree, "image", visitor);
  };
};

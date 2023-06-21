import type * as mdast from 'mdast';
import type * as unified from 'unified';
import { visit, type Visitor } from 'unist-util-visit';
import { createBlockNode } from './create-block-node';
import { createCopyButtonNode } from './create-copy-button-node';
import { createWrapperNode } from './create-wrapper-node';
import type * as unist from 'unist';

type RemarkCodeWindowOptions = {
  // Whether to wrap the code block in a div
  wrap: boolean;
  wrapperClassName: string;
  // Header class names and extra content
  headerClassName: string;
  headerExtraContent: unist.Node<unist.Data>[];
  // Footer class names and extra content
  footerClassName: string;
  footerExtraContent: unist.Node<unist.Data>[];
  // Whether to add a copy button
  copy: boolean;
  copyClassName: string;
  copyText: string;
  copyIcon: string;
  copyButtonPosition: 'header' | 'footer';
};

const defaults: RemarkCodeWindowOptions = {
  wrap: true,
  headerClassName: 'remark-code-window-header',
  wrapperClassName: 'remark-code-window-wrapper',
  footerClassName: 'remark-code-window-footer',
  copy: true,
  copyClassName: 'remark-code-window-copy',
  copyText: 'Copy',
  copyIcon: '📋',
  copyButtonPosition: 'header',
  footerExtraContent: [],
  headerExtraContent: [],
};

type RemarkCodeWindow = unified.Plugin<
  [Partial<RemarkCodeWindowOptions>?],
  mdast.Root
>;

export const remarkCodeWindow: RemarkCodeWindow = (pluginOptions) => {
  const options: RemarkCodeWindowOptions = {
    ...defaults,
    ...pluginOptions,
  };

  const visitor: Visitor<mdast.Code> = (node, index, parent) => {
    if (!node.lang) return;

    const [lang, ...tail] = node.lang.split(' ');

    if (!lang) return;

    if (lang.includes('header') || lang.includes('header')) {
      throw new Error(
        '@remark-code-window: header and footer must be specified after the language'
      );
    }

    node.lang = lang;

    const getBlockContent = (block: string) => {
      const blockInTail = tail.find((item) => item.includes(block));
      return blockInTail?.split('=').pop()?.replace(/"/g, '');
    };

    const noWindow = getBlockContent('no-window');

    if (noWindow) return;

    const header = getBlockContent('header');

    const footer = getBlockContent('footer');

    const getCopyButtonNode = (currentBlock: 'header' | 'footer') => {
      if (!options.copy) return;

      if (options.copyButtonPosition !== currentBlock) return;

      return createCopyButtonNode({
        className: options.copyClassName,
        text: options.copyText,
        icon: options.copyIcon,
      });
    };

    const headerNode = createBlockNode({
      value: header || '',
      copyButton: getCopyButtonNode('header'),
      as: 'header',
      className: options.headerClassName,
      children: options.headerExtraContent,
    });

    const footerNode = createBlockNode({
      value: footer || '',
      copyButton: getCopyButtonNode('footer'),
      as: 'footer',
      className: options.footerClassName,
      children: options.footerExtraContent,
    });

    if (options.wrap) {
      const wrapperNode = createWrapperNode({
        children: [headerNode, node, footerNode],
        className: options.wrapperClassName,
      });

      // Replace the current code block node with the wrapper node
      parent?.children.splice(index!, 1, wrapperNode);

      // Skip the wrapper node
      return index! + 1;
    }

    // Insert the header node before the current code block
    parent?.children.splice(index!, 0, headerNode);

    // Insert the footer node after the current code block
    parent?.children.splice(index! + 2, 0, footerNode);

    // Skip the header, footer and current nodes
    return index! + 3;
  };

  return (tree) => {
    visit(tree, 'code', visitor);
  };
};